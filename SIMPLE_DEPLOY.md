# 小白专用部署指南

## 🎯 最简单的部署方法（推荐）

### 方法：使用文件上传工具（最简单）

#### 步骤1：在服务器上执行一条命令

在腾讯云控制台的VNC或终端中，复制粘贴以下命令：

```bash
curl -fsSL https://raw.githubusercontent.com/your-username/xiaohuodong0310/main/server-deploy.sh | bash
```

**或者**，如果上面的命令不行，直接复制下面的完整脚本：

```bash
#!/bin/bash

echo "========================================="
echo "  小活动管理系统 - 部署准备"
echo "========================================="

# 1. 安装工具
apt-get update -qq
apt-get install -y curl rsync nginx

# 2. 创建目录
mkdir -p /var/www/xiaohuodong0310
chown -R www-data:www-data /var/www/xiaohuodong0310
chmod -R 755 /var/www/xiaohuodong0310

# 3. 配置Nginx
cat > /etc/nginx/sites-available/xiaohuodong0310 << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/xiaohuodong0310;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

ln -sf /etc/nginx/sites-available/xiaohuodong0310 /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

echo "✓ 服务器配置完成！"
echo ""
echo "========================================="
echo "  现在需要上传文件"
echo "========================================="
```

---

#### 步骤2：下载文件上传工具

**推荐工具：FileZilla（免费，最简单）**

1. 访问：https://filezilla-project.org/
2. 下载并安装 FileZilla
3. 打开 FileZilla

#### 步骤3：连接到服务器

在 FileZilla 中填入以下信息：

- **主机**：`118.25.141.173`
- **用户名**：`root`
- **密码**：你的SSH密码（`Wytgsjks_2024@0`）
- **端口**：`22`
- **协议**：`SFTP`

点击"快速连接"按钮。

#### 步骤4：上传文件

1. 在 FileZilla 左侧（本地）找到项目文件夹中的 `dist` 目录
2. 在右侧（服务器）找到 `/var/www/xiaohuodong0310` 目录
3. 将 `dist` 目录下的所有文件拖拽到右侧的服务器目录
4. 等待上传完成（看到"传输完成"提示）

#### 步骤5：验证部署

打开浏览器，访问：**http://118.25.141.173**

如果看到活动管理页面，说明部署成功！🎉

---

## 📱 其他文件上传工具

### WinSCP（Windows用户）

1. 下载：https://winscp.net/
2. 安装后打开
3. 连接信息同上
4. 上传 `dist` 目录到 `/var/www/xiaohuodong0310`

### Cyberduck（macOS用户）

1. 下载：https://cyberduck.io/
2. 安装后打开
3. 连接信息同上
4. 上传 `dist` 目录到 `/var/www/xiaohuodong0310`

---

## 🔧 如果遇到问题

### 问题1：连接失败

**解决**：
1. 检查密码是否正确
2. 确认服务器IP是否正确：`118.25.141.173`
3. 检查腾讯云安全组是否开放22端口

### 问题2：上传后无法访问

**解决**：
1. 检查文件是否上传到正确目录：`/var/www/xiaohuodong0310`
2. 检查Nginx是否运行：`systemctl status nginx`
3. 查看错误日志：`tail /var/log/nginx/error.log`

### 问题3：页面显示404

**解决**：
1. 确认上传了 `index.html` 文件
2. 检查Nginx配置中的 `try_files` 指令
3. 重启Nginx：`systemctl restart nginx`

---

## 📞 需要帮助？

如果以上步骤遇到问题：

1. **查看详细文档**：[TROUBLESHOOTING.md](file:///Users/haifangzhao/Documents/2025-app/Xiaohuodong0310/TROUBLESHOOTING.md)
2. **腾讯云技术支持**：95716
3. **在线客服**：https://cloud.tencent.com/act/event

---

## ✅ 部署检查清单

- [ ] 已在服务器上执行配置命令
- [ ] 已安装文件上传工具（FileZilla）
- [ ] 已成功连接到服务器
- [ ] 已上传 dist 目录到服务器
- [ ] 可以访问 http://118.25.141.173
- [ ] 页面显示正常

---

## 🎉 部署成功后的下一步

1. **配置域名**（可选）：
   - 在域名DNS中添加A记录指向 `118.25.141.173`
   - 更新Nginx配置中的 `server_name`

2. **配置HTTPS**（可选）：
   - 申请SSL证书（Let's Encrypt免费）
   - 更新Nginx配置支持443端口

3. **配置数据库**（可选）：
   - 在服务器上创建 `.env` 文件
   - 填入Supabase配置信息

---

## 💡 小贴士

1. **首次部署**：建议使用FileZilla，图形界面更直观
2. **后续更新**：只需上传新的 `dist` 目录即可
3. **备份**：定期备份服务器上的文件
4. **监控**：配置服务器监控和告警
