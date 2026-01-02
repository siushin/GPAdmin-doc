# 快速开始

GPAdmin 后端基于 Laravel 框架构建，提供了完整的 RESTful API 服务。

## 技术栈

- **框架**: Laravel
- **数据库**: MySQL
- **认证**: Laravel Sanctum
- **API 文档**: 自动生成

## 环境准备

### 必需软件

- PHP >= 8.0
- Composer
- MySQL >= 5.7 或 MariaDB >= 10.3
- Node.js (用于前端资源编译)

## 安装步骤

1. 克隆项目

```bash
git clone https://github.com/siushin/GPAdmin.git
cd GPAdmin/laravel-api
```

1. 安装依赖

```bash
composer install
```

1. 配置环境变量

```bash
cp .env.example .env
php artisan key:generate
```

1. 配置数据库

编辑 `.env` 文件：

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gpadmin
DB_USERNAME=root
DB_PASSWORD=
```

1. 运行数据库迁移

```bash
php artisan migrate
```

1. 启动开发服务器

```bash
php artisan serve
```

服务器将在 `http://localhost:8000` 启动。

## 下一步

- 了解 [项目结构](./structure.md)
- 阅读 [开发规范](./standards/)
