@echo off
chcp 65001 >nul
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"
set "BASE_DIR=%~dp0"
cd /d "%BASE_DIR%"

echo ==================================================
echo 🚀 研途生活健康中枢 - 一键部署至 GitHub Pages
echo ==================================================
echo 部署后您将获得永久专属域名，手机电脑随时随地免费打开！
echo.

set /p REPO_URL="请输入您的 GitHub 远程仓库地址 (如 https://github.com/username/health.git): "

if "%REPO_URL%"=="" (
    echo [错误] 仓库地址不能为空！
    pause
    exit /b
)

if not exist ".git" (
    git init
    git branch -M main
)

git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

git add .
git commit -m "feat: deploy GradHealth Hub full-stack static web app"
git push -u origin main --force

echo.
echo ==================================================
echo 🎉 代码推送完成！
echo 接下来只需最后一步即可永久上线：
echo 1. 打开您的 GitHub 仓库网页；
echo 2. 进入 Settings -^> Pages；
echo 3. 在 Build and deployment 下将 Branch 选为 main，点击 Save；
echo 4. 等待1分钟即可获得永久免费公网网址 (如 https://username.github.io/health/)！
echo ==================================================
echo.
pause
