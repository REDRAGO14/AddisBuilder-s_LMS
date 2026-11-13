$coordAuth = Invoke-RestMethod -Uri 'http://localhost:8080/api/auth/login' -Method POST -Body (@{ email = 'coordinator@addisbuilder.edu'; password = 'password123' } | ConvertTo-Json) -ContentType 'application/json'
try {
  $res = Invoke-RestMethod -Uri 'http://localhost:8080/api/internships/mine' -Method GET -Headers @{ Authorization = "Bearer $($coordAuth.token)" }
  Write-Host "Success getting Coordinator /internships/mine! Count: $($res.Count)"
} catch {
  $stream = $_.Exception.Response.GetResponseStream()
  $reader = New-Object System.IO.StreamReader($stream)
  Write-Host "Coordinator mine error: $($reader.ReadToEnd())"
}

$empAuth = Invoke-RestMethod -Uri 'http://localhost:8080/api/auth/login' -Method POST -Body (@{ email = 'employer@addisbuilder.edu'; password = 'password123' } | ConvertTo-Json) -ContentType 'application/json'
try {
  $res = Invoke-RestMethod -Uri 'http://localhost:8080/api/internships/mine' -Method GET -Headers @{ Authorization = "Bearer $($empAuth.token)" }
  Write-Host "Success getting Employer /internships/mine! Count: $($res.Count)"
} catch {
  $stream = $_.Exception.Response.GetResponseStream()
  $reader = New-Object System.IO.StreamReader($stream)
  Write-Host "Employer mine error: $($reader.ReadToEnd())"
}

