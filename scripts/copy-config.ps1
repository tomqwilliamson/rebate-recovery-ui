$distPath = "dist"
$publicPath = "public"

# Ensure dist directory exists
if (!(Test-Path $distPath)) {
    New-Item -ItemType Directory -Path $distPath
}

# Copy web.config
Copy-Item -Path "$publicPath\web.config" -Destination "$distPath\web.config" -Force

Write-Host "Successfully copied web.config to dist folder"
