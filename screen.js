(function () {
    'use strict';

    /**
     * @typedef {Object} ThemeColors
     * @property {string} bg900
     * @property {string} bg800
     * @property {string} bg700
     * @property {string} bg600
     * @property {string} bg500
     * @property {string} accent
     * @property {string} accentLight
     * @property {string} accentDark
     * @property {string} gold
     * @property {string} textPrimary
     * @property {string} textSecondary
     * @property {string} textMuted
     * @property {string} border
     * @property {string} scrollThumb
     * @property {string} scrollThumbHover
     * @property {string} cardFromRgb
     * @property {string} cardToRgb
     * @property {string} playerBg
     */

    /**
     * Converts Hex or RGB string to "R G B" format for CSS variable usage.
     * @param {string} color 
     * @returns {string}
     */
    function normalizeColor(color) {
        if (!color) return '0 0 0';
        if (color.startsWith('#')) {
            const hex = color.slice(1);
            if (hex.length === 3) {
                const r = parseInt(hex[0] + hex[0], 16);
                const g = parseInt(hex[1] + hex[1], 16);
                const b = parseInt(hex[2] + hex[2], 16);
                return `${r} ${g} ${b}`;
            }
            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);
            return `${r} ${g} ${b}`;
        }
        return color;
    }

    const PRESETS = {
        'terracotta-red': {
            name: 'Clay Hearth',
            desc: 'Muted clay tones on a warm charcoal base.',
            swatches: ['#120d0d', '#1d1414', '#e2725b', '#ffffff'],
            colors: {
                bg900: '#120d0d', bg800: '#1a1212', bg700: '#241a1a', bg600: '#302222', bg500: '#3d2c2c',
                accent: '#e2725b', accentLight: '#f2927b', accentDark: '#c2523b',
                gold: '#f0c860', textPrimary: '#eee4e4', textSecondary: '#b89494', textMuted: '#8c6464',
                border: '#3a2525', scrollThumb: '#4a2f2f', scrollThumbHover: '#6a3f3f',
                cardFromRgb: '#1a1212', cardToRgb: '#120d0d', playerBg: '#120d0d',
            },
        },
        'muted-rose': {
            name: 'Rose Dust',
            desc: 'Soft pink haze on a warm stone base.',
            swatches: ['#120d10', '#1d1418', '#d58d8d', '#ffffff'],
            colors: {
                bg900: '#120d10', bg800: '#1a1418', bg700: '#241b21', bg600: '#30232c', bg500: '#3d2e38',
                accent: '#d58d8d', accentLight: '#e5adad', accentDark: '#b56d6d',
                gold: '#ffffff', textPrimary: '#eee4e8', textSecondary: '#b894a4', textMuted: '#8c6476',
                border: '#3a2530', scrollThumb: '#4a2f3d', scrollThumbHover: '#6a3f55',
                cardFromRgb: '#1a1418', cardToRgb: '#120d10', playerBg: '#120d10',
            },
        },
        'sunset': {
            name: 'Sunset Glow',
            desc: 'Warm plum tones on a muted charcoal base.',
            swatches: ['#1a0d14', '#261a22', '#ff7a3c', '#ffd56a'],
            colors: {
                bg900: '#120a0e', bg800: '#1a1016', bg700: '#241820', bg600: '#32202c', bg500: '#422c3c',
                accent: '#ff7a3c', accentLight: '#ffa870', accentDark: '#c05028',
                gold: '#ffd56a', textPrimary: '#fcf0e4', textSecondary: '#d4b4aa', textMuted: '#9b766c',
                border: '#3a1f2e', scrollThumb: '#522b40', scrollThumbHover: '#7a4260',
                cardFromRgb: '#1a1016', cardToRgb: '#120a0e', playerBg: '#120a0e',
            },
        },
        'mocha-mousse': {
            name: 'Mocha',
            desc: 'Warm, desaturated espresso. Soft and earthy.',
            swatches: ['#1a1614', '#262220', '#a47864', '#ffdd44'],
            colors: {
                bg900: '#1a1614', bg800: '#221e1c', bg700: '#2c2825', bg600: '#383230', bg500: '#46403d',
                accent: '#a47864', accentLight: '#c49884', accentDark: '#845844',
                gold: '#d4a844', textPrimary: '#e1e0dd', textSecondary: '#b4a8a4', textMuted: '#8c7d78',
                border: '#3c3633', scrollThumb: '#4a4440', scrollThumbHover: '#5a5450',
                cardFromRgb: '#221e1c', cardToRgb: '#1a1614', playerBg: '#1a1614',
            },
        },
        'desert-sand': {
            name: 'Desert Sand',
            desc: 'Warm greyish-tan stone. Soft, neutral, and vast.',
            swatches: ['#171614', '#242220', '#d4b494', '#ffffff'],
            colors: {
                bg900: '#171614', bg800: '#1e1d1b', bg700: '#2a2826', bg600: '#383633', bg500: '#4a4844',
                accent: '#d4b494', accentLight: '#e4c4a4', accentDark: '#b49474',
                gold: '#ffffff', textPrimary: '#e6e4e0', textSecondary: '#b4b0a8', textMuted: '#8c8880',
                border: '#3c3a36', scrollThumb: '#4a4844', scrollThumbHover: '#5a5854',
                cardFromRgb: '#1e1d1b', cardToRgb: '#171614', playerBg: '#171614',
            },
        },
        'verdant-green': {
            name: 'Forest Moss',
            desc: 'Desaturated mossy greens on a natural dark base.',
            swatches: ['#0a120a', '#141d14', '#4caf50', '#ffdd44'],
            colors: {
                bg900: '#0a120a', bg800: '#111811', bg700: '#182418', bg600: '#203020', bg500: '#2a402a',
                accent: '#4caf50', accentLight: '#76c87a', accentDark: '#388e3c',
                gold: '#d4c844', textPrimary: '#e1e6e1', textSecondary: '#94b894', textMuted: '#648c64',
                border: '#223322', scrollThumb: '#2a442a', scrollThumbHover: '#3a5a3a',
                cardFromRgb: '#111811', cardToRgb: '#0a120a', playerBg: '#0a120a',
            },
        },
        'carbon-mint': {
            name: 'Carbon Mint',
            desc: 'Sleek anthracite with glowing mint accents. High-tech tranquility.',
            swatches: ['#0f1115', '#1a1d23', '#00ffc2', '#ffffff'],
            colors: {
                bg900: '#0f1115', bg800: '#16191e', bg700: '#1f242b', bg600: '#29303a', bg500: '#353e4a',
                accent: '#00ffc2', accentLight: '#6effe1', accentDark: '#00cc9b',
                gold: '#00e5e5', textPrimary: '#e5e7eb', textSecondary: '#9ca3af', textMuted: '#6b7280',
                border: '#2a313c', scrollThumb: '#202732', scrollThumbHover: '#303b4d',
                cardFromRgb: '#16191e', cardToRgb: '#0f1115', playerBg: '#0f1115',
            },
        },
        'matrix': {
            name: 'Matrix',
            desc: 'True black and phosphor green. The hacker classic.',
            swatches: ['#000000', '#0a1208', '#39ff14', '#baff5e'],
            colors: {
                bg900: '#000000', bg800: '#080e0a', bg700: '#0e1810', bg600: '#162618', bg500: '#1e3622',
                accent: '#39ff14', accentLight: '#96ff6e', accentDark: '#1eb40a',
                gold: '#baff5e', textPrimary: '#d2ffc8', textSecondary: '#82c882', textMuted: '#508c55',
                border: '#234628', scrollThumb: '#285a2d', scrollThumbHover: '#3c8c46',
                cardFromRgb: '#0e1810', cardToRgb: '#08100a', playerBg: '#000000',
            },
        },
        'corporate-navy': {
            name: 'Deep Sea',
            desc: 'Subdued oceanic blues. Clean and stable.',
            swatches: ['#050812', '#0a1020', '#101585', '#ffffff'],
            colors: {
                bg900: '#050812', bg800: '#0b111d', bg700: '#111a2c', bg600: '#1a2740', bg500: '#253555',
                accent: '#3ea8ff', accentLight: '#78c8ff', accentDark: '#1870c8',
                gold: '#ffffff', textPrimary: '#e6eeff', textSecondary: '#94aac8', textMuted: '#5a6e8c',
                border: '#283c5f', scrollThumb: '#1e3764', scrollThumbHover: '#32508c',
                cardFromRgb: '#0b111d', cardToRgb: '#050812', playerBg: '#050812',
            },
        },
        'nordic-slate': {
            name: 'Nordic Slate',
            desc: 'Cool blue-grey harbor tones. Stable, cold, and professional.',
            swatches: ['#0d1117', '#161b22', '#58a6ff', '#ffffff'],
            colors: {
                bg900: '#0d1117', bg800: '#12161e', bg700: '#1a202c', bg600: '#232a36', bg500: '#2d3748',
                accent: '#58a6ff', accentLight: '#79c0ff', accentDark: '#1f6feb',
                gold: '#ffffff', textPrimary: '#c9d1d9', textSecondary: '#8b949e', textMuted: '#6e7681',
                border: '#30363d', scrollThumb: '#21262d', scrollThumbHover: '#30363d',
                cardFromRgb: '#12161e', cardToRgb: '#0d1117', playerBg: '#0d1117',
            },
        },
        'classic-dark': {
            name: 'Classic Dark',
            desc: 'The original Slopsmith. Deep navy and muted slate.',
            swatches: ['#0a0a12', '#161b22', '#4080e0', '#e8c040'],
            colors: {
                bg900: '#0a0a12', bg800: '#11111d', bg700: '#161625', bg600: '#1c1c30', bg500: '#22223b',
                accent: '#4080e0', accentLight: '#60a0ff', accentDark: '#2060b0',
                gold: '#e8c040', textPrimary: '#e1e1e6', textSecondary: '#9ca3af', textMuted: '#6b7280',
                border: '#2a2a40', scrollThumb: '#252545', scrollThumbHover: '#353560',
                cardFromRgb: '#11111d', cardToRgb: '#0a0a12', playerBg: '#0a0a12',
            },
        },
        'midnight-blue': {
            name: 'Midnight Blue',
            desc: 'Deep indigo and charcoal. High visibility with low fatigue.',
            swatches: ['#03050f', '#0b1328', '#3ea8ff', '#f0c860'],
            colors: {
                bg900: '#03050f', bg800: '#070c1c', bg700: '#0b1328', bg600: '#121c3a', bg500: '#192850',
                accent: '#3ea8ff', accentLight: '#78c8ff', accentDark: '#1870c8',
                gold: '#f0c860', textPrimary: '#e6eeff', textSecondary: '#94aac8', textMuted: '#5a6e8c',
                border: '#283c5f', scrollThumb: '#1e3764', scrollThumbHover: '#32508c',
                cardFromRgb: '#0b1328', cardToRgb: '#080e1e', playerBg: '#03050f',
            },
        },
        'digital-lavender': {
            name: 'Lavender Dusk',
            desc: 'Soft violet glow on a deep charcoal base.',
            swatches: ['#0d0d12', '#1a1a24', '#a78bfa', '#ffdd44'],
            colors: {
                bg900: '#0d0d12', bg800: '#14141d', bg700: '#1b1b26', bg600: '#232332', bg500: '#2c2c3e',
                accent: '#a78bfa', accentLight: '#c4b5fd', accentDark: '#8b5cf6',
                gold: '#f0c860', textPrimary: '#e4e4f0', textSecondary: '#9494b8', textMuted: '#64648c',
                border: '#2a2a3c', scrollThumb: '#32324c', scrollThumbHover: '#42426c',
                cardFromRgb: '#14141d', cardToRgb: '#0d0d12', playerBg: '#0d0d12',
            },
        },
    };

    const CONFIG = {
        DEFAULT_ID: 'classic-dark',
        CACHE_KEY: 'slopsmith-theme-active',
        STYLE_ID: 'slopsmith-theme-style',
        API_PATH: '/api/plugins/themes/config'
    };

    /**
     * Builds the CSS string for the given theme ID.
     * @param {string} id 
     * @returns {string}
     */
    function buildCss(id) {
        const preset = PRESETS[id] || PRESETS[CONFIG.DEFAULT_ID];
        const c = {};
        
        // Ensure all colors are normalized for the CSS template
        for (const key in preset.colors) {
            c[key] = normalizeColor(preset.colors[key]);
        }

        return `
:root {
  --sm-bg-900: ${c.bg900};
  --sm-bg-800: ${c.bg800};
  --sm-bg-700: ${c.bg700};
  --sm-bg-600: ${c.bg600};
  --sm-bg-500: ${c.bg500};
  --sm-accent: ${c.accent};
  --sm-accent-light: ${c.accentLight};
  --sm-accent-dark: ${c.accentDark};
  --sm-gold: ${c.gold};
  --sm-text-primary: ${c.textPrimary};
  --sm-text-secondary: ${c.textSecondary};
  --sm-text-muted: ${c.textMuted};
  --sm-border: ${c.border};
  --sm-scroll-thumb: ${c.scrollThumb};
  --sm-scroll-thumb-hover: ${c.scrollThumbHover};
  --sm-card-from: ${c.cardFromRgb};
  --sm-card-to: ${c.cardToRgb};
  --sm-player-bg: rgb(${c.bg900});
}

/* Body base */
html[data-sm-theme] body.bg-dark-900 { background-color: rgb(var(--sm-bg-900)); }
html[data-sm-theme] body { color: rgb(var(--sm-text-primary)); }

/* bg-dark-* solids */
html[data-sm-theme] .bg-dark-900 { background-color: rgb(var(--sm-bg-900)); }
html[data-sm-theme] .bg-dark-800 { background-color: rgb(var(--sm-bg-800)); }
html[data-sm-theme] .bg-dark-700 { background-color: rgb(var(--sm-bg-700)); }
html[data-sm-theme] .bg-dark-600 { background-color: rgb(var(--sm-bg-600)); }
html[data-sm-theme] .bg-dark-500 { background-color: rgb(var(--sm-bg-500)); }

/* bg-dark with opacity */
html[data-sm-theme] .bg-dark-900\\/80 { background-color: rgb(var(--sm-bg-900) / 0.8); }
html[data-sm-theme] .bg-dark-800\\/95 { background-color: rgb(var(--sm-bg-800) / 0.95); }
html[data-sm-theme] .bg-dark-700\\/95 { background-color: rgb(var(--sm-bg-700) / 0.95); }
html[data-sm-theme] .bg-dark-700\\/50 { background-color: rgb(var(--sm-bg-700) / 0.5); }

/* Hover states */
html[data-sm-theme] .hover\\:bg-dark-500:hover { background-color: rgb(var(--sm-bg-500)); }
html[data-sm-theme] .hover\\:bg-dark-700:hover { background-color: rgb(var(--sm-bg-700)); }

/* Accent states */
html[data-sm-theme] .bg-accent { background-color: rgb(var(--sm-accent)); }
html[data-sm-theme] .bg-accent\\/10 { background-color: rgb(var(--sm-accent) / 0.1); }
html[data-sm-theme] .bg-accent\\/20 { background-color: rgb(var(--sm-accent) / 0.2); }
html[data-sm-theme] .bg-accent\\/30 { background-color: rgb(var(--sm-accent) / 0.3); }
html[data-sm-theme] .hover\\:bg-accent-light:hover { background-color: rgb(var(--sm-accent-light)); }
html[data-sm-theme] .hover\\:bg-accent\\/20:hover { background-color: rgb(var(--sm-accent) / 0.2); }
html[data-sm-theme] .hover\\:bg-accent\\/30:hover { background-color: rgb(var(--sm-accent) / 0.3); }
html[data-sm-theme] .peer:checked ~ .peer-checked\\:bg-accent { background-color: rgb(var(--sm-accent)); }

/* Text accents */
html[data-sm-theme] .text-accent { color: rgb(var(--sm-accent)); }
html[data-sm-theme] .text-accent-light { color: rgb(var(--sm-accent-light)); }
html[data-sm-theme] .group:hover .group-hover\\:text-accent-light { color: rgb(var(--sm-accent-light)); }

/* Borders & Focus */
html[data-sm-theme] .border-accent { border-color: rgb(var(--sm-accent)); }
html[data-sm-theme] .focus\\:border-accent:focus { border-color: rgb(var(--sm-accent)); }
html[data-sm-theme] .focus\\:border-accent\\/50:focus { border-color: rgb(var(--sm-accent) / 0.5); }
html[data-sm-theme] .focus\\:ring-accent\\/30:focus { --tw-ring-color: rgb(var(--sm-accent) / 0.3); }
html[data-sm-theme] .focus\\:ring-accent\\/40:focus { --tw-ring-color: rgb(var(--sm-accent) / 0.4); }

/* Gradients */
html[data-sm-theme] .from-accent { --tw-gradient-from: rgb(var(--sm-accent)) var(--tw-gradient-from-position); --tw-gradient-to: rgb(var(--sm-accent) / 0) var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
html[data-sm-theme] .from-accent-light { --tw-gradient-from: rgb(var(--sm-accent-light)) var(--tw-gradient-from-position); --tw-gradient-to: rgb(var(--sm-accent-light) / 0) var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
html[data-sm-theme] .to-accent { --tw-gradient-to: rgb(var(--sm-accent)) var(--tw-gradient-to-position); }
html[data-sm-theme] .to-accent-light { --tw-gradient-to: rgb(var(--sm-accent-light)) var(--tw-gradient-to-position); }

/* Gold utilities */
html[data-sm-theme] .text-gold { color: rgb(var(--sm-gold)); }
html[data-sm-theme] .bg-gold\\/10 { background-color: rgb(var(--sm-gold) / 0.1); }
html[data-sm-theme] .bg-gold\\/20 { background-color: rgb(var(--sm-gold) / 0.2); }
html[data-sm-theme] .hover\\:bg-gold\\/20:hover { background-color: rgb(var(--sm-gold) / 0.2); }
html[data-sm-theme] .border-gold\\/20 { border-color: rgb(var(--sm-gold) / 0.2); }

/* Component Specific Overrides */
html[data-sm-theme] #player.active { background: var(--sm-player-bg); }
html[data-sm-theme] .song-card {
    background: linear-gradient(145deg, rgb(var(--sm-card-from)) 0%, rgb(var(--sm-card-to)) 100%);
    border: 1px solid rgb(var(--sm-border) / 0.3);
}
html[data-sm-theme] .song-card:hover {
    border-color: rgb(var(--sm-accent) / 0.35);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgb(var(--sm-accent) / 0.15);
}
html[data-sm-theme] .song-card .card-art {
    background: linear-gradient(135deg, rgb(var(--sm-bg-600)) 0%, rgb(var(--sm-bg-800)) 100%);
}
html[data-sm-theme] .artist-row {
    background: linear-gradient(145deg, rgb(var(--sm-card-from)) 0%, rgb(var(--sm-card-to)) 100%);
    border: 1px solid rgb(var(--sm-border) / 0.3);
}
html[data-sm-theme] .artist-row:hover { border-color: rgb(var(--sm-accent) / 0.25); }
html[data-sm-theme] .album-art-sm { background: rgb(var(--sm-bg-700)); }
html[data-sm-theme] .song-row:hover { background: rgb(var(--sm-accent) / 0.1); }
html[data-sm-theme] .result-item {
    background: rgb(var(--sm-bg-700));
    border: 1px solid rgb(var(--sm-border) / 0.3);
}
html[data-sm-theme] .result-item:hover {
    background: rgb(var(--sm-bg-600));
    border-color: rgb(var(--sm-accent) / 0.3);
}
html[data-sm-theme] .progress-bar { background: rgb(var(--sm-bg-700)); }
html[data-sm-theme] .progress-bar .fill {
    background: linear-gradient(90deg, rgb(var(--sm-accent)), rgb(var(--sm-accent-light)));
}
html[data-sm-theme] ::-webkit-scrollbar-thumb { background: rgb(var(--sm-scroll-thumb)); }
html[data-sm-theme] ::-webkit-scrollbar-thumb:hover { background: rgb(var(--sm-scroll-thumb-hover)); }
`;
    }

    /**
     * Applies a theme by updating the style tag and document attribute.
     * @param {string} id 
     * @param {boolean} persist - Whether to save the choice to the server.
     */
    function applyTheme(id, persist = false) {
        if (!PRESETS[id]) id = CONFIG.DEFAULT_ID;
        
        let style = document.getElementById(CONFIG.STYLE_ID);
        if (!style) {
            style = document.createElement('style');
            style.id = CONFIG.STYLE_ID;
            document.head.appendChild(style);
        }
        
        style.textContent = buildCss(id);
        document.documentElement.setAttribute('data-sm-theme', id);
        
        try { localStorage.setItem(CONFIG.CACHE_KEY, id); } catch (e) {}
        
        renderPicker(id);
        syncQuickPick(id);
        
        if (persist) {
            fetch(CONFIG.API_PATH, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ active: id }),
            }).catch(err => console.error('Failed to persist theme:', err));
        }
    }

    /**
     * Renders the theme selection grid.
     * @param {string} activeId 
     */
    function renderPicker(activeId) {
        const grid = document.getElementById('themes-grid');
        if (!grid) return;

        const items = Object.keys(PRESETS).map(id => {
            const p = PRESETS[id];
            const isActive = id === activeId;
            const swatchRow = p.swatches.map(hex =>
                `<span class="inline-block w-6 h-6 rounded-md shadow-sm border border-black/10" style="background:${hex}"></span>`
            ).join('');

            const textColor = `rgb(${normalizeColor(p.colors.textPrimary)})`;
            const secondaryColor = `rgb(${normalizeColor(p.colors.textSecondary)})`;
            const cardBg = `linear-gradient(145deg, rgb(${normalizeColor(p.colors.cardFromRgb)}) 0%, rgb(${normalizeColor(p.colors.cardToRgb)}) 100%)`;

            return `
                <button type="button" 
                    data-theme-id="${id}"
                    aria-pressed="${isActive}"
                    class="themes-card text-left rounded-2xl p-5 border transition-all duration-200 ${isActive ? 'border-accent ring-2 ring-accent/20 shadow-xl scale-[1.02]' : 'border-gray-700 hover:border-gray-500 hover:scale-[1.01]'}"
                    style="background: ${cardBg};">
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="font-semibold" style="color: ${textColor}">${p.name}</h3>
                        ${isActive ? `<span class="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent-light">Active</span>` : ''}
                    </div>
                    <p class="text-xs mb-4 line-clamp-2" style="color: ${secondaryColor}">${p.desc}</p>
                    <div class="flex gap-2">${swatchRow}</div>
                </button>
            `;
        }).join('');

        grid.innerHTML = items;
        grid.querySelectorAll('.themes-card').forEach(btn => {
            btn.onclick = () => applyTheme(btn.getAttribute('data-theme-id'), true);
        });
    }

    /**
     * Synchronizes the quick-pick dropdown.
     * @param {string} activeId 
     */
    function syncQuickPick(activeId) {
        const sel = document.getElementById('themes-quickpick');
        if (!sel) return;
        
        if (!sel.options.length) {
            sel.innerHTML = Object.keys(PRESETS).map(id =>
                `<option value="${id}">${PRESETS[id].name}</option>`
            ).join('');
        }
        sel.value = activeId;
    }

    // --- Initialization ---

    // 1. Fast-path: Apply cached choice immediately to prevent FOUC
    let initialId = CONFIG.DEFAULT_ID;
    try { initialId = localStorage.getItem(CONFIG.CACHE_KEY) || CONFIG.DEFAULT_ID; } catch (e) {}
    applyTheme(initialId, false);

    // 2. Reconcile with server state
    fetch(CONFIG.API_PATH)
        .then(r => r.ok ? r.json() : null)
        .then(cfg => {
            if (cfg && cfg.active && PRESETS[cfg.active]) {
                if (cfg.active !== document.documentElement.getAttribute('data-sm-theme')) {
                    applyTheme(cfg.active, false);
                }
            }
        })
        .catch(err => console.warn('Theme server sync failed:', err))
        .finally(() => {
            // Ensure UI is initialized even if network fails
            const current = document.documentElement.getAttribute('data-sm-theme') || CONFIG.DEFAULT_ID;
            renderPicker(current);
            syncQuickPick(current);
        });

    // Public API
    window.themes = {
        apply: applyTheme,
        list: () => Object.keys(PRESETS).map(id => ({ id, ...PRESETS[id] })),
        active: () => document.documentElement.getAttribute('data-sm-theme') || CONFIG.DEFAULT_ID,
    };
})();
