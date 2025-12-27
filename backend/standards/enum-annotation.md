# 枚举类注解注释规范

除了使用行内注释（`// 中文描述`）的方式外，还可以使用 PHP 8 的 Attribute 注解来为枚举 case 添加描述信息。推荐使用 `DescriptionAttribute` 注解，它更加语义化和现代化。

## DescriptionAttribute 注解

`DescriptionAttribute` 是一个通用的注解类，可用于在任何代码元素（类、方法、属性、枚举case等）上标记描述信息。

**文件位置**：`Modules/Base/app/Attributes/DescriptionAttribute.php`

## 使用方式

在枚举类中使用 `DescriptionAttribute` 注解：

```php
use Modules\Base\Attributes\DescriptionAttribute;

enum MenuTypeEnum: string
{
    #[DescriptionAttribute('目录')]
    case Dir = 'dir';

    #[DescriptionAttribute('菜单')]
    case Menu = 'menu';

    #[DescriptionAttribute('按钮')]
    case Button = 'button';

    #[DescriptionAttribute('链接')]
    case Link = 'link';
}
```

## 注解注释 vs 行内注释

**注解注释的优势：**
- ✅ 更加语义化和现代化
- ✅ 支持多种目标类型（类、方法、属性、枚举case等）
- ✅ 可以通过反射API更灵活地获取和使用
- ✅ 更好的IDE支持和类型检查

**行内注释的优势：**
- ✅ 向后兼容性好
- ✅ 代码更简洁
- ✅ 适合快速添加简单注释

## 解析函数

`getEnumComment()` 函数会**优先**从 `DescriptionAttribute` 注解中读取描述，如果不存在则从行内注释中读取（向后兼容）。

**函数位置**：`Modules/Base/app/Funcs/FuncHelper.php`

**使用示例：**

```php
$case = MenuTypeEnum::Dir;
$description = getEnumComment($case); // 返回: '目录'
```

## 注意事项

1. **注解注释优先级更高**：如果同时存在注解注释和行内注释，`getEnumComment()` 函数会优先使用注解注释。

2. **向后兼容**：为了保持向后兼容，项目中仍然支持行内注释方式，`getEnumComment()` 函数会自动处理两种情况。

3. **推荐使用场景**：
   - 新建的枚举类推荐使用 `DescriptionAttribute` 注解
   - 需要更灵活的扩展时使用注解
   - 需要在多个目标（类、方法、属性等）上添加描述时使用注解

4. **已使用注解的枚举类**：
   - `MenuTypeEnum` - 菜单类型（使用 `DescriptionAttribute`）
   - `DictionaryCategoryEnum` - 字典类别（使用 `DescriptionAttribute`）

## 相关文档

- [枚举类注释规范](./enum.md) - 行内注释方式的规范说明

