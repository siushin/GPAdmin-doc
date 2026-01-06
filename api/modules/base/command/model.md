# 创建模型

`gpa:model` 命令用于快速生成符合 GPA 规范的 Eloquent 模型文件。

## 命令格式

```bash
php artisan gpa:model {name} [options]
```

## 参数说明

### 必填参数

| 参数 | 说明 | 示例 |
|------|------|------|
| `name` | 模型名称（自动转换为 StudlyCase） | `User`、`OrderItem` |

### 可选参数

| 参数 | 说明 | 默认值 | 示例 |
|------|------|--------|------|
| `--module` | 模块名称 | `Base` | `--module=Sms` |
| `--table` | 数据表名称 | `gpa_{snake_case}` | `--table=gpa_user` |
| `--pk` | 主键名称 | `{snake_case}_id` | `--pk=user_id` |
| `--cn` | 模型中文名称（用于注释） | 同模型名称 | `--cn=用户` |
| `--author` | 作者名称 | 配置文件或默认值 | `--author=张三` |
| `--email` | 作者邮箱 | 配置文件或默认值 | `--email=test@example.com` |
| `--force` | 强制覆盖已存在的文件 | - | `--force` |

## 使用示例

### 基础用法

```bash
# 创建基础模型
php artisan gpa:model User

# 指定模块
php artisan gpa:model SmsTemplate --module=Sms

# 指定中文名称
php artisan gpa:model Order --cn=订单

# 完整参数
php artisan gpa:model Product --module=Shop --table=gpa_product --pk=product_id --cn=商品 --author=张三
```

### 强制覆盖

```bash
php artisan gpa:model User --force
```

## 生成的模型结构

生成的模型文件位于 `Modules/{Module}/app/Models/{Name}.php`，包含以下内容：

### 基础结构

```php
<?php

namespace Modules\Base\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Siushin\LaravelTool\Traits\ModelTool;
use Siushin\Util\Traits\ParamTool;

/**
 * 模型：用户
 */
class User extends Model
{
    use ParamTool, ModelTool, SoftDeletes;

    protected $table = 'gpa_user';

    protected $primaryKey = 'user_id';

    protected $fillable = [
        'user_id',
    ];

    protected $hidden = [
        'deleted_at',
    ];
    
    // ... 方法
}
```

### 内置方法

模型自动生成以下标准方法：

1. **getAllData** - 获取全部数据列表
2. **getPageData** - 获取分页数据列表
3. **addXxx** - 添加数据
4. **updateXxx** - 更新数据
5. **deleteXxx** - 删除数据

## where_mapping 查询映射

`fastGetAllData` 和 `fastGetPageData` 的第三个参数 `where_mapping` 用于定义查询条件的映射关系。

### 支持的操作符

| 操作符 | 说明 | 示例 |
|--------|------|------|
| `=` | 完全匹配 | `'status' => '='` |
| `like` | 模糊匹配（自动添加 `%keyword%`） | `'name' => 'like'` |
| `not like` | 模糊排除 | `'name' => 'not like'` |
| `>` | 大于 | `'age' => '>'` |
| `>=` | 大于等于 | `'age' => '>='` |
| `<` | 小于 | `'age' => '<'` |
| `<=` | 小于等于 | `'age' => '<='` |
| `!=` | 不等于 | `'status' => '!='` |
| `<>` | 不等于 | `'status' => '<>'` |

### 特殊映射

| 映射键 | 说明 | 用法 |
|--------|------|------|
| `date_range` | 日期范围查询 | `'date_range' => 'created_at'` |
| `time_range` | 时间范围查询 | `'time_range' => 'created_at'` |
| `keyword`（数组） | 多字段关键字搜索（OR 关系） | `'keyword' => ['name', 'email', 'phone']` |
| `keyword`（字符串） | 多字段关键字搜索（OR 关系） | `'keyword' => 'name\|email\|phone'` |

### 完整示例

```php
public static function getPageData(array $params = []): array
{
    return self::fastGetPageData(self::query(), $params, [
        // 完全匹配
        'account_id'    => '=',
        'status'        => '=',
        'category_id'   => '=',
        'source_type'   => '=',
        
        // 模糊匹配
        'name'          => 'like',
        'title'         => 'like',
        'path'          => 'like',
        'ip_address'    => 'like',
        
        // 模糊排除
        'exclude_name'  => 'not like',
        
        // 比较运算
        'min_price'     => '>=',
        'max_price'     => '<=',
        'age'           => '>',
        
        // 日期范围（自动处理开始/结束时间为当天 00:00:00 和 23:59:59）
        'date_range'    => 'created_at',
        
        // 时间范围（精确时间戳查询）
        'time_range'    => 'updated_at',
        
        // 多字段关键字搜索（数组写法，字段间为 OR 关系）
        'keyword'       => ['title', 'content', 'description'],
        
        // 多字段关键字搜索（字符串写法，用 | 分隔）
        // 'keyword'    => 'title|content|description',
    ]);
}
```

### 前端传参示例

```javascript
// 完全匹配
{ status: 1, category_id: 5 }

// 模糊匹配
{ name: '张三' }  // 自动转换为 LIKE '%张三%'

// 日期范围
{ date_range: '2024-01-01,2024-12-31' }
// 或数组格式
{ date_range: ['2024-01-01', '2024-12-31'] }

// 时间范围
{ time_range: '2024-01-01 00:00:00,2024-12-31 23:59:59' }

// 关键字搜索（会在配置的多个字段中搜索）
{ keyword: '搜索内容' }

// 分页参数
{ page: 1, pageSize: 20 }

// 排序参数
{ sortbys: { created_at: 'desc', id: 'asc' } }
```

## 引入的 Trait

### ParamTool

提供参数处理相关方法：

- `checkEmptyParam()` - 检查必填参数
- `getQueryParam()` - 获取查询参数
- `trimParam()` - 去除参数空白

### ModelTool

提供模型查询相关方法：

- `fastGetPageData()` - 快速获取分页数据
- `fastGetAllData()` - 快速获取全部数据
- `fastGetTotal()` - 快速获取数据总数
- `buildWhereData()` - 构建查询条件
- `getTableFields()` - 获取表字段列表
- `checkIsExistByPk()` - 检查数据是否存在

## 注意事项

1. **主键生成**：新增数据时必须使用 `generateId()` 函数生成主键
2. **软删除**：模型默认启用软删除（SoftDeletes）
3. **account_id**：建议所有模型都支持 `account_id` 查询，便于数据权限控制
4. **命名规范**：
   - 模型名使用 StudlyCase（如 `OrderItem`）
   - 表名使用 snake_case 并加 `gpa_` 前缀（如 `gpa_order_item`）
   - 主键使用 snake_case 并加 `_id` 后缀（如 `order_item_id`）

## 相关命令

- [创建控制器](/api/modules/base/command/controller) - 生成 GPA 风格的控制器

