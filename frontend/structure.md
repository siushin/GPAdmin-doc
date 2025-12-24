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

## FSD设计模式

文档：<https://feature-sliced.design/zh/docs/get-started/overview>

FSD设计模式是指 Feature-Sliced Design（功能切片设计），在原文中是一种前端架构设计模式，用于组织大型和中型前端项目的代码结构，通过将应用分割成独立的功能（features）和重用的层（layers），以提高项目的可维护性、可扩展性和清晰度，重点在于优化代码结构和协作效率。

FSD 设计模式的核心是按功能模块拆分代码，强调独立、自包含的特征，每个功能块包含相关的状态、逻辑和 UI，通过组合这些功能块实现整体应用。它将代码分为实体、状态、API 和 UI 等层，避免紧耦合，便于团队协作和代码复用。FSD 设计模式常用于大型前端项目，可解决传统 MVC 模式中代码组织混乱、难以维护的问题，尤其适合需要频繁迭代和扩展的业务场景。
