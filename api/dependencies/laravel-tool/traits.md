# Traits 特征类

Trait 特征类提供了可复用的功能特性。

## 类列表

### ExcelReader

Excel 读取特征，提供了读取 Excel 文件的功能。

### ExcelTool

Excel 工具特征，提供了 Excel 文件的通用操作方法。

### ExcelWriter

Excel 写入特征，提供了将数据写入 Excel 文件的功能。

### LaraParamTool

参数工具特征，基于 Laravel 的参数处理工具。

### ModelTool

模型工具特征，提供了模型常用的操作方法。

## ModelTool 使用

`ModelTool` 提供了模型常用的操作方法，包括分页查询、条件构建、数据验证等。

**类位置**：`Siushin\LaravelTool\Traits\ModelTool`

#### 在 Model 中使用

```php
use Siushin\LaravelTool\Traits\ModelTool;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use ModelTool;

    /**
     * 获取分页数据
     */
    public static function getPageData(array $params = []): array
    {
        $where_mapping = [
            'name' => 'like',
            'email' => '=',
            'status' => '=',
            'keyword' => 'name|email', // 多字段模糊查询
            'date_range' => 'created_at',
        ];

        return self::fastGetPageData(
            new self(),
            $params,
            $where_mapping,
            ['id', 'name', 'email', 'created_at']
        );
    }

    /**
     * 获取全部数据
     */
    public static function getAllData(array $params = []): array
    {
        $where_mapping = [
            'status' => '=',
        ];

        return self::fastGetAllData(
            new self(),
            $params,
            $where_mapping
        );
    }
}
```

#### 常用方法

##### fastGetPageData

快速获取分页数据。

```php
protected static function fastGetPageData(
    mixed $model,
    array $params,
    array $where_mapping = [],
    array|string $fields = ['*'],
    array $where = []
): array
```

**参数说明：**

- `$model` - 模型实例或查询构建器
- `$params` - 请求参数数组
- `$where_mapping` - 字段映射关系，格式：`['字段名' => '操作符']`
- `$fields` - 要查询的字段，可以是数组或字符串（逗号分隔）
- `$where` - 额外的 where 条件

**支持的查询操作：**

- `=` - 等于
- `like` / `not like` - 模糊查询
- `keyword` - 关键字查询（支持多字段，用 `|` 分隔）
- `date_range` - 日期范围查询
- `time_range` - 时间范围查询

##### fastGetAllData

快速获取全部数据（不分页）。

```php
protected static function fastGetAllData(
    mixed $model,
    array $params,
    array $where_mapping = [],
    array|string $fields = ['*'],
    array $where = []
): array
```

##### buildWhereData

构建 where 条件数组。

```php
public static function buildWhereData(
    array $params,
    array $where_mapping,
    array $where = []
): array
```

##### checkIsExistByPk

检查数据是否存在（根据主键ID）。

```php
public static function checkIsExistByPk(array $params, string $pk): void
```

**使用示例：**

```php
// 检查用户是否存在
User::checkIsExistByPk(['user_id' => 1], 'user_id');
// 如果不存在，会抛出异常：数据不存在(ID:1)
```

#### 日期时间访问器

`ModelTool` 自动为 `created_at` 和 `updated_at` 字段添加访问器，将 UTC 时间转换为本地时区：

```php
$user = User::find(1);
echo $user->created_at; // '2025-01-01 20:00:00' (已转换为本地时区)
```

## LaraParamTool 使用

`LaraParamTool` 提供了参数处理工具，基于 `ParamTool` 扩展。

**类位置**：`Siushin\LaravelTool\Traits\LaraParamTool`

#### 在 Controller 中使用

```php
use Siushin\LaravelTool\Traits\LaraParamTool;

class UserController extends Controller
{
    use LaraParamTool;

    public function index(): JsonResponse
    {
        $params = trimParam(request()->all());
        // 使用参数处理方法
        $userId = self::getIntValue($params, 'user_id', 0);
        return success();
    }
}
```

#### 常用方法

##### collectRecursiveToArray

将集合数据递归转换为数组。

```php
public static function collectRecursiveToArray(mixed $collection): array
```

**使用示例：**

```php
$collection = collect([
    ['id' => 1, 'name' => 'Tom'],
    ['id' => 2, 'name' => 'Jerry'],
]);

$array = self::collectRecursiveToArray($collection);
// 返回: [['id' => 1, 'name' => 'Tom'], ['id' => 2, 'name' => 'Jerry']]
```

## ExcelReader / ExcelWriter 使用

Excel 处理特征，提供了 Excel 文件的读取和写入功能。

**类位置**：
- `Siushin\LaravelTool\Traits\ExcelReader`
- `Siushin\LaravelTool\Traits\ExcelWriter`

#### ExcelReader 使用

```php
use Siushin\LaravelTool\Traits\ExcelReader;

class ImportController extends Controller
{
    use ExcelReader;

    public function import(): JsonResponse
    {
        $file = request()->file('excel');
        $filePath = $file->store('temp');
        $fullPath = storage_path('app/' . $filePath);

        // 定义列映射
        $columnMap = ['name', 'email', 'phone'];

        // 读取 Excel 数据
        $data = self::getExcelRowData(
            $fullPath,
            $columnMap,
            null, // 回调函数，null 表示返回所有数据
            2,    // 从第2行开始读取（第1行是标题）
            -1    // 读取所有行
        );

        return success($data);
    }
}
```

#### ExcelWriter 使用

```php
use Siushin\LaravelTool\Traits\ExcelWriter;

class ExportController extends Controller
{
    use ExcelWriter;

    public function export(): JsonResponse
    {
        $headers = ['姓名', '邮箱', '电话'];
        $data = [
            ['Tom', 'tom@example.com', '13800138000'],
            ['Jerry', 'jerry@example.com', '13900139000'],
        ];

        $result = self::writerExcel(
            $headers,
            $data,
            'users.xlsx',
            [
                'save_path' => '/storage/app/excel/',
                'column_center_list' => ['A', 'B', 'C'], // 列居中
                'column_auto_size_list' => ['A', 'B', 'C'], // 列自适应宽度
            ]
        );

        return success($result);
    }
}
```

