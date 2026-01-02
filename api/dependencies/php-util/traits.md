# Traits 特征类

Trait 特征类提供了可复用的功能特性。

## 类列表

### ParamTool

参数工具特征，提供了参数处理、验证等功能。

## ParamTool 使用

`ParamTool` 提供了参数处理、验证等常用功能。

**类位置**：`Siushin\Util\Traits\ParamTool`

#### 在 Controller 中使用

```php
use Siushin\Util\Traits\ParamTool;

class UserController extends Controller
{
    use ParamTool;

    public function index(): JsonResponse
    {
        $params = request()->all();
        
        // 获取整型参数
        $userId = self::getIntValue($params, 'user_id', 0);
        
        // 获取请求参数
        $name = self::getQueryParam($params, 'name', '');
        
        // 检测空参数
        self::checkEmptyParam($params, ['user_id', 'name']);
        
        return success();
    }
}
```

## getIntValue

获取整型参数值。

```php
public static function getIntValue(array $params, string $field, int $default = 0): int
```

**使用示例：**

```php
$userId = self::getIntValue($params, 'user_id', 0);
// 如果 user_id 存在且为整数，返回整数值；否则返回默认值 0
```

## getIntValOrNull

获取整数（没有返回null）。

```php
public static function getIntValOrNull(array $params, string $param_key, bool $throw_exp = true): ?int
```

**使用示例：**

```php
$userId = self::getIntValOrNull($params, 'user_id');
// 如果 user_id 存在且为整数，返回整数值；否则返回 null
// 如果 throw_exp 为 true 且参数存在但格式错误，会抛出异常
```

## getQueryParam

获取请求参数，支持多种格式解析。

```php
public static function getQueryParam(
    array $params,
    string $param_key,
    mixed $default = null,
    string $exp_type = '',
    string $param_type = null
): mixed
```

**支持的 exp_type：**

- `-` / `_` / `,` - 按分隔符分割为数组
- `@` / `&` - 解析键值对字符串

**使用示例：**

```php
// 基本用法
$name = self::getQueryParam($params, 'name', '');

// 按逗号分割
$ids = self::getQueryParam($params, 'ids', [], ',');
// 输入: "1,2,3" 返回: [1, 2, 3]

// 解析键值对
$sort = self::getQueryParam($params, 'sort', [], '@');
// 输入: "name=asc&age=desc" 返回: ['name' => 'asc', 'age' => 'desc']
```

## checkEmptyParam

检测空参数。

```php
public static function checkEmptyParam(
    array $params,
    array $check_fields,
    bool $strict_check = true,
    array $only_empty_check = []
): void
```

**使用示例：**

```php
// 严格检测（有定义且有值）
self::checkEmptyParam($params, ['user_id', 'name']);

// 非严格检测（有定义即可）
self::checkEmptyParam($params, ['user_id', 'name'], false);

// 只检测指定字段为空
self::checkEmptyParam($params, ['user_id', 'name'], true, ['name']);
```

## getArrayByKeys

从原始数组中筛选出指定的键值对。

```php
public static function getArrayByKeys(array $data, array $keys): array
```

**使用示例：**

```php
$data = ['id' => 1, 'name' => 'Tom', 'age' => 20, 'password' => '123456'];
$result = self::getArrayByKeys($data, ['name', 'age']);
// 返回: ['name' => 'Tom', 'age' => 20]
```

## trimValueArray

从数组中移除指定的值。

```php
public static function trimValueArray(
    array &$array,
    array $keys = [],
    array $values = ['', null, 'null'],
    bool $recursive = false,
    bool $strict = false
): array
```

**使用示例：**

```php
$data = ['id' => 1, 'name' => '', 'age' => null, 'email' => 'test@example.com'];
self::trimValueArray($data);
// 返回: ['id' => 1, 'email' => 'test@example.com']
// 原数组也会被修改
```
