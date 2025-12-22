# 开发规范

## 代码规范

### 命名规范

- **组件名**: 使用 PascalCase，如 `UserList.tsx`
- **文件名**: 组件文件使用 PascalCase，工具文件使用 camelCase
- **变量名**: 使用 camelCase
- **常量名**: 使用 UPPER_SNAKE_CASE

### 组件规范

1. 使用函数式组件和 Hooks
2. 组件应该单一职责
3. 合理拆分组件，避免组件过大
4. 使用 TypeScript 定义 Props 类型

### 代码风格

- 使用 ESLint 和 Prettier 保持代码风格一致
- 提交前运行 `npm run lint` 检查代码

## Git 提交规范

提交信息格式：`<type>(<scope>): <subject>`

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具相关

## 更多信息

请参考项目的 `.eslintrc` 和 `.prettierrc` 配置文件。

