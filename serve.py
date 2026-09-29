import os
import sys
import socket
import webbrowser
import http.server

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except AttributeError:
        pass

PORT = 8765
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT_DIR)

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

def main():
    local_ip = get_local_ip()
    print("=" * 60)
    print("🚀 研途生活健康中枢 (GradHealth Hub) 多线程本地服务已启动")
    print(f"💻 电脑端本地访问: http://localhost:{PORT}")
    print(f"📱 手机端局域网访问: http://{local_ip}:{PORT}")
    print(f"💡 跨端指南：手机连接与电脑相同的实验室WiFi或手机热点，即可在手机浏览器打开！")
    print(f"💡 手机提示：在手机Safari或Chrome中点击【添加到主屏幕】，即可全屏免安装使用！")
    print(f"📁 根目录: {ROOT_DIR}")
    print("按 Ctrl+C 可停止服务")
    print("=" * 60)

    webbrowser.open(f"http://localhost:{PORT}")

    # 使用多线程HTTP服务器，解决静态资源并发加载时的阻塞与连接拒绝问题
    with http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n正在关闭本地服务...")

if __name__ == "__main__":
    main()
