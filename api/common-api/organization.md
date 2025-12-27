# 组织架构 API

组织架构模块提供了完整的组织架构管理功能，包括组织架构类型的增删改查和组织架构数据的树形结构管理。

## 组织架构类型管理

### 获取组织架构类型列表

**接口地址**：`POST /api/admin/organizationType/list`

**请求头**：

```
Authorization: Bearer {token}
Content-Type: application/json
```

**请求参数**：无

**响应示例**：

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "dictionary_id": 1,
      "dictionary_name": "公司",
      "dictionary_value": "company",
      "dictionary_desc": "公司类型",
      "sys_param_flag": 0
    },
    {
      "dictionary_id": 2,
      "dictionary_name": "部门",
      "dictionary_value": "department",
      "dictionary_desc": "部门类型",
      "sys_param_flag": 0
    }
  ]
}
```

### 新增组织架构类型

**接口地址**：`POST /api/admin/organizationType/add`

**请求头**：

```
Authorization: Bearer {token}
Content-Type: application/json
```

**请求参数**：

```json
{
  "dictionary_name": "小组",
  "dictionary_value": "group",
  "dictionary_desc": "小组类型"
}
```

**参数说明**：

- `dictionary_name`（必填）：组织架构类型名称
- `dictionary_value`（必填）：组织架构类型值（唯一）
- `dictionary_desc`（必填）：组织架构类型描述

**响应示例**：

```json
{
  "code": 200,
  "message": "新增成功",
  "data": {}
}
```

### 更新组织架构类型

**接口地址**：`POST /api/admin/organizationType/update`

**请求头**：

```
Authorization: Bearer {token}
Content-Type: application/json
```

**请求参数**：

```json
{
  "dictionary_id": 1,
  "dictionary_name": "公司",
  "dictionary_value": "company",
  "dictionary_desc": "公司类型描述"
}
```

**参数说明**：

- `dictionary_id`（必填）：组织架构类型ID
- `dictionary_name`（必填）：组织架构类型名称
- `dictionary_value`（必填）：组织架构类型值
- `dictionary_desc`（必填）：组织架构类型描述

**响应示例**：

```json
{
  "code": 200,
  "message": "更新成功",
  "data": {}
}
```

### 删除组织架构类型

**接口地址**：`POST /api/admin/organizationType/delete`

**请求头**：

```
Authorization: Bearer {token}
Content-Type: application/json
```

**请求参数**：

```json
{
  "dictionary_id": 1
}
```

**参数说明**：

- `dictionary_id`（必填）：组织架构类型ID

**注意事项**：

- 如果组织架构类型被标记为系统参数（`sys_param_flag = 1`），则无法删除
- 如果该类型下存在组织架构数据，则无法删除

**响应示例**：

```json
{
  "code": 200,
  "message": "删除成功",
  "data": {}
}
```

## 组织架构数据管理

### 获取组织架构树形数据

**接口地址**：`POST /api/admin/organization/index`

**请求头**：

```
Authorization: Bearer {token}
Content-Type: application/json
```

**请求参数**：

```json
{
  "organization_tid": 1,
  "organization_name": "技术"
}
```

**参数说明**：

- `organization_tid`（必填）：组织架构类型ID
- `organization_name`（可选）：组织架构名称（模糊搜索）

**响应示例**：

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "organization_id": 1,
      "organization_name": "总公司",
      "organization_pid": 0,
      "organization_tid": 1,
      "children": [
        {
          "organization_id": 2,
          "organization_name": "技术部",
          "organization_pid": 1,
          "organization_tid": 1,
          "children": [
            {
              "organization_id": 3,
              "organization_name": "前端组",
              "organization_pid": 2,
              "organization_tid": 1
            }
          ]
        }
      ]
    }
  ]
}
```

### 获取组织架构树形HTML数据

**接口地址**：`POST /api/admin/organization/getFullTreeDataForHtml`

**请求头**：

```
Authorization: Bearer {token}
Content-Type: application/json
```

**请求参数**：

```json
{
  "organization_tid": 1
}
```

**参数说明**：

- `organization_tid`（必填）：组织架构类型ID

