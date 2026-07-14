#!/bin/zsh

cd "$(dirname "$0")" || exit 1

if [[ ! -d node_modules ]]; then
  echo "首次运行，正在安装项目依赖…"
  npm install || {
    echo "依赖安装失败，请检查网络或 Node.js 环境。"
    read -k 1 "?按任意键关闭…"
    exit 1
  }
fi

echo "正在启动作品集预览…"
echo "关闭此窗口即可停止预览服务器。"
npm run dev -- --open
