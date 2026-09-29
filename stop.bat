@echo off
chcp 65001 >nul
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"
set "BASE_DIR=%~dp0"
cd /d "%BASE_DIR%"

echo 正在停止研途健康看板后台常驻服务...

for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8765" ^| findstr "LISTENING"') do (
    echo 正在关闭占用 8765 端口的进程 (PID: %%a)...
    taskkill /f /pid %%a >nul 2>&1
)

echo [完成] 服务已停止。
timeout /t 2 >nul
