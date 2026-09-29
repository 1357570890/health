@echo off
chcp 65001 >nul
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"
set "BASE_DIR=%~dp0"
cd /d "%BASE_DIR%"

echo 正在取消开机自启常驻配置...
set "LNK_PATH=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\GradHealthHub.lnk"

if exist "%LNK_PATH%" (
    del /f /q "%LNK_PATH%"
    echo [成功] 已从开机自启动项中移除！
) else (
    echo [提示] 未找到开机自启动快捷方式，无需移除。
)

echo.
pause
