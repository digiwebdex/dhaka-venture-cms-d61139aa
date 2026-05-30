#!/usr/bin/env bash
set -euo pipefail

DEST_DIR="${DB_BACKUP_DIR:-/srv/primeskyint/backups/database}"
STAMP="$(date +%F-%H%M%S)"
FILE="$DEST_DIR/primeskyint-db-$STAMP.dump"

mkdir -p "$DEST_DIR"

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is required" >&2
  exit 1
fi

pg_dump "$DATABASE_URL" -Fc -f "$FILE"
ls -lh "$FILE"
