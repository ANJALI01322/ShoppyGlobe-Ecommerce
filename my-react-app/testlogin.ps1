$body = @{email='nikhil@gmail.com'; password='nikhil123'} | ConvertTo-Json
$response = Invoke-RestMethod -Uri 'http://localhost:1900/api/auth/login' -Method POST -ContentType 'application/json' -Body $body
$response
