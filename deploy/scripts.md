# Git 发布脚本

GPAdmin 提供了两个便捷的 Git 发布脚本，用于简化日常的代码提交工作。

## 脚本位置

```
GPA/
├── git-commit-all.sh        # 项目批量提交脚本
└── git-submodule-commit.sh  # 子模块提交脚本
```

## 提交消息规范

所有脚本都遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>
```

### 常用 type

| type | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 bug |
| `docs` | 文档更新 |
| `style` | 代码格式调整（不影响功能） |
| `refactor` | 代码重构 |
| `test` | 测试相关 |
| `chore` | 构建/工具/依赖更新 |
| `perf` | 性能优化 |
| `ci` | CI 配置更新 |
| `build` | 构建系统更新 |

### 示例

```bash
feat: add user login feature
fix(auth): fix token refresh bug
docs: update README
chore: upgrade dependencies
```

---

## 项目批量提交脚本

### 功能说明

`git-commit-all.sh` 用于批量提交 GPA 根目录下的所有 Git 仓库（如 GPAdmin、GPAdmin-api、GPAdmin-doc 等）。

### 使用方法

```bash
# 进入 GPA 根目录
cd /path/to/GPA

# 使用默认消息提交
./git-commit-all.sh

# 指定提交消息
./git-commit-all.sh "feat: update files"

# 带 scope 的提交消息
./git-commit-all.sh "fix(user): fix login bug"
```

### 功能特性

| 功能 | 说明 |
|------|------|
| 批量处理 | 自动遍历所有子目录 |
| 智能跳过 | 跳过非 Git 仓库、无更改的仓库 |
| 消息验证 | 验证提交消息符合规范 |
| 彩色输出 | 成功/跳过/失败 不同颜色显示 |
| 统计信息 | 显示处理结果统计 |

### 脚本源码

```bash
#!/bin/bash

# 通用 Git 提交脚本
# 功能：遍历当前目录下的所有子目录，对每个 Git 仓库执行 add、commit、push
# 用法：./git-commit-all.sh [commit_message]
# 提交消息需符合 Conventional Commits 规范：<type>(<scope>): <subject>
# 示例：./git-commit-all.sh "feat: update files"
#       ./git-commit-all.sh "feat: add new feature"
#       ./git-commit-all.sh "fix(user): fix login bug"
# 
# 常用 type：
#   feat:     新功能
#   fix:      修复bug
#   docs:     文档更新
#   style:    代码格式调整（不影响功能）
#   refactor: 代码重构
#   test:     测试相关
#   chore:    构建/工具/依赖更新
#   perf:     性能优化
#   ci:       CI配置更新
#   build:    构建系统更新

# 设置默认提交消息（符合 Conventional Commits 规范）
DEFAULT_MESSAGE="feat: update files"
COMMIT_MESSAGE="${1:-$DEFAULT_MESSAGE}"

# 验证提交消息是否符合 Conventional Commits 规范
validate_commit_message() {
    local msg="$1"
    # 匹配格式：type(scope): subject 或 type: subject
    # type 必须是支持的类型之一
    # scope 是可选的，如果存在必须在括号内且不为空
    # subject 是必需的，冒号后必须有内容
    
    # 定义支持的类型
    local types="feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert"
    
    # 使用更兼容的正则表达式语法
    # 匹配 type(scope): subject 或 type: subject
    if echo "$msg" | grep -qE "^(${types})(\([^)]+\))?:[[:space:]].+"; then
        return 0
    fi
    return 1
}

# 获取脚本所在目录的绝对路径
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 验证提交消息格式
if ! validate_commit_message "$COMMIT_MESSAGE"; then
    echo -e "${RED}错误：提交消息不符合 Conventional Commits 规范${NC}"
    echo -e "${YELLOW}格式要求：<type>(<scope>): <subject>${NC}"
    echo -e "${YELLOW}示例：${NC}"
    echo -e "  ${GREEN}feat: update files${NC}"
    echo -e "  ${GREEN}feat: add new feature${NC}"
    echo -e "  ${GREEN}fix(user): fix login bug${NC}"
    echo ""
    echo -e "${YELLOW}常用 type：feat, fix, docs, style, refactor, test, chore, perf, ci, build${NC}"
    exit 1
fi

