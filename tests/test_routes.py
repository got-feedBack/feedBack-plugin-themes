"""Theme config persistence endpoints."""

import json

from routes import DEFAULT_ACTIVE

CONFIG_URL = "/api/plugins/themes/config"


def test_get_defaults_when_no_file(client):
    r = client.get(CONFIG_URL)
    assert r.status_code == 200
    assert r.json() == {"active": DEFAULT_ACTIVE}


def test_set_and_get_roundtrip(client, config_dir):
    r = client.post(CONFIG_URL, json={"active": "matrix"})
    assert r.status_code == 200
    assert r.json() == {"ok": True, "active": "matrix"}

    assert client.get(CONFIG_URL).json() == {"active": "matrix"}
    # Persisted on disk, not just in memory.
    on_disk = json.loads((config_dir / "themes.json").read_text(encoding="utf-8"))
    assert on_disk == {"active": "matrix"}


def test_set_falsy_active_falls_back_to_default(client):
    for body in ({"active": ""}, {"active": None}, {}):
        r = client.post(CONFIG_URL, json=body)
        assert r.status_code == 200
        assert r.json()["active"] == DEFAULT_ACTIVE


def test_non_string_active_is_stringified(client):
    r = client.post(CONFIG_URL, json={"active": 42})
    assert r.json()["active"] == "42"
    assert client.get(CONFIG_URL).json() == {"active": "42"}


def test_get_recovers_from_corrupt_file(client, config_dir):
    config_dir.mkdir(parents=True, exist_ok=True)
    (config_dir / "themes.json").write_text("{not json", encoding="utf-8")
    assert client.get(CONFIG_URL).json() == {"active": DEFAULT_ACTIVE}


def test_get_recovers_from_wrong_shape(client, config_dir):
    config_dir.mkdir(parents=True, exist_ok=True)
    for bad in ('["list"]', '{"other": 1}', '"just a string"'):
        (config_dir / "themes.json").write_text(bad, encoding="utf-8")
        assert client.get(CONFIG_URL).json() == {"active": DEFAULT_ACTIVE}


def test_set_overwrites_corrupt_file(client, config_dir):
    config_dir.mkdir(parents=True, exist_ok=True)
    (config_dir / "themes.json").write_text("{not json", encoding="utf-8")
    client.post(CONFIG_URL, json={"active": "sunset"})
    assert client.get(CONFIG_URL).json() == {"active": "sunset"}
