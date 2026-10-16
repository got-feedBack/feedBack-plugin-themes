# feedBack Plugin: Themes

A plugin for [feedBack](https://github.com/got-feedback/feedback) that allows basic recoloring.

<img width="992" height="832" alt="image" src="https://github.com/user-attachments/assets/c3fc7f85-1f2e-46ab-841f-80ec091d4b68" />

## Installation

```bash
cd /path/to/feedBack/plugins
git clone https://github.com/got-feedback/feedBack-plugin-themes.git themes
docker compose restart
```

## Usage

Open **Settings → Graphics**, expand the **Themes** panel and pick a theme from the **Interface Theme** dropdown. The new colors apply right away.

Built-in themes:

- Classic Dark (default)
- Carbon Mint
- Clay Hearth
- Deep Sea
- Desert Sand
- Forest Moss
- Lavender Dusk
- Matrix
- Midnight Blue
- Mocha
- Nordic Slate
- Rose Dust
- Sunset Glow

Your choice is saved on the server in `themes.json` inside feedBack's config directory, so it carries over to other browsers and devices that use the same server. The browser also caches it in `localStorage` so the theme applies before the page finishes loading.

## Other Plugins

- [Invert Highway](https://github.com/got-feedback/feedBack-plugin-invert-highway) — flip the chord note stacking order on the highway

### LICENSE
MIT
