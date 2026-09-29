@echo off
chcp 65001 >nul
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"
set "BASE_DIR=%~dp0"
cd /d "%BASE_DIR%"

echo ==================================================
echo 🚀 研途规划 - 自动化构建并部署至 GitHub Pages
echo ==================================================
echo.
echo 📦 正在预编译打包前端核心 JavaScript 资源...
call npx --yes esbuild js/app.js --bundle --minify --outfile=dist/app.bundle.js --format=esm
if %errorlevel% neq 0 (
  echo ❌ 编译打包失败，请检查脚本语法！
  pause
  exit /b %errorlevel%
)
echo ✅ 资源预编译完成 (dist/app.bundle.js)！
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
echo 🔗 https://1357570890.github.io/plan/
echo ==================================================
echo.
pause
