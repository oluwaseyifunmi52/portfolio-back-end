$server = Start-Process -FilePath "node" -ArgumentList "src/server.js" -PassThru -WorkingDirectory "C:\Users\USER\OneDrive\Desktop\portfolio backend" -RedirectStandardOutput "server_out.txt" -RedirectStandardError "server_err.txt"
Start-Sleep -Seconds 10

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
        Write-Host "Contact Response: '$content'"
    }
}

Start-Sleep -Seconds 2
Stop-Process -Id $server.Id -Force

Write-Host ""
Write-Host "=== Server Stdout ==="
Get-Content "server_out.txt" -ErrorAction SilentlyContinue
Write-Host ""
Write-Host "=== Server Stderr ==="
Get-Content "server_err.txt" -ErrorAction SilentlyContinue