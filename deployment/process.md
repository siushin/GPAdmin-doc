# 部署流程

## 后端部署

### 1. 准备服务器

确保服务器满足环境要求，安装 PHP、Composer、MySQL 等。

### 2. 克隆项目

```bash
git clone https://github.com/siushin/GPAdmin.git
cd GPAdmin/laravel-api
```

### 3. 安装依赖

```bash
composer install --optimize-autoloader --no-dev
```

### 4. 配置环境

```bash
cp .env.example .env
php artisan key:generate
```

编辑 `.env` 文件，配置数据库、Redis 等。

### 5. 运行迁移

```bash
php artisan migrate --force
```

### 6. 优化应用

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 7. 配置 Web 服务器

配置 Nginx 或 Apache，指向 `public` 目录。

## 前端部署

### 1. 构建项目

```bash
cd GPAdmin/GPAdmin
npm install
npm run build
```

### 2. 部署静态文件

将 `dist` 目录中的文件部署到 Web 服务器。

### 3. 配置 Nginx

配置 Nginx 指向构建后的静态文件目录。

## 部署检查清单

- [ ] 环境变量配置正确
- [ ] 数据库连接正常
- [ ] 文件权限设置正确
- [ ] SSL 证书配置（如需要）
- [ ] 域名解析正确
- [ ] 防火墙规则配置
- [ ] 备份策略制定

## 维护

### 更新代码

```bash
git pull
composer install --optimize-autoloader --no-dev
php artisan migrate --force
php artisan config:cache
php artisan route:cache
```

### 日志查看

```bash
tail -f storage/logs/laravel.log
```

