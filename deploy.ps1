Write-Host "Vercel Deployment Automation" -ForegroundColor Cyan

Write-Host "`nChecking Vercel Authentication..." -ForegroundColor Cyan
Write-Host "If you are not logged in, this will open a browser window to securely log you in..." -ForegroundColor Yellow
& npx vercel login

Write-Host "`nDeploying portfolio to Vercel (Production)..." -ForegroundColor Cyan
& npx vercel --prod --yes

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n Successfully deployed to Vercel!" -ForegroundColor Green
    Write-Host "Your website is now live!" -ForegroundColor Green
} else {
    Write-Host "`n Deployment failed. Make sure you completed the browser sign-in process!" -ForegroundColor Red
}
