#!/usr/bin/env bash
# common.sh — funções compartilhadas pelos scripts do Spec Kit.

repo_root() {
  git rev-parse --show-toplevel 2>/dev/null || pwd
}

current_branch() {
  git rev-parse --abbrev-ref HEAD 2>/dev/null
}

specs_dir() {
  # Neste projeto os artefatos SDD são publicados em docs/specs.
  echo "$(repo_root)/docs/specs"
}

file_exists() {
  local path="$1" label="$2"
  if [ -f "$path" ]; then echo "  [OK]    $label -> $path"
  else echo "  [FALTA] $label -> $path"; fi
}
