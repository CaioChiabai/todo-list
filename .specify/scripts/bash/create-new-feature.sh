#!/usr/bin/env bash
# create-new-feature.sh — cria o esqueleto de uma nova feature.
# Uso: ./create-new-feature.sh "nome-da-feature"
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=common.sh
. "$DIR/common.sh"

NAME="${1:?Informe o nome da feature}"
ROOT="$(repo_root)"
SPECS="$(specs_dir)"
SLUG="$(echo "$NAME" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')"

NEXT=1
if [ -d "$SPECS" ]; then
  LAST="$(find "$SPECS" -maxdepth 1 -type d -name '[0-9][0-9][0-9]-*' \
    | sed -E 's#.*/([0-9]{3})-.*#\1#' | sort -n | tail -1 || true)"
  [ -n "$LAST" ] && NEXT=$((10#$LAST + 1))
fi
FEATURE_ID="$(printf '%03d-%s' "$NEXT" "$SLUG")"
DEST="$SPECS/$FEATURE_ID"

mkdir -p "$DEST"
cp "$ROOT/.specify/templates/spec-template.md" "$DEST/spec.md"
echo "Feature criada: $DEST"
echo "Edite $FEATURE_ID/spec.md e depois rode /speckit.plan."
