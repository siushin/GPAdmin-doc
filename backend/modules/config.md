# 模块配置

每个模块都需要在 `module.json` 中配置基本信息。该配置文件基于 [nwidart/laravel-modules](https://nwidart.com/laravel-modules/) 包的标准配置，并扩展了自定义的元信息。

## 配置示例

```json
{
    "name": "Sms",
    "alias": "sms",
    "title": "短信服务",
    "description": "LaravelAPI 短信服务",
    "keywords": ["SMS", "短信", "验证码"],
    "priority": 0,
    "source": "官方",
    "providers": [
        "Modules\\Sms\\Providers\\SmsServiceProvider"
    ],
    "files": [],
    "extra": {
        "meta": {
            "module_icon": "MessageOutlined",
            "module_version": "0.0.1",
            "module_status": 1,
            "module_is_core": 0,
            "module_is_installed": 1,
            "module_author": "siushin",
            "module_author_email": "siushin@163.com",
            "module_homepage": "https://gpadmin.siushin.com",
            "module_dependencies": [],
            "module_pull_type": "git",
            "module_pull_url": "git@github.com:siushin/gpa-module-sms.git"
        }
    }
}
```

## 标准配置项

以下是 `nwidart/laravel-modules` 包的标准配置项：

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `name` | string | 模块名称，使用 PascalCase 命名，如 `Sms`、`Base` |
| `alias` | string | 模块别名，**详见下方说明** |
| `description` | string | 模块描述 |
| `keywords` | array | 模块关键词，用于搜索和分类 |
| `priority` | int | 模块加载优先级，数值越小优先级越高 |
| `providers` | array | 模块服务提供者类 |
| `files` | array | 需要自动加载的文件 |

## alias 命名规范

::: warning 重要
`alias` 是模块的核心标识，有严格的命名规范：
:::

1. **全局唯一**：在整个系统中，每个模块的 `alias` 必须唯一
2. **数据表前缀**：`alias` 将作为该模块所有数据表的表名前缀，如 `sms_logs`、`sms_templates`
3. **命名规则**：
   - 纯小写字母
   - 多词使用下划线 `_` 拼接
   - 简洁且能表达模块含义
   - 符合数据库表名规范

**示例**：

- ✅ `sms` - 短信模块
- ✅ `user_center` - 用户中心模块
- ❌ `SMS` - 不能使用大写
- ❌ `sms-service` - 不能使用连字符
- ❌ `smsNotificationService` - 不能使用驼峰命名

## 自定义扩展配置

GPAdmin 在 `extra.meta` 中扩展了以下自定义配置：

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `module_icon` | string | 模块图标，使用 Ant Design 图标名称 |
| `module_version` | string | 模块版本号，遵循语义化版本规范 |
| `module_status` | int | 模块状态：`1` 启用，`0` 禁用 |
| `module_is_core` | int | 是否核心模块：`1` 是，`0` 否（核心模块不可卸载） |
| `module_is_installed` | int | 是否已安装：`1` 是，`0` 否 |
| `module_author` | string | 模块作者 |
| `module_author_email` | string | 作者邮箱 |
| `module_homepage` | string | 模块主页地址 |
| `module_dependencies` | array | 模块依赖，声明依赖的其他模块 |
| `module_pull_type` | string | 模块拉取类型：`git` Git仓库，`url` URL下载 |
| `module_pull_url` | string | 模块拉取地址（Git仓库地址或下载URL），具有唯一约束 |
| `source` | string | 模块来源，如 `官方`、`第三方` |
| `title` | string | 模块中文标题，用于界面展示 |

## 模块拉取类型

GPAdmin 支持两种模块拉取方式：

| 拉取类型 | 值 | 说明 |
|---------|-----|------|
| Git仓库 | `git` | 通过 Git 子模块方式拉取代码 |
| URL下载 | `url` | 通过 HTTP 直接下载模块压缩包 |

### Git 类型

适用于需要版本控制和独立开发的模块，通过 Git 子模块机制拉取代码：

```json
{
    "extra": {
        "meta": {
            "module_pull_type": "git",
            "module_pull_url": "git@github.com:siushin/gpa-module-sms.git"
        }
    }
}
```

### URL 类型

适用于打包发布的模块，通过 HTTP 下载压缩包：

```json
{
    "extra": {
        "meta": {
            "module_pull_type": "url",
            "module_pull_url": "https://gpadmin.siushin.com/modules/sms-v1.0.0.zip"
        }
    }
}
```

如需授权验证，进入模块根目录后手动使用 curl 下载（授权参数固定为 `token`）：

```bash
cd Modules/ModuleName
curl -o module.zip "https://gpadmin.siushin.com/modules/sms-v1.0.0.zip?token=xxx"
unzip module.zip
```
