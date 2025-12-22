# 项目结构

```
laravel-api/
├── app/
│   ├── Http/
│   │   ├── Controllers/    # 控制器
│   │   ├── Middleware/     # 中间件
│   │   └── Requests/       # 表单请求验证
│   ├── Models/             # 数据模型
│   ├── Services/           # 业务逻辑服务
│   └── Providers/          # 服务提供者
├── config/                 # 配置文件
├── database/
│   ├── migrations/         # 数据库迁移
│   └── seeders/           # 数据填充
├── routes/
│   ├── api.php            # API 路由
│   └── web.php            # Web 路由
├── storage/               # 存储目录
├── tests/                 # 测试文件
├── .env                   # 环境配置
└── composer.json          # 依赖配置
```

## 目录说明

### app/Http/Controllers/
存放控制器文件，处理 HTTP 请求。

### app/Models/
存放 Eloquent 模型，定义数据表结构和关系。

### app/Services/
存放业务逻辑服务类，将复杂业务逻辑从控制器中分离。

### database/migrations/
存放数据库迁移文件，用于版本控制数据库结构。

### routes/api.php
定义 API 路由。

