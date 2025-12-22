# 项目结构

```
GPAdmin/
├── config/                 # 配置文件
│   ├── config.ts          # 主配置文件
│   └── routes.ts          # 路由配置
├── src/
│   ├── components/        # 公共组件
│   ├── pages/            # 页面组件
│   ├── services/         # API 服务
│   ├── utils/            # 工具函数
│   ├── models/           # 数据模型
│   └── app.tsx           # 应用入口
├── public/               # 静态资源
├── package.json          # 依赖配置
└── README.md            # 项目说明
```

## 目录说明

### config/
存放项目的配置文件，包括路由配置、构建配置等。

### src/components/
存放可复用的公共组件。

### src/pages/
存放页面级组件，通常按功能模块组织。

### src/services/
存放 API 请求相关的服务文件。

### src/utils/
存放工具函数和辅助方法。

### src/models/
存放数据模型和状态管理相关的代码。

