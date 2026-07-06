# setup-tasks.ps1 — copia o tasks-template para a pasta de docs/specs.

. "$PSScriptRoot/common.ps1"

$root  = Get-RepoRoot
$specs = Get-SpecsDir -RepoRoot $root
$dest  = Join-Path $specs 'tasks.md'

if (Test-Path $dest) {
    Write-Host "tasks.md já existe em $dest — nada a fazer."
} else {
    Copy-Item (Join-Path $root '.specify/templates/tasks-template.md') $dest
    Write-Host "tasks.md criado em $dest."
}
