# 逻辑类规范

## 规范说明

逻辑类（Logic）用于模块内部业务逻辑处理，将控制器的业务逻辑代码抽离到独立的逻辑类中，保持控制器简洁。

## 目录位置

逻辑类统一放在模块的 `app/Logics/` 目录下：

```
Modules/
  Base/
    app/
      Logics/
        MenuLogic.php
  Sms/
    app/
      Logics/
        SmsLogic.php
```

## 命名规范

- 逻辑类名称使用 `PascalCase`，以 `Logic` 结尾
- 例如：`MenuLogic`、`SmsLogic`、`UserLogic`

## 方法规范

### 静态方法

逻辑类的方法**建议**都使用 `static` 静态方法，便于直接调用：

```php
<?php

namespace Modules\Base\Logics;

/**
 * 菜单逻辑类
 * 处理菜单相关的业务逻辑
 */
class MenuLogic
{
    /**
     * 获取用户菜单列表
     * @return array
     */
    public static function getUserMenus(): array
    {
        // 业务逻辑实现
        $user = request()->user();
        // ...
        return $result;
    }
}
```

**控制器中调用：**

```php
<?php

namespace Modules\Base\Http\Controllers;

use Modules\Base\Logics\MenuLogic;

class MenuController extends Controller
{
    public function getUserMenus(): JsonResponse
    {
        // 直接静态调用逻辑类方法
        return success(MenuLogic::getUserMenus(), '获取菜单成功');
    }
}
```

## 使用场景

逻辑类适用于以下场景：

1. **控制器逻辑抽离**：将控制器的业务逻辑代码移到逻辑类中
2. **模块内部复用**：在同一个模块内的多个控制器中复用业务逻辑
3. **复杂业务处理**：处理复杂的业务规则和数据处理

## 控制器代码示例

逻辑类的主要目的是简化控制器代码，控制器应该保持简洁：

**简化前：**

```php
public function getUserMenus(): JsonResponse
{
    $user = request()->user();
    // ... 大量业务逻辑代码 ...
    // ... 数据库查询 ...
    // ... 数据处理 ...
    return success($result, '获取菜单成功');
}
```

**简化后：**

```php
public function getUserMenus(): JsonResponse
{
    return success(MenuLogic::getUserMenus(), '获取菜单成功');
}
```

## 注意事项

⚠️ **重要提示：**

1. **模块内部使用**：逻辑类主要用于模块内部的业务逻辑处理
2. **静态方法优先**：建议所有方法都使用 `static`，便于直接调用
3. **单一职责**：每个逻辑类只负责一个明确的业务领域
4. **不直接返回 JsonResponse**：逻辑类返回数据数组，由控制器统一格式化为 JsonResponse

## 与 Service 类的区别

- **Logic（逻辑类）**：模块内部使用，处理模块特定的业务逻辑，主要用于简化控制器代码
- **Service（服务类）**：对外提供服务，跨模块调用，封装可复用的业务逻辑

## 相关文档

- [服务类规范](./service.md) - 服务类开发规范
- [控制器规范](./controller.md) - 控制器开发规范

