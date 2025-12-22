# 接口协作

GPAdmin 提供了完整的 RESTful API 接口，支持前后端分离开发。

## API 基础信息

- **Base URL**: `http://your-domain.com/api`
- **认证方式**: Bearer Token (Laravel Sanctum)
- **数据格式**: JSON

## 接口规范

### 请求格式

- **Content-Type**: `application/json`
- **认证头**: `Authorization: Bearer {token}`

### 响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

### HTTP 状态码

- `200`: 请求成功
- `201`: 创建成功
- `400`: 请求参数错误
- `401`: 未授权
- `403`: 无权限
- `404`: 资源不存在
- `500`: 服务器错误

## 相关文档

- [API 文档](./documentation.md)
- [接口规范](./standards.md)

