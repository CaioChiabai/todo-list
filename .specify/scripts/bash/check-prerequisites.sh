#!/usr/bin/env bash
# check-prerequisites.sh — verifica se os artefatos SDD esperados existem.
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=common.sh
. "$DIR/common.sh"

ROOT="$(repo_root)"
SPECS="$(specs_dir)"

echo "Spec Kit — verificação de pré-requisitos"
echo "Repo: $ROOT"
echo

file_exists "$ROOT/.specify/memory/constitution.md" "Constitution"
file_exists "$SPECS/spec.md"       "Spec"
file_exists "$SPECS/plan.md"       "Plan"
file_exists "$SPECS/tasks.md"      "Tasks"
file_exists "$SPECS/data-model.md" "Data Model"
file_exists "$ROOT/docs/contracts/api-v1.md" "API Contract"
