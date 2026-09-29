@echo off
chcp 65001 >nul
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"
set "BASE_DIR=%~dp0"
cd /d "%BASE_DIR%"

echo ==================================================
echo 🚀 研途规划 - GitHub Pages 部署与更新
echo ==================================================
echo 专属公网地址：https://1357570890.github.io/plan/
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
