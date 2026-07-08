import sys
from pathlib import Path

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

# The plugin is a flat module directory; make routes importable from tests.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import routes  # noqa: E402


@pytest.fixture
def config_dir(tmp_path):
    return tmp_path / "config"


@pytest.fixture
def client(config_dir):
    app = FastAPI()
    routes.setup(app, {"config_dir": str(config_dir)})
    with TestClient(app) as c:
        yield c