**响应示例**：

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "organization_id": 1,
      "organization_name": "├─ 总公司"
    },
    {
      "organization_id": 2,
      "organization_name": "├─ └─ 技术部"
    },
    {
      "organization_id": 3,
      "organization_name": "├─ └─ └─ 前端组"
    }
  ]
}
```

**说明**：此接口返回的树形数据使用了占位符（├─、└─）来表示层级关系，适用于下拉选择器等场景。

### 新增组织架构

**接口地址**：`POST /api/admin/organization/add`

**请求头**：

```
Authorization: Bearer {token}
Content-Type: application/json
```

**请求参数**：

```json
{
  "organization_name": "后端组",
  "organization_pid": 2,
  "organization_tid": 1
}
```

**参数说明**：

- `organization_name`（必填）：组织架构名称
- `organization_pid`（必填）：父级组织架构ID（0表示顶级）
- `organization_tid`（必填）：组织架构类型ID

**响应示例**：

```json
{
  "code": 200,
  "message": "新增成功",
  "data": {
    "organization_id": 4
  }
}
```

### 更新组织架构

**接口地址**：`POST /api/admin/organization/update`

**请求头**：

```
Authorization: Bearer {token}
Content-Type: application/json
```

**请求参数**：

```json
{
  "organization_id": 4,
  "organization_name": "后端开发组",
  "organization_pid": 2
}
```

**参数说明**：

- `organization_id`（必填）：组织架构ID
- `organization_name`（必填）：组织架构名称
- `organization_pid`（必填）：父级组织架构ID

**注意事项**：

- 不能将自己设置为自己的子节点（防止循环引用）

**响应示例**：

```json
{
  "code": 200,
  "message": "更新成功",
  "data": {}
}
```

### 删除组织架构

**接口地址**：`POST /api/admin/organization/delete`

**请求头**：

```
Authorization: Bearer {token}
Content-Type: application/json
```

**请求参数**：

```json
{
  "organization_id": 4
}
```

**参数说明**：

- `organization_id`（必填）：组织架构ID

**注意事项**：

- 如果该组织架构下存在子节点，则无法删除（需要先删除所有子节点）

**响应示例**：

```json
{
  "code": 200,
  "message": "删除成功",
  "data": {}
}
```

### 移动组织架构

**接口地址**：`POST /api/admin/organization/move`

**请求头**：

```
Authorization: Bearer {token}
Content-Type: application/json
```

**请求参数**：

```json
{
  "organization_id": 4,
  "organization_pid": 3
}
```

**参数说明**：

- `organization_id`（必填）：要移动的组织架构ID
- `organization_pid`（必填）：目标父级组织架构ID（0表示移动到顶级）

**注意事项**：

- 不能将自己移动到自己的子节点下（防止循环引用）

**响应示例**：

```json
{
  "code": 200,
  "message": "移动成功",
  "data": {}
}
```

## 数据模型

### Organization 模型

**表名**：`gpa_organization`

**字段说明**：

- `organization_id`：组织架构ID（主键）
- `organization_name`：组织架构名称
- `organization_pid`：父级组织架构ID（0表示顶级）
- `organization_tid`：组织架构类型ID
- `full_organization_pid`：完整父级路径（内部字段，用于快速查询）

### OrganizationType（字典）

**表名**：`gpa_dictionary`

**字典类别**：`OrganizationType`

**字段说明**：

- `dictionary_id`：字典ID（主键）
- `dictionary_name`：组织架构类型名称
- `dictionary_value`：组织架构类型值
- `dictionary_desc`：组织架构类型描述
- `sys_param_flag`：系统参数标识（1：系统参数，禁止删除；0：普通参数）

## 使用示例

### 前端调用示例

```typescript
import { request } from '@umijs/max';

// 获取组织架构类型列表
export async function getOrganizationTypeList() {
  return request('/api/admin/organizationType/list', {
    method: 'POST',
  });
}

// 获取组织架构树形数据
export async function getOrganizationTree(params: {
  organization_tid: number;
  organization_name?: string;
}) {
  return request('/api/admin/organization/index', {
    method: 'POST',
    data: params,
  });
}

// 新增组织架构
export async function addOrganization(data: {
  organization_name: string;
  organization_pid: number;
  organization_tid: number;
}) {
  return request('/api/admin/organization/add', {
    method: 'POST',
    data,
  });
}
```

## 注意事项

1. **层级限制**：建议控制组织架构的层级深度，避免过深的层级影响性能

2. **数据完整性**：删除组织架构类型前，需要先删除该类型下的所有组织架构数据

3. **循环引用**：系统已做防护，不允许将节点移动到其子节点下，但开发时仍需注意

4. **权限控制**：所有接口都需要进行权限验证，确保用户有相应的操作权限

5. **审计日志**：组织架构类型的新增、更新、删除操作会自动记录审计日志

