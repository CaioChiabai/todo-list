#!/usr/bin/env bash
# setup-plan.sh — copia o plan-template para docs/specs.
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=common.sh
. "$DIR/common.sh"

ROOT="$(repo_root)"
DEST="$(specs_dir)/plan.md"

if [ -f "$DEST" ]; then
  echo "plan.md já existe em $DEST — nada a fazer."
else
  cp "$ROOT/.specify/templates/plan-template.md" "$DEST"
  echo "plan.md criado em $DEST."
fi