# 计数器
SUCCESS_COUNT=0
SKIP_COUNT=0
ERROR_COUNT=0

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Git 批量提交脚本${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "提交消息: ${GREEN}${COMMIT_MESSAGE}${NC}"
echo -e "工作目录: ${GREEN}${SCRIPT_DIR}${NC}"
echo ""

# 遍历当前目录下的所有子目录
for dir in "${SCRIPT_DIR}"/*; do
    # 检查是否是目录
    if [ ! -d "$dir" ]; then
        continue
    fi
    
    # 获取目录名（不包含路径）
    dir_name=$(basename "$dir")
    
    # 跳过隐藏目录和特殊目录
    if [[ "$dir_name" == .* ]] || [[ "$dir_name" == "node_modules" ]] || [[ "$dir_name" == "vendor" ]]; then
        continue
    fi
    
    # 检查是否是 Git 仓库
    if [ ! -d "$dir/.git" ]; then
        echo -e "${YELLOW}[跳过]${NC} ${dir_name} - 不是 Git 仓库"
        ((SKIP_COUNT++))
        continue
    fi
    
    echo -e "${BLUE}[处理]${NC} ${dir_name}"
    cd "$dir" || continue
    
    # 检查是否有未提交的更改
    if ! git status --porcelain | grep -q .; then
        echo -e "  ${YELLOW}→ 没有需要提交的文件，跳过${NC}"
        ((SKIP_COUNT++))
        cd "$SCRIPT_DIR" || exit 1
        echo ""
        continue
    fi
    
    # 显示待提交的文件
    echo -e "  ${BLUE}→ 待提交的文件：${NC}"
    git status --short | sed 's/^/    /'
    
    # 执行 git add
    echo -e "  ${BLUE}→ 执行 git add .${NC}"
    if ! git add .; then
        echo -e "  ${RED}✗ git add 失败${NC}"
        ((ERROR_COUNT++))
        cd "$SCRIPT_DIR" || exit 1
        echo ""
        continue
    fi
    
    # 执行 git commit
    echo -e "  ${BLUE}→ 执行 git commit${NC}"
    if ! git commit -m "$COMMIT_MESSAGE"; then
        echo -e "  ${RED}✗ git commit 失败${NC}"
        ((ERROR_COUNT++))
        cd "$SCRIPT_DIR" || exit 1
        echo ""
        continue
    fi
    
    # 执行 git push
    echo -e "  ${BLUE}→ 执行 git push${NC}"
    if ! git push; then
        echo -e "  ${RED}✗ git push 失败${NC}"
        ((ERROR_COUNT++))
        cd "$SCRIPT_DIR" || exit 1
        echo ""
        continue
    fi
    
    echo -e "  ${GREEN}✓ 提交成功${NC}"
    ((SUCCESS_COUNT++))
    cd "$SCRIPT_DIR" || exit 1
    echo ""
done

# 输出统计信息
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}统计信息${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}成功: ${SUCCESS_COUNT}${NC}"
echo -e "${YELLOW}跳过: ${SKIP_COUNT}${NC}"
echo -e "${RED}失败: ${ERROR_COUNT}${NC}"
echo ""
```

---

## 子模块提交脚本

### 功能说明

`git-submodule-commit.sh` 专门用于提交 `GPAdmin-api/Modules` 下的 Git 子模块，并自动更新主仓库的子模块引用。

### 使用方法

```bash
# 进入 GPA 根目录
cd /path/to/GPA

# 提交所有子模块
./git-submodule-commit.sh "feat: update files"

# 只提交指定模块
./git-submodule-commit.sh "feat: add feature" Sms

# 提交多个指定模块
./git-submodule-commit.sh "fix: bug fix" Sms Oss
```

### 功能特性

| 功能 | 说明 |
|------|------|
| 全部模块 | 不指定模块名时，提交所有子模块 |
| 指定模块 | 可指定一个或多个模块名 |
| 排除模块 | Base 模块已被排除，不会被处理 |
| 自动跳过 | 跳过非子模块目录 |
| 无更改跳过 | 没有修改的模块自动跳过 |
| 主仓库更新 | 自动更新主仓库的子模块引用 |
| 消息验证 | 验证提交消息符合规范 |
| 彩色输出 | 成功/跳过/失败 不同颜色显示 |

> **注意**：Base 模块代码直接包含在主仓库中，不作为 Git 子模块管理，因此已被排除。

### 脚本源码

```bash
#!/bin/bash

# Git 子模块提交脚本
# 功能：提交 GPAdmin-api/Modules 下的 Git 子模块并更新主仓库引用
# 用法：
#   ./git-submodule-commit.sh [commit_message]              # 提交所有子模块
#   ./git-submodule-commit.sh [commit_message] [module...]  # 提交指定子模块
# 
# 示例：
#   ./git-submodule-commit.sh "feat: update files"                    # 提交所有子模块
#   ./git-submodule-commit.sh "feat: add feature" Sms                 # 只提交 Sms 模块
#   ./git-submodule-commit.sh "fix: bug fix" Sms Oss                  # 提交 Sms 和 Oss 模块
#
# 提交消息需符合 Conventional Commits 规范：<type>(<scope>): <subject>
# 常用 type：feat, fix, docs, style, refactor, test, chore, perf, ci, build
#
# 注意：Base 模块已被排除，不会被此脚本处理（Base 模块代码直接包含在主仓库中）

# 获取脚本所在目录的绝对路径
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 主仓库路径
MAIN_REPO="${SCRIPT_DIR}/GPAdmin-api"
MODULES_DIR="${MAIN_REPO}/Modules"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 设置默认提交消息
DEFAULT_MESSAGE="feat: update files"
COMMIT_MESSAGE="${1:-$DEFAULT_MESSAGE}"

# 排除的模块列表（这些模块不会被处理）
EXCLUDED_MODULES=("Base")

# 验证提交消息是否符合 Conventional Commits 规范
validate_commit_message() {
    local msg="$1"
    local types="feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert"
    if echo "$msg" | grep -qE "^(${types})(\([^)]+\))?:[[:space:]].+"; then
        return 0
    fi
    return 1
}

# 检查是否为 Git 子模块
is_submodule() {
    local dir="$1"
    # 子模块的 .git 是一个文件（指向 .git/modules/xxx），而非目录
    if [ -f "$dir/.git" ]; then
        return 0
    fi
    return 1
}

# 验证提交消息格式
if ! validate_commit_message "$COMMIT_MESSAGE"; then
    echo -e "${RED}错误：提交消息不符合 Conventional Commits 规范${NC}"
    echo -e "${YELLOW}格式要求：<type>(<scope>): <subject>${NC}"
    echo -e "${YELLOW}示例：${NC}"
    echo -e "  ${GREEN}feat: update files${NC}"
    echo -e "  ${GREEN}fix(sms): fix send bug${NC}"
    echo ""
    echo -e "${YELLOW}常用 type：feat, fix, docs, style, refactor, test, chore, perf, ci, build${NC}"
    exit 1
fi

# 获取指定的模块列表（从第二个参数开始）
shift
SPECIFIED_MODULES=("$@")

# 检查主仓库是否存在
if [ ! -d "$MAIN_REPO" ]; then
    echo -e "${RED}错误：找不到主仓库 ${MAIN_REPO}${NC}"
    exit 1
fi

# 检查 Modules 目录是否存在
if [ ! -d "$MODULES_DIR" ]; then
    echo -e "${RED}错误：找不到模块目录 ${MODULES_DIR}${NC}"
    exit 1
fi

# 计数器
SUCCESS_COUNT=0
SKIP_COUNT=0
ERROR_COUNT=0
UPDATED_MODULES=()

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Git 子模块提交脚本${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "提交消息: ${GREEN}${COMMIT_MESSAGE}${NC}"
echo -e "模块目录: ${GREEN}${MODULES_DIR}${NC}"
if [ ${#SPECIFIED_MODULES[@]} -gt 0 ]; then
    echo -e "指定模块: ${CYAN}${SPECIFIED_MODULES[*]}${NC}"
else
    echo -e "模式: ${CYAN}全部子模块${NC}"
fi
echo ""

# 遍历模块目录
for dir in "${MODULES_DIR}"/*; do
    # 检查是否是目录
    if [ ! -d "$dir" ]; then
        continue
    fi
    
    # 获取模块名
    module_name=$(basename "$dir")
    
    # 跳过隐藏目录和特殊文件
    if [[ "$module_name" == .* ]]; then
        continue
    fi
    
    # 跳过排除列表中的模块
    excluded=false
    for excluded_module in "${EXCLUDED_MODULES[@]}"; do
        if [ "$module_name" == "$excluded_module" ]; then
            excluded=true
            break
        fi
    done
    if [ "$excluded" == true ]; then
        continue
    fi
    
    # 如果指定了模块列表，检查当前模块是否在列表中
    if [ ${#SPECIFIED_MODULES[@]} -gt 0 ]; then
        found=false
        for specified in "${SPECIFIED_MODULES[@]}"; do
            if [ "$module_name" == "$specified" ]; then
                found=true
                break
            fi
        done
        if [ "$found" == false ]; then
            continue
        fi
    fi
    
    # 检查是否是子模块
    if ! is_submodule "$dir"; then
        echo -e "${YELLOW}[跳过]${NC} ${module_name} - 不是 Git 子模块"
        ((SKIP_COUNT++))
        continue
    fi
    
    echo -e "${BLUE}[处理]${NC} ${module_name}"
    cd "$dir" || continue
    
    # 检查是否有未提交的更改
    if ! git status --porcelain | grep -q .; then
        echo -e "  ${YELLOW}→ 没有需要提交的文件，跳过${NC}"
        ((SKIP_COUNT++))
        cd "$SCRIPT_DIR" || exit 1
        echo ""
        continue
    fi
    
    # 显示待提交的文件
    echo -e "  ${BLUE}→ 待提交的文件：${NC}"
    git status --short | sed 's/^/    /'
    
    # 执行 git add
    echo -e "  ${BLUE}→ 执行 git add .${NC}"
    if ! git add .; then
        echo -e "  ${RED}✗ git add 失败${NC}"
        ((ERROR_COUNT++))
        cd "$SCRIPT_DIR" || exit 1
        echo ""
        continue
    fi
    
    # 执行 git commit
    echo -e "  ${BLUE}→ 执行 git commit${NC}"
    if ! git commit -m "$COMMIT_MESSAGE"; then
        echo -e "  ${RED}✗ git commit 失败${NC}"
        ((ERROR_COUNT++))
        cd "$SCRIPT_DIR" || exit 1
        echo ""
        continue
    fi
    
    # 执行 git push
    echo -e "  ${BLUE}→ 执行 git push${NC}"
    if ! git push; then
        echo -e "  ${RED}✗ git push 失败${NC}"
        ((ERROR_COUNT++))
        cd "$SCRIPT_DIR" || exit 1
        echo ""
        continue
    fi
    
    echo -e "  ${GREEN}✓ 子模块提交成功${NC}"
    ((SUCCESS_COUNT++))
    UPDATED_MODULES+=("$module_name")
    cd "$SCRIPT_DIR" || exit 1
    echo ""
done

# 如果有子模块更新成功，更新主仓库的子模块引用
if [ ${#UPDATED_MODULES[@]} -gt 0 ]; then
    echo -e "${BLUE}----------------------------------------${NC}"
    echo -e "${BLUE}[更新主仓库子模块引用]${NC}"
    cd "$MAIN_REPO" || exit 1
    
    # 添加更新的子模块
    for module in "${UPDATED_MODULES[@]}"; do
        echo -e "  ${BLUE}→ git add Modules/${module}${NC}"
        git add "Modules/${module}"
    done
    
    # 生成提交消息
    if [ ${#UPDATED_MODULES[@]} -eq 1 ]; then
        MAIN_COMMIT_MSG="chore: update ${UPDATED_MODULES[0]} submodule"
    else
        MAIN_COMMIT_MSG="chore: update submodules (${UPDATED_MODULES[*]})"
    fi
    
    # 提交主仓库
    echo -e "  ${BLUE}→ git commit -m \"${MAIN_COMMIT_MSG}\"${NC}"
    if git commit -m "$MAIN_COMMIT_MSG"; then
        echo -e "  ${BLUE}→ git push${NC}"
        if git push; then
            echo -e "  ${GREEN}✓ 主仓库更新成功${NC}"
        else
            echo -e "  ${RED}✗ 主仓库 push 失败${NC}"
        fi
    else
        echo -e "  ${YELLOW}→ 主仓库没有需要提交的更改${NC}"
    fi
    echo ""
fi

# 输出统计信息
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}统计信息${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}成功: ${SUCCESS_COUNT}${NC}"
echo -e "${YELLOW}跳过: ${SKIP_COUNT}${NC}"
echo -e "${RED}失败: ${ERROR_COUNT}${NC}"

if [ ${#UPDATED_MODULES[@]} -gt 0 ]; then
    echo -e "${CYAN}已更新模块: ${UPDATED_MODULES[*]}${NC}"
fi
echo ""
```
