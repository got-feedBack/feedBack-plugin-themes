'use strict';
// Pure-function + preset-integrity coverage for screen.js.
// Runs under the org reusable CI as `node tests/theme.test.js`.
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const { normalizeColor, buildCss, PRESETS, CONFIG } =
    require(path.join(__dirname, '..', 'screen.js'));

const COLOR_KEYS = [
    'bg900', 'bg800', 'bg700', 'bg600', 'bg500',
    'accent', 'accentLight', 'accentDark', 'gold',
    'textPrimary', 'textSecondary', 'textMuted',
    'border', 'scrollThumb', 'scrollThumbHover',
    'cardFromRgb', 'cardToRgb', 'playerBg',
];

test('normalizeColor expands 6-digit hex to "R G B"', () => {
    assert.equal(normalizeColor('#ff0000'), '255 0 0');
    assert.equal(normalizeColor('#0a0a12'), '10 10 18');
    assert.equal(normalizeColor('#ffffff'), '255 255 255');
});

test('normalizeColor expands 3-digit hex shorthand', () => {
    assert.equal(normalizeColor('#f00'), '255 0 0');
    assert.equal(normalizeColor('#abc'), '170 187 204');
});

test('normalizeColor passes non-hex strings through', () => {
    assert.equal(normalizeColor('10 10 18'), '10 10 18');
    assert.equal(normalizeColor('rgb(1,2,3)'), 'rgb(1,2,3)');
});

test('normalizeColor maps falsy input to black', () => {
    assert.equal(normalizeColor(''), '0 0 0');
    assert.equal(normalizeColor(null), '0 0 0');
    assert.equal(normalizeColor(undefined), '0 0 0');
});

test('default theme id exists in PRESETS', () => {
    assert.ok(PRESETS[CONFIG.DEFAULT_ID], `missing default preset ${CONFIG.DEFAULT_ID}`);
});

test('every preset has name, desc, 4 swatches, and the full color set', () => {
    for (const [id, preset] of Object.entries(PRESETS)) {
        assert.equal(typeof preset.name, 'string', `${id}: name`);
        assert.ok(preset.name.length > 0, `${id}: empty name`);
        assert.equal(typeof preset.desc, 'string', `${id}: desc`);
        assert.equal(preset.swatches.length, 4, `${id}: swatch count`);
        for (const key of COLOR_KEYS) {
            assert.ok(preset.colors[key], `${id}: missing color ${key}`);
        }
        // No stray keys the CSS template would silently ignore.
        for (const key of Object.keys(preset.colors)) {
            assert.ok(COLOR_KEYS.includes(key), `${id}: unknown color key ${key}`);
        }
    }
});

test('every preset color normalizes to an "R G B" triple', () => {
    const triple = /^\d{1,3} \d{1,3} \d{1,3}$/;
    for (const [id, preset] of Object.entries(PRESETS)) {
        for (const key of COLOR_KEYS) {
            const norm = normalizeColor(preset.colors[key]);
            assert.match(norm, triple, `${id}.${key} -> ${norm}`);
            for (const part of norm.split(' ')) {
                const n = Number(part);
                assert.ok(n >= 0 && n <= 255 && Number.isInteger(n),
                    `${id}.${key}: channel out of range: ${norm}`);
            }
        }
    }
});

test('buildCss injects normalized colors for a known theme', () => {
    const css = buildCss('matrix');
    assert.ok(css.includes(`--sm-bg-900: ${normalizeColor('#000000')};`));
    assert.ok(css.includes(`--sm-accent: ${normalizeColor('#39ff14')};`));
    assert.ok(css.includes('html[data-sm-theme]'));
});

test('buildCss falls back to the default theme for unknown ids', () => {
    assert.equal(buildCss('no-such-theme'), buildCss(CONFIG.DEFAULT_ID));
    assert.equal(buildCss(undefined), buildCss(CONFIG.DEFAULT_ID));
});

test('buildCss leaves no unresolved template holes', () => {
    for (const id of Object.keys(PRESETS)) {
        const css = buildCss(id);
        assert.ok(!css.includes('undefined'), `${id}: undefined in CSS`);
        assert.ok(!css.includes('NaN'), `${id}: NaN in CSS`);
    }
});
