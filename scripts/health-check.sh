#!/usr/bin/env bash
set -euo pipefail

API_URL="${API_URL:-https://api.primeskyint.com/api/health}"

curl -fsS "$API_URL"
echo
