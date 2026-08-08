# 档案全貌消费层

这是从 `LLM wiki/wiki/` 生成的静态导航原型。主导航排除 `page_depth: stub`，案件区保留全部非 stub 案件，关键人物与关键机构只显示 `page_depth: rich` 页面。

重新生成数据：

```powershell
python build_data.py
```

本地预览（端口随命令结束会被杀，请用稳定端口 + `--directory` 指向本目录）：

```powershell
C:/Users/nalie/.workbuddy/binaries/python/versions/3.13.12/python.exe -m http.server 8090 --directory "C:/Users/nalie/Documents/workspace/周立太/消费层/档案全貌"
```

访问 `http://localhost:8090/`。
