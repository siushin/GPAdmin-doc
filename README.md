# GPAdmin 开发手册

基于 Ant Design Pro + Laravel 的开箱即用的企业级管理后台开发文档。

## 📖 项目简介

GPAdmin 是一个完整的企业级管理后台解决方案，提供前后端分离架构，包含用户管理、权限管理、日志管理等核心功能模块，帮助开发者快速搭建企业级管理系统。

## 🚀 技术栈

### 前端

- **React** - UI 框架
- **TypeScript** - 类型系统
- **Ant Design Pro** - 企业级 UI 组件库
- **Vite** - 构建工具

### 后端

- **Laravel** - PHP 框架
- **MySQL** - 数据库
- **RESTful API** - API 设计

## ✨ 核心功能

- ✅ 用户登录 / 授权
- ✅ 管理员管理
- ✅ 用户管理（支持审核流程）
- ✅ 日志管理（操作日志、登录日志、审计日志等）
- ✅ 通知管理（公告、站内信）
- ✅ 权限管理
- ✅ 系统参数配置

## 📚 文档导航

- [前端开发](/frontend/) - 前端开发指南与规范
- [后端开发](/backend/) - 后端开发指南与规范
- [部署指南](/deploy/) - 项目部署相关文档

## 🛠️ 快速开始

### 前端项目

```bash
cd GPAdmin
npm install
npm start
```

### 后端项目

```bash
cd laravel-api
composer install
php artisan migrate:fresh --seed
```

默认管理员账号：`admin` / `admin`

## 📝 相关链接

- [前端项目 GitHub](https://github.com/siushin/GPAdmin)
- [后端项目 GitHub](https://github.com/siushin/laravel-api)
- [API 接口文档](https://s.apifox.cn/9e462aa5-5078-455c-b631-75b9d9e2a303)

## 🧑🏻‍💻 关于作者

多年开发经验，具有丰富的前、后端软件开发经验~

微信：siushin

Github：<https://github.com/siushin>

个人博客：<http://www.siushin.com>

邮箱：<a href="mailto:siushin@163.com">siushin@163.com</a>

## 💡 反馈交流

在使用过程中有任何想法、合作交流，请加我微信 `siushin` （备注 <mark>github</mark> ）：

<img src="/public/images/siushin-WeChat.jpg" alt="添加我微信备注「github」" style="width: 180px;" />

## ☕️ 打赏赞助

如果你觉得知识对您有帮助，可以请作者喝一杯咖啡 ☕️

<div class="coffee" style="display: flex;align-items: center;margin-top: 20px;">
<img src="/public/images/siushin-WechatPay.jpg" alt="微信收款码" style="width: 180px;" />
<img src="/public/images/siushin-Alipay.jpg" alt="支付宝收款码" style="width: 180px;" />
</div>
