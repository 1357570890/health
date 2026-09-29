@echo off
chcp 65001 >nul
set "PYTHONUTF8=1"
set "PYTHONIOENCODING=utf-8"
set "BASE_DIR=%~dp0"
cd /d "%BASE_DIR%"

echo ==================================================
echo 正在配置研途生活健康中枢为 Windows 开机静默自启常驻服务...
echo ==================================================

set "STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "VBS_PATH=%BASE_DIR%start-daemon.vbs"
set "LNK_PATH=%STARTUP_FOLDER%\GradHealthHub.lnk"

powershell -ExecutionPolicy Bypass -NoProfile -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('%LNK_PATH%'); $s.TargetPath = 'wscript.exe'; $s.Arguments = '\"%VBS_PATH%\"'; $s.WorkingDirectory = '%BASE_DIR%'; $s.Save()"

if exist "%LNK_PATH%" (
    echo [成功] 已成功加入 Windows 开机自启文件夹！
    echo 电脑每次开机后，健康中枢将在后台静默常驻运行（零黑框干扰）。
    echo 手机和电脑打开浏览器均可全天候随时访问。
) else (
    echo [失败] 快捷方式写入失败，请检查系统权限。
)

echo.
pause
