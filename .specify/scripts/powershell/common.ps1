# common.ps1 — funções compartilhadas pelos scripts do Spec Kit.

function Get-RepoRoot {
    $root = git rev-parse --show-toplevel 2>$null
    if (-not $root) { $root = (Get-Location).Path }
    return $root
}

function Get-CurrentBranch {
    return (git rev-parse --abbrev-ref HEAD 2>$null)
}

function Get-SpecsDir {
    param([string]$RepoRoot)
    # Neste projeto os artefatos SDD são publicados em docs/specs.
    return (Join-Path $RepoRoot 'docs/specs')
}

function Test-FileExists {
    param([string]$Path, [string]$Label)
    if (Test-Path $Path) { Write-Host "  [OK]    $Label -> $Path" }
    else { Write-Host "  [FALTA] $Label -> $Path" }
}
