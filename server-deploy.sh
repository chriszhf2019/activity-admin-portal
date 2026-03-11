#!/bin/bash

# 一键部署脚本 - 在服务器上执行
# 使用方法：curl -fsSL https://your-domain.com/deploy.sh | bash

set -e

echo "========================================="
echo "  小活动管理系统 - 一键部署"
echo "========================================="
echo ""

# 配置
PROJECT_NAME="xiaohuodong0310"
PROJECT_DIR="/var/www/$PROJECT_NAME"
NGINX_CONF="/etc/nginx/sites-available/$PROJECT_NAME"

# 1. 安装必要工具
echo "步骤 1/5: 安装必要工具..."
apt-get update -qq
apt-get install -y curl rsync nginx

echo "✓ 工具安装完成"
echo ""

# 2. 创建项目目录
echo "步骤 2/5: 创建项目目录..."
mkdir -p $PROJECT_DIR
chown -R www-data:www-data $PROJECT_DIR
chmod -R 755 $PROJECT_DIR

echo "✓ 目录创建完成"
echo ""

# 3. 配置Nginx
echo "步骤 3/5: 配置Nginx..."
cat > $NGINX_CONF << 'EOF'
server {
    listen 80;
    server_name _;
    root $PROJECT_DIR;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

ln -sf $NGINX_CONF /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

echo "✓ Nginx配置完成"
echo ""

# 4. 显示部署说明
echo "========================================="
echo "  部署准备完成！"
echo "========================================="
echo ""
echo "现在需要上传项目文件："
echo ""
echo "方法1 - 使用文件上传工具（推荐）："
echo "  1. 下载 FileZilla: https://filezilla-project.org/"
echo "  2. 连接到服务器：118.25.141.173"
echo "  3. 用户：root"
echo "  4. 密码：你的SSH密码"
echo "  5. 上传 dist/ 目录下的所有文件到：$PROJECT_DIR"
echo ""
echo "方法2 - 使用SCP命令（本地）："
echo "  scp -r dist/* root@118.25.141.173:$PROJECT_DIR/"
echo ""
echo "上传完成后，访问：http://118.25.141.173"
echo ""
echo "========================================="
