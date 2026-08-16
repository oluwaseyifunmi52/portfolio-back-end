$server = Start-Process -FilePath "node" -ArgumentList "src/server.js" -PassThru -WorkingDirectory "C:\Users\USER\OneDrive\Desktop\portfolio backend"
Start-Sleep -Seconds 8

Write-Host "Testing health endpoint..."
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method GET -UseBasicParsing
    Write-Host "Health Status: $($response.StatusCode)"
    Write-Host "Health Content: $($response.Content)"
} catch {
    Write-Host "Health Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object IO.StreamReader $stream
        $content = $reader.ReadToEnd()
        Write-Host "Health Response: $content"
    }
}

Write-Host ""
Write-Host "Testing contact endpoint..."
try {
    $body = Get-Content -Path "C:\Users\USER\OneDrive\Desktop\portfolio backend\test_payload.json" -Raw
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/contact" -Method POST -ContentType "application/json" -Body $body -UseBasicParsing
    Write-Host "Contact Status: $($response.StatusCode)"
    Write-Host "Contact Content: $($response.Content)"
} catch {
    Write-Host "Contact Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object IO.StreamReader $stream
        $content = $reader.ReadToEnd()
        Write-Host "Contact Response: $content"
    }
}

Stop-Process -Id $server.Id -Force