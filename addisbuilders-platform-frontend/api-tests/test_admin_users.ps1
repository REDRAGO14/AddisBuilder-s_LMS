$adminAuth = Invoke-RestMethod -Uri 'http://localhost:8080/api/auth/login' -Method POST -Body (@{ email = 'admin@addisbuilder.edu'; password = 'password123' } | ConvertTo-Json) -ContentType 'application/json'
try {
  $res = Invoke-RestMethod -Uri 'http://localhost:8080/api/admin/users' -Method GET -Headers @{ Authorization = "Bearer $($adminAuth.token)" }
  Write-Host "Success getting /admin/users! Count: $($res.Count)"
  $res | ForEach-Object { Write-Host " - $($_.id): $($_.fullName) ($($_.email)) [$($_.role)]" }
} catch {
  $stream = $_.Exception.Response.GetResponseStream()
  $reader = New-Object System.IO.StreamReader($stream)
  Write-Host "Admin users error: $($reader.ReadToEnd())"
}

