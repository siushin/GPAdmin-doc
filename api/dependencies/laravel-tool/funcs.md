# Funcs 助手函数

助手函数提供了常用的功能函数，基于 Laravel 框架。

## 函数列表

### LaraDateTime

日期时间助手函数，提供了日期时间的格式化、计算等常用功能。

### LaraRequest

请求助手函数，提供了请求参数的获取、验证等功能。

### LaraResponse

响应助手函数，提供了统一的响应格式、状态码处理等功能。

## LaraDateTime 使用

日期时间助手函数，基于 Laravel Carbon 提供日期时间处理功能。

**文件位置**：`Siushin\LaravelTool\Funcs\LaraDateTime`

#### 函数列表

##### getLocaleDateTime

获取本地化日期时间，将日期时间转换为应用时区的格式。

```php
use function Siushin\LaravelTool\Funcs\getLocaleDateTime;

// 将 UTC 时间转换为本地时区
$datetime = '2025-01-01 12:00:00';
$localDateTime = getLocaleDateTime($datetime);
// 返回: '2025-01-01 20:00:00' (假设时区为 Asia/Shanghai)
```

##### getDateTimeByTimestamp

根据时间戳获取日期时间字符串。

```php
use function Siushin\LaravelTool\Funcs\getDateTimeByTimestamp;

// 将时间戳转换为日期时间
$timestamp = 1704067200;
$datetime = getDateTimeByTimestamp($timestamp);
// 返回: '2025-01-01 00:00:00'
```

## LaraRequest 使用

请求助手函数，提供了请求相关的常用功能。

**文件位置**：`Siushin\LaravelTool\Funcs\LaraRequest`

#### 函数列表

##### currentUserId

获取当前登录用户ID。

```php
use function Siushin\LaravelTool\Funcs\currentUserId;

// 获取当前登录用户ID
$userId = currentUserId();
// 如果未登录，返回 0

// 指定默认值
$userId = currentUserId(1); // 如果未登录，返回 1
```

##### buildFilePath

构造文件路径，去掉多余的斜杠。

```php
use function Siushin\LaravelTool\Funcs\buildFilePath;

// 构造完整路径
$path = buildFilePath('uploads', 'images/avatar.jpg', true);
// 返回: /path/to/project/uploads/images/avatar.jpg

// 构造相对路径
$path = buildFilePath('uploads', 'images/avatar.jpg', false);
// 返回: /uploads/images/avatar.jpg
```

## LaraResponse 使用

响应助手函数，提供了统一的响应格式。

**文件位置**：`Siushin\LaravelTool\Funcs\LaraResponse`

#### 函数列表

##### success

返回成功响应。

```php
use function Siushin\LaravelTool\Funcs\success;

// 基本用法
return success();

// 带数据
return success(['id' => 1, 'name' => 'Tom']);

// 自定义消息
return success(['id' => 1], '操作成功');

// 自定义状态码
return success(['id' => 1], '操作成功', 201);
```

**响应格式：**

```json
{
    "code": 200,
    "message": "success",
    "data": {
        "id": 1,
        "name": "Tom"
    }
}
```

##### throw_exception

抛出 HTTP 异常。

```php
use function Siushin\LaravelTool\Funcs\throw_exception;

// 抛出异常
throw_exception('操作失败');

// 带错误码
throw_exception('操作失败', 1001);

// 自定义 HTTP 状态码
throw_exception('未授权', 0, 401);
```

##### buildPageData

构造分页数据格式。

```php
use function Siushin\LaravelTool\Funcs\buildPageData;

// 从分页结果构造数据
$paginator = Model::paginate(10);
$pageData = buildPageData($paginator);

// 返回格式
[
    'data' => [...], // 数据列表
    'page' => [
        'currentPage'  => 1,    // 当前页数
        'currentCount' => 10,    // 当前记录数
        'perPage'      => 10,    // 每页记录数
        'lastPage'     => 5,     // 总页数
        'total'        => 50,    // 总记录数
    ],
]
```

#### 在 Controller 中使用

```php
use function Siushin\LaravelTool\Funcs\success;
use function Siushin\LaravelTool\Funcs\buildPageData;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $params = trimParam(request()->all());
        $data = User::getPageData($params);
        return success($data);
    }

    public function list(): JsonResponse
    {
        $users = User::paginate(10);
        return success(buildPageData($users));
    }
}
```

