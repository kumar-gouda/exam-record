import webbrowser
import os
webbrowser.open_new_tab("http://127.0.0.1:8000/home.html")
print("Server running...")
os.system("python3 -m http.server")
