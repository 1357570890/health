@echo off
chcp 65001 >nul
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"
set "BASE_DIR=%~dp0"
cd /d "%BASE_DIR%"

echo ==================================================
echo 🚀 研途生活健康中枢 - 一键更新部署至 GitHub Pages
echo ==================================================
echo.
git status -s
echo.
set /p COMMIT_MSG="请输入更新备注 (直接回车将使用当前时间自动提交): "
if "%COMMIT_MSG%"=="" set "COMMIT_MSG=update: %date% %time%"

git add .
git commit -m "%COMMIT_MSG%"
git push origin main

echo.
echo ==================================================
echo 🎉 最新版本已成功推送！
echo 预计20~30秒内全球自动生效更新：
echo 🔗 https://1357570890.github.io/health/
echo ==================================================
echo.
pause
