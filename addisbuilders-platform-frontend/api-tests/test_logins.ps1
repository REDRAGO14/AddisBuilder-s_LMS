$users = @(
  @{ email = 'admin@addisbuilder.edu'; role = 'SUPER_ADMIN' },
  @{ email = 'mentor@addisbuilder.edu'; role = 'MENTOR' },
  @{ email = 'coordinator@addisbuilder.edu'; role = 'INTERNSHIP_COORDINATOR' },
  @{ email = 'employer@addisbuilder.edu'; role = 'EMPLOYER' },
  @{ email = 'learner@addisbuilder.edu'; role = 'LEARNER' }
)

foreach ($u in $users) {
  $body = @{ email = $u.email; password = 'password123' } | ConvertTo-Json
  try {
    $res = Invoke-RestMethod -Uri 'http://localhost:8080/api/auth/login' -Method POST -Body $body -ContentType 'application/json'
    Write-Host "[SUCCESS] $($u.role) ($($u.email)) logged in successfully! ID: $($res.id), Name: $($res.fullName), Role: $($res.role)"
  } catch {
    Write-Host "[FAIL] $($u.role) ($($u.email)): $($_.Exception.Message)"
  }
}

