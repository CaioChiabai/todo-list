# setup-plan.ps1 — copia o plan-template para a pasta de docs/specs.

. "$PSScriptRoot/common.ps1"

$root  = Get-RepoRoot
$specs = Get-SpecsDir -RepoRoot $root
$dest  = Join-Path $specs 'plan.md'

if (Test-Path $dest) {
    Write-Host "plan.md já existe em $dest — nada a fazer."
} else {
    Copy-Item (Join-Path $root '.specify/templates/plan-template.md') $dest
    Write-Host "plan.md criado em $dest."
}
