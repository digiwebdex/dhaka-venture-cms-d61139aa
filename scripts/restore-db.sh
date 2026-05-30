#!/usr/bin/env bash
set -euo pipefail

DUMP_FILE="${1:-}"

if [ -z "$DUMP_FILE" ]; then
  echo "Usage: $0 /path/to/database.dump" >&2
  exit 1
fi

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is required" >&2
  exit 1
fi

pg_restore --clean --if-exists --no-owner --dbname "$DATABASE_URL" "$DUMP_FILE"
echo "Database restore completed from $DUMP_FILE"
