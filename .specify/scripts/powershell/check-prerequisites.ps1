# check-prerequisites.ps1 — verifica se os artefatos SDD esperados existem.

. "$PSScriptRoot/common.ps1"

$root = Get-RepoRoot
$specs = Get-SpecsDir -RepoRoot $root

Write-Host "Spec Kit — verificação de pré-requisitos"
Write-Host "Repo: $root"
Write-Host ""

Test-FileExists (Join-Path $root '.specify/memory/constitution.md') 'Constitution'
Test-FileExists (Join-Path $specs 'spec.md')       'Spec'
Test-FileExists (Join-Path $specs 'plan.md')       'Plan'
Test-FileExists (Join-Path $specs 'tasks.md')      'Tasks'
Test-FileExists (Join-Path $specs 'data-model.md') 'Data Model'
Test-FileExists (Join-Path $root 'docs/contracts/api-v1.md') 'API Contract'
