@echo off
chcp 65001 >nul
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"
set "BASE_DIR=%~dp0"
cd /d "%BASE_DIR%"

echo ==================================================
echo 🚀 研途生活健康中枢 - GitHub Pages 部署与更新
echo ==================================================
echo 专属公网地址：https://1357570890.github.io/plan/
echo.

git status -s
echo.

git add .
set /p COMMIT_MSG="请输入更新备注 (直接回车将使用当前时间): "
if "%COMMIT_MSG%"=="" set "COMMIT_MSG=update: %date% %time%"

git commit -m "%COMMIT_MSG%"
git push origin main

echo.
echo ==================================================
echo 🎉 推送完成！GitHub Pages 将在20~30秒内自动刷新生效。
echo 手机/电脑访问地址：https://1357570890.github.io/plan/
echo ==================================================
echo.
pause
