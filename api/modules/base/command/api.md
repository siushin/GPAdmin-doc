# 创建 API

`gpa:api` 命令用于快速生成完整的 API，同时创建控制器和模型文件。

## 命令格式

```bash
php artisan gpa:api {name} [options]
```

## 参数说明

### 必填参数

| 参数 | 说明 | 示例 |
|------|------|------|
| `name` | API 名称（同时用于控制器和模型） | `User`、`OrderItem` |

### 可选参数

| 参数 | 说明 | 默认值 | 示例 |
|------|------|--------|------|
| `--module` | 模块名称 | `Base` | `--module=Sms` |
| `--table` | 数据表名称 | `gpa_{snake_case}` | `--table=gpa_user` |
| `--pk` | 主键名称 | `{snake_case}_id` | `--pk=user_id` |
| `--cn` | 中文名称（用于注释） | 同 API 名称 | `--cn=用户` |
| `--author` | 作者名称 | 配置文件或默认值 | `--author=张三` |
| `--email` | 作者邮箱 | 配置文件或默认值 | `--email=test@example.com` |
| `--only-controller` | 仅创建控制器 | - | `--only-controller` |
| `--only-model` | 仅创建模型 | - | `--only-model` |
| `--force` | 强制覆盖已存在的文件 | - | `--force` |

## 使用示例

### 基础用法

```bash
# 创建完整 API（控制器 + 模型）
php artisan gpa:api User --cn=用户

# 指定模块
php artisan gpa:api SmsTemplate --module=Sms --cn=短信模板

# 完整参数
php artisan gpa:api Product --module=Shop --table=gpa_product --pk=product_id --cn=商品
```

### 部分创建

```bash
# 仅创建控制器
php artisan gpa:api User --only-controller --cn=用户

# 仅创建模型
php artisan gpa:api User --only-model --cn=用户
```

### 强制覆盖

```bash
php artisan gpa:api User --force --cn=用户
```

## 命令输出示例

```bash
$ php artisan gpa:api Product --module=Shop --cn=商品

开始生成 API: Product

  ✓ 模型 [Product] 创建成功
  ✓ 控制器 [ProductController] 创建成功

═══════════════════════════════════════════════════════════
  API 生成完成！
═══════════════════════════════════════════════════════════
  ✓ 模型: Modules/Shop/app/Models/Product.php
    表名: gpa_product
    主键: product_id
  ✓ 控制器: Modules/Shop/app/Http/Controllers/ProductController.php

下一步操作：
  1. 创建迁移文件:
     php artisan module:make-migration create_gpa_product_table Shop

  2. 编辑迁移文件，添加表字段

  3. 执行迁移:
     php artisan migrate

  4. 在路由文件中添加路由:
     Modules/Shop/routes/api.php

路由示例：
  Route::prefix('product')->controller(ProductController::class)->group(function () {
      Route::get('list', 'list');
      Route::get('index', 'index');
      Route::post('add', 'add');
      Route::post('update', 'update');
      Route::post('delete', 'delete');
  });
```

## 生成的文件结构

执行 `php artisan gpa:api User --module=Base --cn=用户` 后，将生成以下文件：

```
Modules/Base/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── UserController.php    # 控制器文件
│   └── Models/
│       └── User.php                  # 模型文件
```

### 控制器结构

```php
<?php

namespace Modules\Base\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;
use Modules\Base\Enums\OperationActionEnum;
use Modules\Base\Http\Controllers\Controller;
use Modules\Base\Models\User;
use Siushin\LaravelTool\Attributes\ControllerName;
use Siushin\LaravelTool\Attributes\OperationAction;
use Siushin\Util\Traits\ParamTool;

#[ControllerName('用户')]
class UserController extends Controller
{
    use ParamTool;

    #[OperationAction(OperationActionEnum::list)]
    public function list(): JsonResponse { ... }

    #[OperationAction(OperationActionEnum::index)]
    public function index(): JsonResponse { ... }

    #[OperationAction(OperationActionEnum::add)]
    public function add(): JsonResponse { ... }

    #[OperationAction(OperationActionEnum::update)]
    public function update(): JsonResponse { ... }

    #[OperationAction(OperationActionEnum::delete)]
    public function delete(): JsonResponse { ... }
}
```

### 模型结构

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

    public static function getAllData(array $params = [], array $fields = []): array { ... }
    public static function getPageData(array $params = []): array { ... }
    public static function addUser(array $params): array { ... }
    public static function updateUser(array $params): array { ... }
    public static function deleteUser(array $params): array { ... }
}
```

## 完整开发流程

使用 `gpa:api` 命令创建 API 后，按以下步骤完成开发：

### 1. 创建迁移文件

```bash
php artisan module:make-migration create_gpa_user_table Base
```

### 2. 编辑迁移文件

```php
// Modules/Base/database/migrations/xxxx_create_gpa_user_table.php
Schema::create('gpa_user', function (Blueprint $table) {
    $table->id('user_id')->comment('用户ID');
    $table->string('username', 50)->comment('用户名');
    $table->string('email', 100)->nullable()->comment('邮箱');
    $table->tinyInteger('status')->default(1)->comment('状态: 1启用, 0禁用');
    $table->timestamps();
    $table->softDeletes();
});
```

### 3. 执行迁移

```bash
php artisan migrate
```

### 4. 编辑模型

更新 `$fillable` 和查询条件：

```php
protected $fillable = [
    'user_id',
    'username',
    'email',
    'status',
];

public static function getPageData(array $params = []): array
{
    return self::fastGetPageData(self::query(), $params, [
        'account_id' => '=',
        'status'     => '=',
        'username'   => 'like',
        'email'      => 'like',
        'date_range' => 'created_at',
    ]);
}
```

### 5. 添加路由

```php
// Modules/Base/routes/api.php
use Modules\Base\Http\Controllers\UserController;

Route::prefix('user')->controller(UserController::class)->group(function () {
    Route::get('list', 'list');
    Route::get('index', 'index');
    Route::post('add', 'add');
    Route::post('update', 'update');
    Route::post('delete', 'delete');
});
```

### 6. 测试 API

```bash
# 获取列表
curl http://localhost/api/user/index

# 添加数据
curl -X POST http://localhost/api/user/add \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "email": "test@example.com"}'
```

## 与其他命令的关系

| 命令 | 说明 |
|------|------|
| `gpa:api` | 同时创建控制器和模型（推荐） |
| `gpa:controller` | 仅创建控制器 |
| `gpa:model` | 仅创建模型 |

## 相关命令

- [创建控制器](/api/modules/base/command/controller) - 单独生成控制器
- [创建模型](/api/modules/base/command/model) - 单独生成模型

