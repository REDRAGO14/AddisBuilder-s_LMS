$auth = Invoke-RestMethod -Uri 'http://localhost:8080/api/auth/login' -Method POST -Body (@{ email = 'learner@addisbuilder.edu'; password = 'password123' } | ConvertTo-Json) -ContentType 'application/json'
try {
  $res = Invoke-RestMethod -Uri 'http://localhost:8080/api/courses/1/curriculum' -Method GET -Headers @{ Authorization = "Bearer $($auth.token)" }
} catch {
  $stream = $_.Exception.Response.GetResponseStream()
  $reader = New-Object System.IO.StreamReader($stream)
  $responseBody = $reader.ReadToEnd()
  Write-Host "Curriculum error: $responseBody"
}

$mentorAuth = Invoke-RestMethod -Uri 'http://localhost:8080/api/auth/login' -Method POST -Body (@{ email = 'mentor@addisbuilder.edu'; password = 'password123' } | ConvertTo-Json) -ContentType 'application/json'
try {
  $res = Invoke-RestMethod -Uri 'http://localhost:8080/api/courses/mine' -Method GET -Headers @{ Authorization = "Bearer $($mentorAuth.token)" }
} catch {
  $stream = $_.Exception.Response.GetResponseStream()
  $reader = New-Object System.IO.StreamReader($stream)
  $responseBody = $reader.ReadToEnd()
  Write-Host "Courses mine error: $responseBody"
}

$adminAuth = Invoke-RestMethod -Uri 'http://localhost:8080/api/auth/login' -Method POST -Body (@{ email = 'admin@addisbuilder.edu'; password = 'password123' } | ConvertTo-Json) -ContentType 'application/json'
try {
  $res = Invoke-RestMethod -Uri 'http://localhost:8080/api/users' -Method GET -Headers @{ Authorization = "Bearer $($adminAuth.token)" }
} catch {
  $stream = $_.Exception.Response.GetResponseStream()
  $reader = New-Object System.IO.StreamReader($stream)
  $responseBody = $reader.ReadToEnd()
  Write-Host "Users error: $responseBody"
}
try {
  $res = Invoke-RestMethod -Uri 'http://localhost:8080/api/admin/reports' -Method GET -Headers @{ Authorization = "Bearer $($adminAuth.token)" }
} catch {
  $stream = $_.Exception.Response.GetResponseStream()
  $reader = New-Object System.IO.StreamReader($stream)
  $responseBody = $reader.ReadToEnd()
  Write-Host "Reports error: $responseBody"
}

