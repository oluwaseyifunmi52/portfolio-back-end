$body = Get-Content -Path "C:\Users\USER\OneDrive\Desktop\portfolio backend\test_payload.json" -Raw
$response = Invoke-WebRequest -Uri "http://localhost:5000/api/contact" -Method POST -ContentType "application/json" -Body $body -UseBasicParsing
Write-Host "Status: $($response.StatusCode)"
Write-Host "Content: $($response.Content)"