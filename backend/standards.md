# 开发规范

## 代码规范

### 命名规范

- **类名**: 使用 PascalCase，如 `UserController`
- **方法名**: 使用 camelCase，如 `getUserList`
- **变量名**: 使用 camelCase
- **常量名**: 使用 UPPER_SNAKE_CASE
- **数据库表名**: 使用 snake_case，复数形式

### 控制器规范

1. 控制器应该保持简洁，复杂逻辑放在 Service 层
2. 使用 Form Request 进行请求验证
3. 统一返回格式

### 模型规范

1. 使用 Eloquent ORM
2. 定义好模型关系
3. 使用 Mass Assignment 保护

### API 规范

1. 使用 RESTful 风格
2. 统一响应格式
3. 使用 HTTP 状态码

## 数据库规范

1. 使用迁移文件管理数据库结构
2. 为字段添加注释
3. 合理使用索引

## Git 提交规范

提交信息格式：`<type>(<scope>): <subject>`

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具相关

