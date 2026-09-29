@echo off
chcp 65001 >nul
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"
set "BASE_DIR=%~dp0"
cd /d "%BASE_DIR%"

echo 正在启动研途健康看板 (GradHealth Hub)...
python -u -X utf8 serve.py
pause
