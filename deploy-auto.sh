#!/usr/bin/expect -f

# 自动部署脚本 - 使用expect自动输入密码
# 使用方法: ./deploy-auto.sh

set timeout 30

# 服务器配置
set SERVER_IP "118.25.141.173"
set USERNAME "root"
set PROJECT_NAME "xiaohuodong0310"
set REMOTE_DIR "/var/www/$PROJECT_NAME"

puts "\n========================================="
puts "  腾讯云主机自动部署"
puts "========================================="
puts "\n服务器: $USERNAME@$SERVER_IP"
puts "项目: $PROJECT_NAME"
puts ""

# 1. 本地构建
puts "步骤 1: 本地构建项目..."
spawn npm run build
expect {
    timeout { exit 1 }
    eof { }
}
puts "✓ 构建完成"
puts ""

# 2. 请求密码
puts "步骤 2: 连接服务器..."
stty -echo
send_user --请输入SSH密码: " password
stty echo
set PASSWORD $expect_out(buffer)

puts ""

# 3. 创建远程目录
puts "步骤 3: 创建远程目录..."
spawn ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER_IP "mkdir -p $REMOTE_DIR"
expect {
    timeout { exit 1 }
    "password:" {
        send "$PASSWORD\r"
        exp_continue
    }
    eof { }
}
puts "✓ 远程目录创建完成"
puts ""

# 4. 上传文件
puts "步骤 4: 上传文件到服务器..."
spawn rsync -avz --delete -e "ssh -o StrictHostKeyChecking=no" dist/ $USERNAME@$SERVER_IP:$REMOTE_DIR/
expect {
    timeout { exit 1 }
    "password:" {
        send "$PASSWORD\r"
        exp_continue
    }
    eof { }
}
puts "✓ 文件上传完成"
puts ""

# 5. 配置Nginx
puts "步骤 5: 配置Nginx..."
spawn scp -o StrictHostKeyChecking=no nginx-site.conf $USERNAME@$SERVER_IP:/tmp/
expect {
    timeout { exit 1 }
    "password:" {
        send "$PASSWORD\r"
        exp_continue
    }
    eof { }
}

spawn ssh -o StrictHostKeyChecking=no $USERNAME@$SERVER_IP "mv /tmp/nginx-site.conf /etc/nginx/sites-available/$PROJECT_NAME && ln -sf /etc/nginx/sites-available/$PROJECT_NAME /etc/nginx/sites-enabled/ && nginx -t && systemctl reload nginx"
expect {
    timeout { exit 1 }
    "password:" {
        send "$PASSWORD\r"
        exp_continue
    }
    eof { }
}
puts "✓ Nginx配置完成"
puts ""

puts "========================================="
puts "  部署成功！"
puts "========================================="
puts ""
puts "访问地址: http://$SERVER_IP"
puts ""
