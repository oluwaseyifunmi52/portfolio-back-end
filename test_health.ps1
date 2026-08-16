$server = Start-Process -FilePath "node" -ArgumentList "src/server.js" -PassThru -WorkingDirectory "C:\Users\USER\OneDrive\Desktop\portfolio backend"
Start-Sleep -Seconds 8
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method GET -UseBasicParsing
    Write-Host "Status: $($response.StatusCode)"
    Write-Host "Content: $($response.Content)"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object IO.StreamReader $stream
        $content = $reader.ReadToEnd()
        Write-Host "Response: $content"
    }
}
Stop-Process -Id $server.Id -Force