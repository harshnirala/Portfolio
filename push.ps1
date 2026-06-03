$gitPath = "d:\TP\ANTIGRAVITY\P-1\.git-bin\cmd\git.exe"
if (!(Test-Path $gitPath)) {
    $gitPath = "git"
}

$repoName = Read-Host "Enter your GitHub repository name (default: portfolio-new)"
if ([string]::IsNullOrEmpty($repoName)) {
    $repoName = "portfolio-new"
}

Write-Host "`nInitializing Git repository..." -ForegroundColor Cyan
& $gitPath init

Write-Host "Configuring branch and remote..." -ForegroundColor Cyan
& $gitPath branch -M main
$remoteUrl = "https://github.com/harshnirala/$repoName.git"

$remotes = & $gitPath remote
if ($remotes -contains "origin") {
    & $gitPath remote set-url origin $remoteUrl
} else {
    & $gitPath remote add origin $remoteUrl
}

# Create .gitignore if it doesn't exist
$gitignoreContent = @(
    "*.log",
    "C:\Users\harsh\.gemini\*",
    "scratch/*",
    ".DS_Store"
)
$gitignoreContent | Out-File -FilePath .gitignore -Encoding utf8 -Force

Write-Host "Staging and committing files..." -ForegroundColor Cyan
& $gitPath add .
& $gitPath commit -m "Initialize premium Dark Nebula portfolio"

Write-Host "`nConnecting to GitHub and pushing to: $remoteUrl" -ForegroundColor Cyan
Write-Host "A browser sign-in pop-up will appear to securely authenticate your account..." -ForegroundColor Yellow

& $gitPath push -u origin main -f

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "View your repo at: https://github.com/harshnirala/$repoName" -ForegroundColor Green
} else {
    Write-Host "`n Push failed. Make sure you have created the repository '$repoName' on https://github.com/harshnirala first!" -ForegroundColor Red
}
