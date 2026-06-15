"""Themes plugin — persist active theme ID in config_dir."""

import json
from pathlib import Path
from fastapi import FastAPI, Request


DEFAULT_ACTIVE = "classic-dark"


def setup(app: FastAPI, context: dict):
    config_dir = Path(context["config_dir"])
    config_file = config_dir / "themes.json"

    def _read() -> dict:
        if not config_file.exists():
            return {"active": DEFAULT_ACTIVE}
        try:
            data = json.loads(config_file.read_text(encoding="utf-8"))
            if not isinstance(data, dict) or "active" not in data:
                return {"active": DEFAULT_ACTIVE}
            return {"active": str(data["active"])}
        except Exception:
            return {"active": DEFAULT_ACTIVE}

    def _write(active: str) -> None:
        config_dir.mkdir(parents=True, exist_ok=True)
        config_file.write_text(json.dumps({"active": active}), encoding="utf-8")

    @app.get("/api/plugins/themes/config")
    def get_config():
        return _read()

    @app.post("/api/plugins/themes/config")
    async def set_config(req: Request):
        body = await req.json()
        active = str(body.get("active") or DEFAULT_ACTIVE)
        _write(active)
        return {"ok": True, "active": active}
