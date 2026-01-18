# 服务类规范

## 规范说明

服务类（Service）用于对外提供服务，封装可复用的业务逻辑。服务类的方法建议都使用 `static` 静态方法，便于直接调用，无需实例化。

## 目录位置

服务类统一放在模块的 `app/Services/` 目录下：

```
Modules/
  Base/
    app/
      Services/
        AuthService.php
        LogService.php
        MenuImportService.php
  Sms/
    app/
      Services/
        SmsService.php
```

## 命名规范

- 服务类名称使用 `PascalCase`，以 `Service` 结尾
- 例如：`AuthService`、`LogService`、`MenuImportService`

## 方法规范

### 静态方法（推荐）

服务类的方法**建议**都使用 `static` 静态方法，便于直接调用：

```php
<?php

namespace Modules\Base\Services;

/**
 * 菜单导入服务类
 */
class MenuImportService
{
    /**
     * 从 CSV 文件导入菜单
     * @param string $moduleName 模块名称
     * @param string $csvPath    CSV 文件路径
     * @return array
     */
    public static function importMenusFromCsv(
        string $moduleName,
        string $csvPath
    ): array {
        // 实现逻辑
    }
}
```

**调用方式：**

```php
// 直接静态调用
$result = MenuImportService::importMenusFromCsv($moduleName, $csvPath);
```

### 实例方法（特殊情况）

只有在需要维护状态（如配置、缓存等）的情况下，才使用实例方法：

```php
<?php

namespace Modules\Base\Services;

/**
 * 认证服务类
 */
class AuthService
{
    private int $expireMinute;

    public function __construct()
    {
        // 初始化配置
        $this->expireMinute = config('sanctum.expiration') ?: 120;
    }

    public function validateRequestSource(Request $request): array
    {
        // 使用实例属性
    }
}
```

## 使用场景

服务类适用于以下场景：

1. **跨模块调用**：需要在多个模块或控制器中复用的逻辑
2. **复杂业务逻辑**：将复杂的业务逻辑从控制器中抽离
3. **数据处理**：数据导入、导出、转换等操作
4. **第三方服务封装**：封装第三方 API 或服务调用
5. **工具方法**：提供通用的工具方法

## 示例代码

### 控制器中使用服务类

```php
<?php

namespace Modules\Base\Http\Controllers;

use Modules\Base\Services\MenuImportService;

class MenuController extends Controller
{
    public function getUserMenus(): JsonResponse
    {
        // 直接静态调用服务类方法
        return success(MenuLogic::getUserMenus(), '获取菜单成功');
    }
}
```

### Seeder 中使用服务类

```php
<?php

namespace Modules\Base\Database\Seeders;

use Modules\Base\Services\MenuImportService;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        $moduleName = 'Base';
        $csvPath = __DIR__ . '/../../data/menu.csv';
        
        // 使用服务类导入菜单
        MenuImportService::importMenusFromCsv($moduleName, $csvPath, null, $this->command);
    }
}
```

## 注意事项

⚠️ **重要提示：**

1. **静态方法优先**：建议所有方法都使用 `static`，除非确实需要维护实例状态
2. **单一职责**：每个服务类只负责一个明确的业务领域
3. **方法命名**：方法名使用 `camelCase`，语义清晰
4. **错误处理**：在服务类中处理业务异常，返回明确的结果
5. **依赖注入**：尽量避免在服务类中使用全局函数，优先使用依赖注入

## 与 Logic 类的区别

- **Service（服务类）**：对外提供服务，跨模块调用，方法建议使用 `static`
- **Logic（逻辑类）**：模块内部使用，处理模块特定的业务逻辑

## 相关文档

- [逻辑类规范](./logic.md) - 模块内部业务逻辑规范

