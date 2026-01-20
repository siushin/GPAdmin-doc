# 子模块管理

GPAdmin-api 使用 Git 子模块来管理可选的功能模块，便于独立开发和版本控制。

## 子模块列表

根据 `.gitmodules` 配置，项目包含以下子模块：

| 模块 | 路径 | 仓库地址 |
|------|------|---------|
| Sms | `Modules/Sms` | `git@github.com:siushin/gpa-module-sms.git` |
| Oss | `Modules/Oss` | `git@github.com:siushin/gpa-module-oss.git` |
| AppMarket | `Modules/AppMarket` | `git@github.com:siushin/gpa-module-app-market.git` |

## 拉取子模块代码

### 方法一：初始化并拉取（首次克隆项目后）

```bash
git submodule update --init --recursive
```

此命令会：

- 初始化所有子模块配置
- 拉取子模块代码到对应目录
- 递归处理嵌套的子模块

### 方法二：拉取子模块最新代码

```bash
git submodule update --remote --merge
```

此命令会：

- 从远程仓库拉取子模块的最新代码
- 将更新合并到当前分支

### 方法三：在每个子模块中执行 pull

```bash
git submodule foreach git pull origin main
```

此命令会：

- 遍历每个子模块
- 在子模块目录中执行 `git pull origin main`

### 组合命令（推荐）

如果你刚克隆项目或想确保子模块完整初始化并更新到最新：

```bash
git submodule update --init --recursive && git submodule update --remote --merge
```

## 同步模块数据到数据库

拉取子模块代码后，需要将模块信息同步到 `gpa_modules` 数据表：

```bash
php artisan gpa:sync-modules
```

详细说明请参考 [模块自动同步](./sync.md)。

## 常见问题

### 子模块目录为空

如果子模块目录存在但为空，执行：

```bash
git submodule update --init --recursive
```

### 子模块有未提交的更改

如果需要强制更新子模块（丢弃本地更改）：

```bash
git submodule foreach git reset --hard
git submodule update --init --recursive
```

### 查看子模块状态

```bash
git submodule status
```

输出示例：

```
 a1b2c3d Modules/Sms (v1.0.0)
 e4f5g6h Modules/Oss (v1.0.0)
 i7j8k9l Modules/AppMarket (v1.0.0)
```

- 前缀 `-` 表示子模块未初始化
- 前缀 `+` 表示子模块有本地更改
- 无前缀表示子模块状态正常

## 相关文档

- [模块安装](./install.md) - 模块安装指南
- [模块配置](./config.md) - 模块配置说明
- [模块自动同步](./sync.md) - 模块数据同步机制
