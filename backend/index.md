# 后端开发

GPAdmin 后端基于 Laravel 框架构建，提供了完整的 RESTful API 服务。

## 技术栈

- **框架**: Laravel
- **数据库**: MySQL
- **认证**: Laravel Sanctum
- **API 文档**: 自动生成

## 快速开始

### 环境要求

- PHP >= 8.0
- Composer
- MySQL >= 5.7

### 安装步骤

1. 安装依赖

```bash
composer install
```

2. 配置环境

```bash
cp .env.example .env
php artisan key:generate
```

3. 配置数据库

编辑 `.env` 文件，配置数据库连接信息。

4. 运行迁移

```bash
php artisan migrate
```

5. 启动开发服务器

```bash
php artisan serve
```

## 相关文档

- [快速开始](./getting-started.md)
- [项目结构](./structure.md)
- [开发规范](./standards.md)

