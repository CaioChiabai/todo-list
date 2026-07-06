# create-new-feature.ps1 — cria o esqueleto de uma nova feature a partir do template.
# Uso: ./create-new-feature.ps1 -Name "nome-da-feature"

param(
    [Parameter(Mandatory = $true)][string]$Name
)

. "$PSScriptRoot/common.ps1"

$root  = Get-RepoRoot
$specs = Get-SpecsDir -RepoRoot $root
$slug  = ($Name -replace '[^a-zA-Z0-9]+', '-').Trim('-').ToLower()

# Descobre o próximo número sequencial olhando features existentes.
$existing = Get-ChildItem -Path $specs -Directory -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -match '^\d{3}-' }
$next = 1
if ($existing) {
    $next = (($existing | ForEach-Object { [int]($_.Name.Substring(0,3)) } | Measure-Object -Maximum).Maximum) + 1
}
$featureId = '{0:D3}-{1}' -f $next, $slug
$dir = Join-Path $specs $featureId

New-Item -ItemType Directory -Force -Path $dir | Out-Null
$template = Join-Path $root '.specify/templates/spec-template.md'
Copy-Item $template (Join-Path $dir 'spec.md')

Write-Host "Feature criada: $dir"
Write-Host "Edite $featureId/spec.md e depois rode /speckit.plan."
