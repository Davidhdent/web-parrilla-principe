# Auditoría Lighthouse de la versión compilada (móvil por defecto; -Escritorio para escritorio).
# Uso:  npm run build ; powershell -File tests/lighthouse.ps1 [-Escritorio] [-Ruta /en/]
# Ojo: en Windows el resultado móvil local varía mucho. La cifra buena es la de PageSpeed Insights sobre la URL publicada.
param([switch]$Escritorio, [string]$Ruta = '/')

$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')
$raiz = Split-Path $PSScriptRoot -Parent
$salida = Join-Path $env:TEMP 'lighthouse-parrilla.json'
$srv = Start-Process -FilePath (Get-Command node).Source -ArgumentList 'node_modules/astro/bin/astro.mjs','preview','--port','4333' -WorkingDirectory $raiz -PassThru -WindowStyle Hidden
Start-Sleep -Seconds 6
try {
  $env:CHROME_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
  $extra = @(); if ($Escritorio) { $extra += '--preset=desktop' }
  npx --yes lighthouse@12 "http://localhost:4333$Ruta" --quiet --output=json "--output-path=$salida" '--chrome-flags=--headless=new' '--only-categories=performance,accessibility,best-practices,seo' @extra 2>$null | Out-Null
} finally { Stop-Process -Id $srv.Id -Force }

$j = Get-Content $salida -Raw -Encoding UTF8 | ConvertFrom-Json
$j.categories.PSObject.Properties | ForEach-Object { '{0,-15} {1}' -f $_.Name, [math]::Round($_.Value.score * 100) }
'LCP  ' + $j.audits.'largest-contentful-paint'.displayValue
'TBT  ' + $j.audits.'total-blocking-time'.displayValue
'CLS  ' + $j.audits.'cumulative-layout-shift'.displayValue
