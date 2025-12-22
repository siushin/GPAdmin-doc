# API 文档

## 认证接口

### 用户登录

**POST** `/api/auth/login`

**请求参数**:
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "1|xxxxxxxxxxxx",
    "user": {
      "id": 1,
      "name": "用户名",
      "email": "user@example.com"
    }
  }
}
```

### 用户登出

**POST** `/api/auth/logout`

**请求头**: `Authorization: Bearer {token}`

## 用户管理

### 获取用户列表

**GET** `/api/users`

**请求头**: `Authorization: Bearer {token}`

**查询参数**:
- `page`: 页码（默认: 1）
- `per_page`: 每页数量（默认: 15）

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "data": [],
    "total": 100,
    "per_page": 15,
    "current_page": 1
  }
}
```

## 更多接口

详细的 API 文档请参考项目的 API 文档工具或 Swagger 文档。

