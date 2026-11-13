$auth = Invoke-RestMethod -Uri 'http://localhost:8080/api/auth/login' -Method POST -Body (@{ email = 'learner@addisbuilder.edu'; password = 'password123' } | ConvertTo-Json) -ContentType 'application/json'
try {
  $res = Invoke-RestMethod -Uri 'http://localhost:8080/api/courses/1/modules' -Method GET -Headers @{ Authorization = "Bearer $($auth.token)" }
  Write-Host "Success getting modules! Count: $($res.Count)"
} catch {
  $stream = $_.Exception.Response.GetResponseStream()
  $reader = New-Object System.IO.StreamReader($stream)
  Write-Host "Modules error: $($reader.ReadToEnd())"
}

