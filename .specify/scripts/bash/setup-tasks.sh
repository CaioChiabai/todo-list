#!/usr/bin/env bash
# setup-tasks.sh — copia o tasks-template para docs/specs.
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=common.sh
. "$DIR/common.sh"

ROOT="$(repo_root)"
DEST="$(specs_dir)/tasks.md"

if [ -f "$DEST" ]; then
  echo "tasks.md já existe em $DEST — nada a fazer."
else
  cp "$ROOT/.specify/templates/tasks-template.md" "$DEST"
  echo "tasks.md criado em $DEST."
fi
