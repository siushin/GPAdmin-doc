# Funcs 助手函数

助手函数提供了常用的 PHP 功能函数。

## 函数列表

### FuncArray

数组助手函数，提供了数组的常用操作方法。

### FuncDateTime

日期时间助手函数，提供了日期时间的格式化、计算等功能。

### FuncHelper

通用助手函数，提供了各种常用的辅助功能。

### FuncLog

日志助手函数，提供了日志记录的功能。

### FuncRequest

请求助手函数，提供了请求参数的获取、处理等功能。

## FuncArray 使用

数组助手函数，提供了数组的常用操作方法。

**文件位置**：`Siushin\Util\Funcs\FuncArray`

#### 常用函数

##### array_to_string_chain

将索引数组转换为字符串（拼接）。

```php
use function Siushin\Util\Funcs\array_to_string_chain;

$arr = ['name' => 'Tom', 'age' => 20];
$result = array_to_string_chain($arr);
// 返回: "name:Tom,age:20"

$result = array_to_string_chain($arr, '=', '&');
// 返回: "name=Tom&age=20"
```

##### enum_to_array

将枚举转换为数组。

```php
use function Siushin\Util\Funcs\enum_to_array;

enum Status { case ACTIVE; case INACTIVE; }
$enums = [Status::ACTIVE, Status::INACTIVE];

// 对象格式
$result = enum_to_array($enums, 'object');
// 返回: ['ACTIVE' => 'ACTIVE', 'INACTIVE' => 'INACTIVE']

// 数组格式
$result = enum_to_array($enums, 'array');
// 返回: [['name' => 'ACTIVE', 'value' => 'ACTIVE'], ...]
```

##### compareArray

比较两个数组，返回差异部分。

```php
use function Siushin\Util\Funcs\compareArray;

$new = ['id' => 1, 'name' => 'Tom', 'age' => 25];
$old = ['id' => 1, 'name' => 'Tom', 'age' => 20];
$result = compareArray($new, $old);
// 返回: ['new' => ['age' => 25], 'old' => ['age' => 20]]
```

##### compareDbDataDiff

比较新旧数组数据，返回新增、更新、删除三个分组数据。

```php
use function Siushin\Util\Funcs\compareDbDataDiff;

$newData = [
    ['name' => 'Tom', 'age' => 25],           // 新增
    ['id' => 1, 'name' => 'Jerry', 'age' => 30], // 更新
];
$oldData = [
    ['id' => 1, 'name' => 'Jerry', 'age' => 25],
    ['id' => 2, 'name' => 'Bob', 'age' => 20],   // 将被删除
];

$result = compareDbDataDiff($newData, $oldData, 'id');
// 返回:
// [
//   'add' => [['id' => '生成的ID', 'name' => 'Tom', 'age' => 25]],
//   'update' => [['id' => 1, 'name' => 'Jerry', 'age' => 30]],
//   'delete' => [2]
// ]
```

## FuncDateTime 使用

日期时间助手函数，提供了日期时间的格式化、计算等功能。

**文件位置**：`Siushin\Util\Funcs\FuncDateTime`

#### 常用函数

##### getDateTimeArr

获取当前时间、时间戳数组。

```php
use function Siushin\Util\Funcs\getDateTimeArr;

$result = getDateTimeArr();
// 返回: ['time' => 1704067200, 'datetime' => '2025-01-01 00:00:00']
```

##### genDateListByRange

生成指定区间的所有日期清单。

```php
use function Siushin\Util\Funcs\genDateListByRange;

$dates = genDateListByRange('2025-01-01', '2025-01-05');
// 返回: ['2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05']

$dates = genDateListByRange('2025-01-01', '2025-01-05', 'desc');
// 返回: ['2025-01-05', '2025-01-04', '2025-01-03', '2025-01-02', '2025-01-01']
```

##### validateDate

验证是否是日期。

```php
use function Siushin\Util\Funcs\validateDate;

validateDate('2025-01-01'); // true
validateDate('2025-13-01'); // false
validateDate('2025/01/01'); // false
```

##### isCurrentTimeWithinRange

判断是否处于两个时间段当中。

```php
use function Siushin\Util\Funcs\isCurrentTimeWithinRange;

// 判断当前时间是否在2025年内
$result = isCurrentTimeWithinRange('2025-01-01 00:00:00', '2025-12-31 23:59:59');
// 如果当前时间在2025年内，返回 true，否则返回 false
```

## FuncHelper 使用

通用助手函数，提供了各种常用的辅助功能。

**文件位置**：`Siushin\Util\Funcs\FuncHelper`

#### 常用函数

##### generateId

生成雪花算法的UUID（全局唯一ID，纯数字）。

```php
use function Siushin\Util\Funcs\generateId;

// 自动生成（基于主机名和进程ID）
$id = generateId();
// 返回: "1704067200001" (14位数字)

// 指定数据中心ID和机器ID
$id = generateId(0, 1);
// 数据中心0，机器1
```

**参数说明：**

- `$datacenterId` - 数据中心ID（0-7），用于区分不同的数据中心/机房
- `$workerId` - 机器ID（0-7），用于区分同一数据中心内的不同机器

## FuncLog 使用

日志助手函数，提供了日志记录的功能。

**文件位置**：`Siushin\Util\Funcs\FuncLog`

#### 常用函数

##### generateDataChangeLog

生成新旧数据对比的结构化日志字符串。

```php
use function Siushin\Util\Funcs\generateDataChangeLog;

$old = ['name' => 'Tom', 'age' => 30];
$new = ['name' => 'Tom', 'age' => 31];
$log = generateDataChangeLog($old, $new);
// 返回: "【修改数据】age: 30→31"

// 使用键名映射
$mapping = ['age' => '年龄', 'status' => '状态'];
$log = generateDataChangeLog($old, $new, '修改数据', $mapping);
// 返回: "【修改数据】年龄: 30→31"
```

## FuncRequest 使用

请求助手函数，提供了请求参数的获取、处理等功能。

**文件位置**：`Siushin\Util\Funcs\FuncRequest`

#### 常用函数

##### httpBuildUrl

构建带参数的URL。

```php
use function Siushin\Util\Funcs\httpBuildUrl;

$url = httpBuildUrl('https://example.com', 'api/users', ['page' => 1, 'limit' => 10]);
// 返回: "https://example.com/api/users?page=1&limit=10"

// 合并已有查询参数
$url = httpBuildUrl('https://example.com/api?old=1', '', ['new' => 2]);
// 返回: "https://example.com/api?old=1&new=2"
```

