#!/usr/bin/env bash
set -euo pipefail

alembic -c app/alembic.ini upgrade head
uvicorn app.main:app --host 0.0.0.0 --port "${PORT:-8000}"
