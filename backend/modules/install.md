# 安装模块

GPAdmin 采用模块化架构，模块以 Git 子模块形式独立管理。模块分为 **免费模块** 和 **付费模块** 两种类型。

## 模块类型

| 类型 | 仓库权限 | 获取方式 |
|------|---------|---------|
| 免费模块 | 公开仓库 | 直接拉取 |
| 付费模块 | 私有仓库 | 付费后授权拉取 |

## 免费模块安装

免费模块的仓库是公开的，可以直接拉取：

```bash
# 进入项目目录
cd GPAdmin-api

# 拉取指定的免费模块
git submodule update --init --force Modules/模块名
```

## 付费模块安装

付费模块的仓库是私有的，需要完成以下步骤后才能拉取：

### 步骤 1：付费购买

通过官方渠道完成模块购买。

### 步骤 2：等待授权

付费后，请将您的 GitHub 用户名提供给我们，仓库作者会将您添加到私有仓库的协作者列表中。

### 步骤 3：配置 SSH 密钥

确保您的本地 SSH 密钥已添加到 GitHub 账户：

```bash
# 查看本地公钥
cat ~/.ssh/id_ed25519.pub
# 或
cat ~/.ssh/id_rsa.pub

# 将公钥添加到 GitHub: Settings -> SSH and GPG keys -> New SSH key
```

### 步骤 4：拉取模块

获得授权后，执行以下命令拉取付费模块：

```bash
# 进入项目目录
cd GPAdmin-api

# 拉取指定的付费模块（需要有仓库访问权限）
git submodule update --init --force Modules/模块名

# 例如拉取 Sms 模块
git submodule update --init --force Modules/Sms
```

## 批量拉取所有有权限的模块

如果您拥有多个模块的访问权限，可以一次性拉取所有模块：

```bash
git submodule update --init --force --recursive
```

::: warning 注意
如果没有某个模块的访问权限，该命令会跳过无权限的模块，不会影响其他模块的拉取。
:::

## 常见问题

### 拉取时提示 "Repository not found"

请确认：

1. 您已完成付费并提交了 GitHub 用户名
2. 仓库作者已将您添加为协作者
3. 您的 SSH 密钥已正确配置

### 如何验证 SSH 配置是否正确

```bash
ssh -T git@github.com
# 正确时会显示: Hi username! You've successfully authenticated...
```
