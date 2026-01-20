# 模块开发

GPAdmin 后端采用模块化架构，每个模块都是独立的功能单元。

## 模块结构

每个模块都遵循统一的目录结构，便于开发和维护。

## 创建新模块

### 使用命令行工具

```bash
php artisan module:make ModuleName
```

### 手动创建

1. 在 `Modules` 目录下创建模块文件夹
2. 按照标准目录结构创建必要的文件和目录
3. 注册模块到系统中

## 相关文档

- [子模块管理](./submodule.md)
- [安装模块](./install.md)
- [模块配置](./config.md)
- [模块自动同步](./sync.md)
- [模块结构](./structure.md)
- [模块规范](./standards.md)
