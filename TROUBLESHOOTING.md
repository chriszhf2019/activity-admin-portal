# 服务器连接问题排查与解决方案

## 问题诊断结果

✅ **网络连接正常**
- Ping 成功：118.25.141.173 延迟约 8ms
- SSH 端口 22 开放

❌ **SSH 连接失败**
- 无法使用密码连接到服务器

## 可能的原因

### 1. SSH 密码错误
**症状**：连接时提示密码错误或连接被拒绝

**解决方案**：
1. 确认密码是否正确
2. 检查是否需要使用SSH密钥而非密码
3. 在腾讯云控制台重置密码

### 2. SSH 服务未启动
**症状**：端口22开放但SSH服务未运行

**解决方案**：
```bash
# 连接到服务器（使用腾讯云控制台的VNC或临时密码）
ssh root@118.25.141.173

# 检查SSH服务状态
systemctl status ssh

# 如果未启动，启动SSH服务
systemctl start ssh
systemctl enable ssh
```

### 3. 防火墙阻止
**症状**：网络正常但SSH连接被拒绝

**解决方案**：

#### 检查腾讯云安全组
1. 登录腾讯云控制台
2. 进入"云服务器" → "安全组"
3. 确保以下规则已添加：
   - 协议：TCP
   - 端口：22
   - 来源：0.0.0.0/0（或你的IP）
   - 策略：允许

#### 检查服务器防火墙
```bash
# 检查UFW状态
ufw status

# 如果启用，允许SSH
ufw allow 22/tcp
ufw reload

# 检查iptables
iptables -L -n
```

### 4. SSH 配置问题
**症状**：SSH配置不允许密码登录

**解决方案**：
```bash
# 编辑SSH配置
vim /etc/ssh/sshd_config

# 确保以下配置正确：
PasswordAuthentication yes
PermitRootLogin yes

# 重启SSH服务
systemctl restart sshd
```

## 推荐的部署方案

### 方案A：使用腾讯云控制台（最简单）

1. 登录腾讯云控制台
2. 找到你的服务器实例
3. 点击"登录"或"VNC"
4. 在浏览器中直接操作服务器

### 方案B：使用SSH密钥（推荐）

#### 生成SSH密钥（本地）

```bash
# 生成密钥对
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# 查看公钥
cat ~/.ssh/id_rsa.pub
```

#### 配置服务器使用密钥

1. 在腾讯云控制台 → SSH密钥管理
2. 添加你的公钥
3. 重启服务器或重新绑定密钥

#### 使用密钥连接

```bash
# 使用密钥连接（无需密码）
ssh -i ~/.ssh/id_rsa root@118.25.141.173
```

### 方案C：重置密码

1. 登录腾讯云控制台
2. 进入"云服务器" → "实例管理"
3. 点击"重置密码"
4. 设置新密码
5. 等待服务器重启完成

## 手动部署步骤（无需SSH工具）

### 步骤1：在腾讯云控制台操作

1. 登录腾讯云控制台
2. 使用"登录"或"VNC"进入服务器
3. 执行以下命令：

```bash
# 创建项目目录
mkdir -p /var/www/xiaohuodong0310
chown -R www-data:www-data /var/www/xiaohuodong0310

# 安装Nginx（如果未安装）
apt-get update
apt-get install -y nginx

# 配置Nginx
cat > /etc/nginx/sites-available/xiaohuodong0310 << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/xiaohuodong0310;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# 启用配置
ln -sf /etc/nginx/sites-available/xiaohuodong0310 /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

### 步骤2：上传文件

由于无法SSH连接，有以下几种方式：

#### 方式1：使用腾讯云文件上传

1. 在腾讯云控制台找到服务器
2. 点击"文件上传"或使用"文件管理"
3. 将 `dist` 目录下的所有文件上传到 `/var/www/xiaohuodong0310/`

#### 方式2：使用SFTP工具

推荐工具：
- FileZilla（免费）
- WinSCP（Windows）
- Cyberduck（macOS）

配置：
- 主机：118.25.141.173
- 用户：root
- 密码：Wytgsjks_2024@0
- 端口：22
- 协议：SFTP
- 远程目录：/var/www/xiaohuodong0310

#### 方式3：使用临时密码重置后连接

1. 在腾讯云控制台重置密码
2. 使用新密码SSH连接
3. 上传文件

### 步骤3：设置权限

```bash
# 在服务器上执行
chown -R www-data:www-data /var/www/xiaohuodong0310
chmod -R 755 /var/www/xiaohuodong0310
```

## 验证部署

访问：**http://118.25.141.173**

## 快速检查清单

- [ ] 确认服务器密码正确
- [ ] 检查腾讯云安全组配置
- [ ] 确认SSH服务运行中
- [ ] 确认Nginx已安装
- [ ] 文件已上传到正确目录
- [ ] 文件权限设置正确
- [ ] Nginx配置已重载
- [ ] 可以访问 http://118.25.141.173

## 联系支持

如果以上方案都无法解决：

1. 腾讯云技术支持：95716
2. 在线客服：https://cloud.tencent.com/act/event
3. 工单系统：https://console.cloud.tencent.com/workorder

## 下一步

部署成功后，可以：
1. 配置域名解析
2. 申请SSL证书（HTTPS）
3. 配置CDN加速
4. 设置自动备份
