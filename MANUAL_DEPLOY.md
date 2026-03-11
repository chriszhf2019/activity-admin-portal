# 手动部署到腾讯云主机

## 服务器信息
- IP: 118.25.141.173
- 用户: root
- 密码: Wytgsjks_2024@0

## 部署步骤

### 步骤1：连接到服务器

```bash
ssh root@118.25.141.173
# 输入密码: Wytgsjks_2024@0
```

### 步骤2：创建项目目录

```bash
mkdir -p /var/www/xiaohuodong0310
chown -R www-data:www-data /var/www/xiaohuodong0310
```

### 步骤3：配置Nginx

```bash
# 创建Nginx配置文件
cat > /etc/nginx/sites-available/xiaohuodong0310 << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/xiaohuodong0310;
    index index.html;

    # 主路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

# 创建软链接
ln -sf /etc/nginx/sites-available/xiaohuodong0310 /etc/nginx/sites-enabled/

# 测试配置
nginx -t

# 重启Nginx
systemctl reload nginx
```

### 步骤4：上传文件（在本地执行）

在本地项目根目录执行：

```bash
# 使用scp上传
scp -r dist/* root@118.25.141.173:/var/www/xiaohuodong0310/

# 或使用rsync上传（推荐）
rsync -avz --delete \
    -e "ssh -o StrictHostKeyChecking=no" \
    dist/ \
    root@118.25.141.173:/var/www/xiaohuodong0310/
```

### 步骤5：设置权限（在服务器上执行）

```bash
chown -R www-data:www-data /var/www/xiaohuodong0310
chmod -R 755 /var/www/xiaohuodong0310
```

## 验证部署

```bash
# 检查Nginx状态
systemctl status nginx

# 查看访问日志
tail -f /var/log/nginx/access.log

# 查看错误日志
tail -f /var/log/nginx/error.log
```

访问 http://118.25.141.173 查看部署结果。

## 快速一键部署（如果服务器已配置）

如果服务器已经安装了rsync和配置好Nginx，可以直接在本地执行：

```bash
rsync -avz --delete \
    -e "ssh -o StrictHostKeyChecking=no" \
    dist/ \
    root@118.25.141.173:/var/www/xiaohuodong0310/
```
