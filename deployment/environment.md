# 环境配置

## 服务器要求

### 后端服务器

- **操作系统**: Linux (推荐 Ubuntu 20.04+)
- **PHP**: >= 8.0
- **扩展**: 
  - OpenSSL
  - PDO
  - Mbstring
  - Tokenizer
  - XML
  - Ctype
  - JSON
  - BCMath
- **数据库**: MySQL >= 5.7 或 MariaDB >= 10.3
- **Web 服务器**: Nginx 或 Apache

### 前端服务器

- **Web 服务器**: Nginx 或 Apache
- **Node.js**: >= 14.x (仅用于构建)

## 环境变量配置

### 后端环境变量

编辑 `.env` 文件：

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gpadmin
DB_USERNAME=your_username
DB_PASSWORD=your_password

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

### 前端环境变量

创建 `.env.production` 文件：

```env
API_BASE_URL=https://api.your-domain.com
```

## 优化配置

### PHP 配置

```ini
memory_limit=256M
max_execution_time=300
upload_max_filesize=20M
post_max_size=20M
```

### Nginx 配置

参考项目的 Nginx 配置文件进行配置。

