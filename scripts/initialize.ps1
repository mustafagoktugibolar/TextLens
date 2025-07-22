$projectRoot = Resolve-Path "$PSScriptRoot\.."
$distFolder = Join-Path $projectRoot "dist"

if (Test-Path $distFolder) {
    Remove-Item $distFolder -Recurse -Force
    Write-Host "🧹 Removed old dist folder"
}

Write-Host "Building project..."
npm run build

$copyList = @(
    @{ from = "$projectRoot\manifest.json"; to = "$distFolder\manifest.json" },
    @{ from = "$projectRoot\index.html";     to = "$distFolder\index.html" },
    @{ from = "$projectRoot\public\content.js"; to = "$distFolder\content.js" }
)

foreach ($item in $copyList) {
    if (Test-Path $item.from) {
        Copy-Item $item.from -Destination $item.to -Force
        Write-Host "Copied $(Split-Path $item.from -Leaf) to dist/"
    } else {
        Write-Host "MISSING: $($item.from)" -ForegroundColor Red
    }
}

$requiredFiles = @(
    "$distFolder\widget.js",
    "$distFolder\content.js",
    "$distFolder\index.html",
    "$distFolder\manifest.json"
)

$missing = $requiredFiles | Where-Object { -not (Test-Path $_) }

if ($missing.Count -eq 0) {
    Write-Host "`nBUILD SUCCESSFUL" -ForegroundColor Green
} else {
    Write-Host "`nBUILD INCOMPLETE — Missing files:" -ForegroundColor Red
    $missing | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
}
