#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="${UPLOAD_SRC_DIR:-/srv/primeskyint/data/uploads}"
DEST_DIR="${UPLOAD_BACKUP_DIR:-/srv/primeskyint/backups/uploads}"
STAMP="$(date +%F-%H%M%S)"

mkdir -p "$DEST_DIR"
tar -czf "$DEST_DIR/primeskyint-uploads-$STAMP.tar.gz" -C "$(dirname "$SRC_DIR")" "$(basename "$SRC_DIR")"
ls -lh "$DEST_DIR/primeskyint-uploads-$STAMP.tar.gz"
