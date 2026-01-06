# 创建控制器

使用 `gpa:controller` 命令可以快速生成符合 GPA 规范的控制器文件。

## 命令格式

```bash
php artisan gpa:controller <name> [options]
```

## 参数说明

### 必填参数

| 参数 | 说明 |
|------|------|
| `name` | 控制器名称（不需要写 Controller 后缀） |

### 可选参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--module` | 模块名称 | `Base` |
| `--model` | 模型名称（如果与控制器名称不同） | 与控制器名称相同 |
| `--cn` | 中文名称（用于注释和 `#[ControllerName]` 注解） | 与控制器名称相同 |
| `--author` | 作者名称 | 见下方优先级说明 |
| `--email` | 作者邮箱 | 见下方优先级说明 |
| `--force` | 强制覆盖已存在的文件 | `false` |

### 作者信息获取优先级

**作者名称 (`--author`)**：
1. 命令行参数 `--author`
2. `config('laravel-tool.author')`
3. `env('APP_AUTHOR')`
4. 默认值 `GPA`

**作者邮箱 (`--email`)**：
1. 命令行参数 `--email`
2. `config('laravel-tool.email')`
3. `env('APP_EMAIL')`
4. 默认值 `gpa@example.com`

## 使用示例

### 基础用法

```bash
php artisan gpa:controller User
```

生成 `Modules/Base/app/Http/Controllers/UserController.php`

### 指定模块

```bash
php artisan gpa:controller User --module=Sms
```

生成 `Modules/Sms/app/Http/Controllers/UserController.php`

### 指定中文名称

```bash
php artisan gpa:controller User --cn=用户管理
```

控制器注解将显示为 `#[ControllerName('用户管理')]`

### 指定模型名称

当模型名称与控制器名称不同时使用：

```bash
php artisan gpa:controller UserInfo --model=User
```

### 指定作者信息

```bash
php artisan gpa:controller User --author=siushin --email=siushin@163.com
```

### 完整示例

```bash
php artisan gpa:controller Product --module=Shop --cn=商品管理 --author=siushin --email=siushin@163.com
```

### 强制覆盖

如果控制器已存在，使用 `--force` 参数强制覆盖：

```bash
php artisan gpa:controller User --force
```

## 生成的控制器结构

生成的控制器包含以下方法：

| 方法 | 说明 | 注解 |
|------|------|------|
| `list()` | 列表（全部） | `#[OperationAction(OperationActionEnum::list)]` |
| `index()` | 列表（分页） | `#[OperationAction(OperationActionEnum::index)]` |
| `add()` | 添加 | `#[OperationAction(OperationActionEnum::add)]` |
| `update()` | 更新 | `#[OperationAction(OperationActionEnum::update)]` |
| `delete()` | 删除 | `#[OperationAction(OperationActionEnum::delete)]` |

## 生成示例

执行命令：

```bash
php artisan gpa:controller Product --module=Shop --cn=商品管理 --author=siushin --email=siushin@163.com
```

生成的控制器代码：

```php
<?php

namespace Modules\Shop\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;
use Modules\Base\Enums\OperationActionEnum;
use Modules\Base\Http\Controllers\Controller;
use Modules\Shop\Models\Product;
use Siushin\LaravelTool\Attributes\ControllerName;
use Siushin\LaravelTool\Attributes\OperationAction;
use Siushin\Util\Traits\ParamTool;

#[ControllerName('商品管理')]
class ProductController extends Controller
{
    use ParamTool;

    /**
     * 商品管理列表（全部）
     * @return JsonResponse
     * @author siushin<siushin@163.com>
     */
    #[OperationAction(OperationActionEnum::list)]
    public function list(): JsonResponse
    {
        $params = request()->all();
        return success(Product::getAllData($params));
    }

    /**
     * 商品管理列表（分页）
     * @return JsonResponse
     * @author siushin<siushin@163.com>
     */
    #[OperationAction(OperationActionEnum::index)]
    public function index(): JsonResponse
    {
        $params = request()->all();
        return success(Product::getPageData($params));
    }

    /**
     * 添加商品管理
     * @return JsonResponse
     * @throws Exception
     * @author siushin<siushin@163.com>
     */
    #[OperationAction(OperationActionEnum::add)]
    public function add(): JsonResponse
    {
        $params = request()->all();
        return success(Product::addProduct($params));
    }

    /**
     * 更新商品管理
     * @return JsonResponse
     * @throws Exception
     * @author siushin<siushin@163.com>
     */
    #[OperationAction(OperationActionEnum::update)]
    public function update(): JsonResponse
    {
        $params = request()->all();
        return success(Product::updateProduct($params));
    }

    /**
     * 删除商品管理
     * @return JsonResponse
     * @throws Exception
     * @author siushin<siushin@163.com>
     */
    #[OperationAction(OperationActionEnum::delete)]
    public function delete(): JsonResponse
    {
        $params = trimParam(request()->only(['id']));
        return success(Product::deleteProduct($params));
    }
}
```

## 环境变量配置

在 `.env` 文件中配置默认作者信息：

```env
APP_AUTHOR=siushin
APP_EMAIL=siushin@163.com
```

## 下一步操作

控制器创建成功后，命令会提示下一步操作：

1. **创建模型**：
   ```bash
   php artisan module:make-model Product Shop
   ```

2. **添加路由**：
   在 `Modules/Shop/routes/api.php` 中添加路由配置

## 模板文件位置

控制器模板文件位于：

```
Modules/Base/stubs/controller.stub
```

如需自定义模板，可以修改此文件。
