# 常见问题

## 前端相关问题

### Q: 启动项目时端口被占用怎么办？

A: 可以修改端口或关闭占用端口的进程。

修改端口：
```bash
PORT=3000 npm start
```

### Q: 构建时内存不足？

A: 增加 Node.js 内存限制：
```bash
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Q: 如何配置代理？

A: 在 `config/config.ts` 中配置 `proxy` 选项。

## 后端相关问题

### Q: 数据库迁移失败？

A: 检查数据库连接配置，确保数据库用户有足够权限。

### Q: 如何清除缓存？

A: 运行以下命令：
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Q: API 返回 419 错误？

A: 检查 CSRF Token 或 Session 配置，确保请求头包含正确的认证信息。

## 部署相关问题

### Q: 静态资源 404？

A: 检查 Nginx 配置，确保静态资源路径正确，并运行 `npm run build` 重新构建。

### Q: 如何配置 HTTPS？

A: 在 Nginx 配置中添加 SSL 证书配置，并更新 `.env` 中的 `APP_URL`。

## 其他问题

如果遇到其他问题，请：

1. 查看项目 GitHub Issues: https://github.com/siushin/GPAdmin/issues
2. 提交新的 Issue 描述问题
3. 查看项目文档和代码注释

