#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="${PROJECT_ROOT:-/srv/primeskyint}"
BRANCH="${DEPLOY_BRANCH:-feature/vps-coolify-migration-primeskyint}"

cd "$ROOT_DIR"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

echo "Source updated. Deploy through Coolify after reviewing environment variables."
