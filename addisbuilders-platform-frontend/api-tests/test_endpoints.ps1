function Login($email, $password) {
  $body = @{ email = $email; password = $password } | ConvertTo-Json
  return Invoke-RestMethod -Uri 'http://localhost:8080/api/auth/login' -Method POST -Body $body -ContentType 'application/json'
}

function Test-Endpoint($name, $uri, $method, $token, $body = $null) {
  $headers = @{ Authorization = "Bearer $token" }
  try {
    if ($body) {
      $json = $body | ConvertTo-Json
      $res = Invoke-RestMethod -Uri $uri -Method $method -Headers $headers -Body $json -ContentType 'application/json'
    } else {
      $res = Invoke-RestMethod -Uri $uri -Method $method -Headers $headers
    }
    Write-Host "[OK] $name -> $method $uri"
    return $res
  } catch {
    $err = $_.Exception.Message
    if ($_.Exception.Response) {
      $stream = $_.Exception.Response.GetResponseStream()
      $reader = New-Object System.IO.StreamReader($stream)
      $err = $reader.ReadToEnd()
    }
    Write-Host "[ERROR] $name -> $method $uri : $err"
    return $null
  }
}

Write-Host "=== 1. TESTING LEARNER ENDPOINTS ==="
$learnerAuth = Login 'learner@addisbuilder.edu' 'password123'
$lToken = $learnerAuth.token
Test-Endpoint "Learner Me" "http://localhost:8080/api/auth/me" "GET" $lToken | Out-Null
Test-Endpoint "Learner Dashboard" "http://localhost:8080/api/dashboard/learner" "GET" $lToken | Out-Null
Test-Endpoint "Leaderboard" "http://localhost:8080/api/leaderboard" "GET" $lToken | Out-Null
Test-Endpoint "My Achievements" "http://localhost:8080/api/achievements/me" "GET" $lToken | Out-Null
Test-Endpoint "Learner Notifications" "http://localhost:8080/api/notifications" "GET" $lToken | Out-Null
Test-Endpoint "Course 1 Modules" "http://localhost:8080/api/courses/1/modules" "GET" $lToken | Out-Null
Test-Endpoint "Course 1 Progress" "http://localhost:8080/api/courses/1/progress" "GET" $lToken | Out-Null
Test-Endpoint "Course 1 Materials" "http://localhost:8080/api/courses/1/materials" "GET" $lToken | Out-Null
Test-Endpoint "Course 1 Assignments" "http://localhost:8080/api/courses/1/assignments" "GET" $lToken | Out-Null
Test-Endpoint "AI Study Plan" "http://localhost:8080/api/ai/study-plan?courseId=1" "GET" $lToken | Out-Null
Test-Endpoint "AI Progress Summary" "http://localhost:8080/api/ai/progress-summary" "GET" $lToken | Out-Null
Test-Endpoint "AI Internship Matches" "http://localhost:8080/api/ai/internship-matches?limit=5" "GET" $lToken | Out-Null
Test-Endpoint "AI Ask" "http://localhost:8080/api/ai/ask" "POST" $lToken @{ question = "What is Spring Boot?"; courseId = 1 } | Out-Null
Test-Endpoint "Learner Applications (my)" "http://localhost:8080/api/internships/applications/my" "GET" $lToken | Out-Null
Test-Endpoint "Learner Saved Internships" "http://localhost:8080/api/internships/saved" "GET" $lToken | Out-Null

Write-Host "`n=== 2. TESTING MENTOR ENDPOINTS ==="
$mentorAuth = Login 'mentor@addisbuilder.edu' 'password123'
$mToken = $mentorAuth.token
Test-Endpoint "Mentor Status" "http://localhost:8080/api/mentors/me/status" "GET" $mToken | Out-Null
Test-Endpoint "Mentor Dashboard" "http://localhost:8080/api/dashboard/mentor" "GET" $mToken | Out-Null
Test-Endpoint "Mentor Courses (all/mine)" "http://localhost:8080/api/courses" "GET" $mToken | Out-Null

Write-Host "`n=== 3. TESTING COORDINATOR ENDPOINTS ==="
$coordAuth = Login 'coordinator@addisbuilder.edu' 'password123'
$cToken = $coordAuth.token
Test-Endpoint "Coordinator Listings (mine)" "http://localhost:8080/api/internships/mine" "GET" $cToken | Out-Null
Test-Endpoint "Coordinator Applications" "http://localhost:8080/api/applications" "GET" $cToken | Out-Null

Write-Host "`n=== 4. TESTING EMPLOYER ENDPOINTS ==="
$empAuth = Login 'employer@addisbuilder.edu' 'password123'
$eToken = $empAuth.token
Test-Endpoint "Employer Organization (my)" "http://localhost:8080/api/organizations/my" "GET" $eToken | Out-Null
Test-Endpoint "Employer Listings (mine)" "http://localhost:8080/api/internships/mine" "GET" $eToken | Out-Null
Test-Endpoint "Employer Applications" "http://localhost:8080/api/applications" "GET" $eToken | Out-Null

Write-Host "`n=== 5. TESTING SUPER ADMIN ENDPOINTS ==="
$adminAuth = Login 'admin@addisbuilder.edu' 'password123'
$aToken = $adminAuth.token
Test-Endpoint "Admin Users List" "http://localhost:8080/api/admin/users" "GET" $aToken | Out-Null
Test-Endpoint "Admin Reports Overview" "http://localhost:8080/api/admin/reports/overview" "GET" $aToken | Out-Null
Test-Endpoint "Admin Mentor Requests" "http://localhost:8080/api/admin/mentor-requests" "GET" $aToken | Out-Null
Test-Endpoint "Admin Audit Logs" "http://localhost:8080/api/admin/audit-logs" "GET" $aToken | Out-Null
Test-Endpoint "Admin Organizations" "http://localhost:8080/api/admin/organizations" "GET" $aToken | Out-Null
