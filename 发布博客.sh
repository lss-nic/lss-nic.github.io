#!/bin/bash

# 检测_post文件夹是否有新文章
if [ "$(ls -A source/_posts)" ]; then
    # 清理Hexo生成文件
    npx hexo clean

    # 生成指定文件夹内的静态文件
    npx hexo generate

    # 部署到您的目标位置
    npx hexo deploy

    echo "博客已成功部署"
else
    echo "没有新文章需要发布"
fi

# 等待用户输入，手动退出终端
read -p "按任意键退出..."