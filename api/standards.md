# 接口规范

## RESTful 设计原则

### 资源命名

- 使用名词，不使用动词
- 使用复数形式
- 使用小写字母和连字符

**示例**:
- ✅ `/api/users`
- ✅ `/api/user-roles`
- ❌ `/api/getUsers`
- ❌ `/api/user_list`

### HTTP 方法

- `GET`: 获取资源
- `POST`: 创建资源
- `PUT`: 更新资源（完整更新）
- `PATCH`: 更新资源（部分更新）
- `DELETE`: 删除资源

### URL 设计

```
GET    /api/users           # 获取用户列表
GET    /api/users/{id}      # 获取单个用户
POST   /api/users           # 创建用户
PUT    /api/users/{id}      # 更新用户
DELETE /api/users/{id}      # 删除用户
```

## 请求规范

### 请求头

```http
Content-Type: application/json
Authorization: Bearer {token}
Accept: application/json
```

### 请求参数

- **查询参数**: 用于过滤、分页、排序
- **路径参数**: 用于标识资源
- **请求体**: 用于创建和更新资源

## 响应规范

### 成功响应

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {}
}
```

### 错误响应

```json
{
  "code": 400,
  "message": "错误信息",
  "errors": {
    "field": ["错误详情"]
  }
}
```

## 分页规范

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "data": [],
    "total": 100,
    "per_page": 15,
    "current_page": 1,
    "last_page": 7
  }
}
```

