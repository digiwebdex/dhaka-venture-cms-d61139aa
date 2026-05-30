#!/usr/bin/env bash
set -euo pipefail

ARCHIVE="${1:-}"
DEST_PARENT="${UPLOAD_RESTORE_PARENT:-/srv/primeskyint/data}"

if [ -z "$ARCHIVE" ]; then
  echo "Usage: $0 /path/to/uploads-backup.tar.gz" >&2
  exit 1
fi

mkdir -p "$DEST_PARENT"
tar -xzf "$ARCHIVE" -C "$DEST_PARENT"
ls -lah "$DEST_PARENT/uploads"
