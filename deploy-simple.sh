#!/bin/bash

# 简化部署脚本 - 使用sshpass
# 使用方法: ./deploy-simple.sh [SSH密码]

set -e

SERVER_IP="118.25.141.173"
USERNAME="root"
PASSWORD="$1"
PROJECT_NAME="xiaohuodong0310"
REMOTE_DIR="/var/www/$PROJECT_NAME"

if [ -z "$PASSWORD" ]; then
    echo "错误: 请提供SSH密码"
    echo "使用方法: ./deploy-simple.sh [SSH密码]"
    exit 1
fi

echo "========================================="
echo "  腾讯云主机部署"
echo "========================================="
echo ""
echo "服务器: $USERNAME@$SERVER_IP"
echo "项目: $PROJECT_NAME"
echo ""

# 检查sshpass
if ! command -v sshpass &> /dev/null; then
    echo "错误: 未安装sshpass"
    echo "请先安装: brew install hudochenkov/sshpass/sshpass"
    exit 1
fi

# 1. 创建远程目录
echo "步骤 1: 创建远程目录..."
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no "$USERNAME@$SERVER_IP" "mkdir -p $REMOTE_DIR"

echo "✓ 远程目录创建完成"
echo ""

# 2. 上传文件
echo "步骤 2: 上传文件到服务器..."
sshpass -p "$PASSWORD" rsync -avz --delete \
    -e "ssh -o StrictHostKeyChecking=no" \
    dist/ \
    "$USERNAME@$SERVER_IP:$REMOTE_DIR/"

echo "✓ 文件上传完成"
echo ""

# 3. 配置Nginx
echo "步骤 3: 配置Nginx..."
sshpass -p "$PASSWORD" scp -o StrictHostKeyChecking=no nginx-site.conf "$USERNAME@$SERVER_IP:/tmp/"

sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no "$USERNAME@$SERVER_IP" \
    "mv /tmp/nginx-site.conf /etc/nginx/sites-available/$PROJECT_NAME && \
     ln -sf /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/ && \
     nginx -t && \
     systemctl reload nginx"

echo "✓ Nginx配置完成"
echo ""

echo "========================================="
echo "  部署成功！"
echo "========================================="
echo ""
echo "访问地址: http://$SERVER_IP"
echo ""
