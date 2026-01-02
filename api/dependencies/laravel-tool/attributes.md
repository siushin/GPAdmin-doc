# Attributes 属性类

属性类提供了用于注解和元数据定义的功能。

## 类列表

### ControllerName

控制器名称属性，用于定义控制器的名称。

### DescriptionAttribute

描述属性，用于为类、方法或属性添加描述信息。

### OperationAction

操作动作属性，用于定义 API 操作的类型和描述。

## OperationAction 使用

`OperationAction` 属性用于标记控制器方法的操作类型，主要用于操作日志记录。

**类位置**：`Siushin\LaravelTool\Attributes\OperationAction`

#### 基本用法

在控制器方法上使用 `OperationAction` 属性：

```php
use Siushin\LaravelTool\Attributes\OperationAction;
use Modules\Base\Enums\OperationActionEnum;

class AdminController extends Controller
{
    /**
     * 管理员列表
     */
    #[OperationAction(OperationActionEnum::index)]
    public function index(): JsonResponse
    {
        $params = trimParam(request()->all());
        return success(Admin::getPageData($params));
    }

    /**
     * 添加管理员
     */
    #[OperationAction(OperationActionEnum::add)]
    public function add(): JsonResponse
    {
        $params = trimParam(request()->all());
        return success(Admin::addAdmin($params));
    }

    /**
     * 更新管理员
     */
    #[OperationAction(OperationActionEnum::update)]
    public function update(): JsonResponse
    {
        $params = trimParam(request()->all());
        return success(Admin::updateAdmin($params));
    }

    /**
     * 删除管理员
     */
    #[OperationAction(OperationActionEnum::delete)]
    public function delete(): JsonResponse
    {
        $params = trimParam(request()->only(['account_id']));
        return success(Admin::deleteAdmin($params));
    }
}
```

#### 操作类型枚举

`OperationAction` 需要配合 `OperationActionEnum` 枚举使用，常用的操作类型包括：

- `index` - 列表查询
- `detail` - 查看详情
- `create` / `add` - 新增
- `update` - 更新
- `delete` - 删除
- `export` - 导出
- `import` - 导入

#### 在中间件中使用

`OperationAction` 属性会被 `OperationLogMiddleware` 中间件自动读取，用于记录操作日志：

```php
use ReflectionMethod;
use Siushin\LaravelTool\Attributes\OperationAction;

// 在中间件中获取操作类型
$reflectionMethod = $reflectionClass->getMethod($methodName);
$attributes = $reflectionMethod->getAttributes(OperationAction::class);
if (!empty($attributes)) {
    $operationAction = $attributes[0]->newInstance();
    $action = $operationAction->action->value;
}
```

## ControllerName 使用

`ControllerName` 属性用于标记控制器类的名称，便于 IDE 解析和代码管理。

**类位置**：`Siushin\LaravelTool\Attributes\ControllerName`

#### 基本用法

在控制器类上使用 `ControllerName` 属性：

```php
use Siushin\LaravelTool\Attributes\ControllerName;

#[ControllerName('系统日志')]
class LogController extends Controller
{
    // ...
}
```

## DescriptionAttribute 使用

`DescriptionAttribute` 属性用于为类、方法、属性或枚举 case 添加描述信息。

**类位置**：`Siushin\LaravelTool\Attributes\DescriptionAttribute`

#### 基本用法

```php
use Siushin\LaravelTool\Attributes\DescriptionAttribute;

// 在枚举 case 上使用
enum RequestSourceEnum: string
{
    #[DescriptionAttribute('记录请求发起的渠道或终端，如 PC 端、移动端、第三方接口等')]
    case PC = 'PC';
    
    case Mobile = '移动端';
}

// 在方法上使用
#[DescriptionAttribute('用户登录接口')]
public function login(): JsonResponse
{
    // ...
}
```
