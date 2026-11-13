$adminAuth = Invoke-RestMethod -Uri 'http://localhost:8080/api/auth/login' -Method POST -Body (@{ email = 'admin@addisbuilder.edu'; password = 'password123' } | ConvertTo-Json) -ContentType 'application/json'
try {
  $res = Invoke-RestMethod -Uri 'http://localhost:8080/api/admin/reports/overview' -Method GET -Headers @{ Authorization = "Bearer $($adminAuth.token)" }
  Write-Host "Success getting /admin/reports/overview!"
  $res | ConvertTo-Json | Write-Host
} catch {
  $stream = $_.Exception.Response.GetResponseStream()
  $reader = New-Object System.IO.StreamReader($stream)
  Write-Host "Reports overview error: $($reader.ReadToEnd())"
}

