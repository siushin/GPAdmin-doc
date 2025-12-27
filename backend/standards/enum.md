# 枚举类注释规范

## 规范说明

对于需要生成数据库字段注释的枚举类，必须在每个 `case` 语句后添加行内注释（`// 中文描述`）。这些注释会被 `getEnumComment()` 函数解析，并通过 `buildEnumComment()` 函数生成数据库字段的注释。

## 注释格式

```php
enum OrganizationTypeEnum: string
{
    case Default = 'default';   // 默认
    case Country = 'country';   // 国家
    case Company = 'company';   // 公司
}
```

**格式要求：**

- 注释必须紧跟在 `case` 语句的 `;` 之后
- 使用 `//` 单行注释格式
- 注释内容为中文描述，用于说明该枚举值的含义
- 注释会被解析并用于生成数据库字段注释

## 特殊场景说明

以下枚举类**必须**遵循此注释规范，因为这些枚举类的注释会被用于生成数据库字段注释：

1. **OrganizationTypeEnum** - 组织架构类型
   - 用于 `gpa_organization.organization_type` 字段
   - 文件位置：`Modules/Base/app/Enums/OrganizationTypeEnum.php`

2. **AccountTypeEnum** - 账号类型
   - 用于 `gpa_role.account_type`、`gpa_menu.account_type` 等字段
   - 文件位置：`Modules/Base/app/Enums/AccountTypeEnum.php`

3. **HttpMethodEnum** - HTTP方法
   - 用于 `gpa_logs.http_method` 字段
   - 文件位置：`Modules/Base/app/Enums/HttpMethodEnum.php`

4. **BrowserEnum** - 浏览器名称
   - 用于 `gpa_logs.browser` 字段
   - 文件位置：`Modules/Base/app/Enums/BrowserEnum.php`

5. **OperatingSystemEnum** - 操作系统
   - 用于 `gpa_logs.operating_system` 字段
   - 文件位置：`Modules/Base/app/Enums/OperatingSystemEnum.php`

6. **DeviceTypeEnum** - 设备类型
   - 用于 `gpa_logs.device_type` 字段
   - 文件位置：`Modules/Base/app/Enums/DeviceTypeEnum.php`

7. **SmsTypeEnum** - 短信类型
   - 用于 `sms_logs.sms_type` 字段
   - 文件位置：`Modules/Sms/app/Enums/SmsTypeEnum.php`

8. **VerificationMethodEnum** - 认证方式
   - 用于 `gpa_account_profile.verification_method` 字段
   - 文件位置：`Modules/Base/app/Enums/VerificationMethodEnum.php`

## 注意事项

⚠️ **重要提示：**

1. **不要轻易删除注释**：这些注释是数据库字段注释的源数据，删除后会导致数据库字段注释丢失或不完整。

2. **新增枚举值必须添加注释**：在以上枚举类中新增 `case` 时，必须同时添加对应的中文注释。

3. **注释格式必须正确**：注释必须严格按照 `case Name = 'value'; // 中文描述` 的格式，否则 `getEnumComment()` 函数无法正确解析。

4. **注释用于数据库字段**：这些注释最终会通过 `buildEnumComment()` 函数生成类似 `组织架构类型[default:默认,country:国家,company:公司]` 的数据库字段注释。

5. **解析函数位置**：注释解析函数位于 `Modules/Base/app/Funcs/FuncHelper.php` 中的 `getEnumComment()` 和 `buildEnumComment()` 函数。

## 枚举类转换为数组

`enumToArrayFromComment()` 函数可以将枚举类转换为数组格式，方便在前端或其他场景中使用。

**函数签名：**

```php
function enumToArrayFromComment(string|UnitEnum $enumClass): array
```

**参数说明：**

- `$enumClass`: 枚举类名或枚举类实例

**返回值：**

返回格式为 `[['key' => 'enum_value', 'value' => 'comment']]` 的数组

**使用示例：**

```php
// 使用枚举类名
$result = enumToArrayFromComment(OrganizationTypeEnum::class);
// 结果：
// [
//     ['key' => 'default', 'value' => '默认'],
//     ['key' => 'country', 'value' => '国家'],
//     ['key' => 'company', 'value' => '公司'],
//     ['key' => 'branch', 'value' => '分公司'],
//     ['key' => 'bu', 'value' => '事业部']
// ]

// 或使用枚举实例
$result = enumToArrayFromComment(OrganizationTypeEnum::Default);
```

**注意事项：**

- 函数会自动识别 BackedEnum 和 Pure Enum
- 如果枚举值没有注释，则使用枚举名称作为 `value`
- 函数位置：`Modules/Base/app/Funcs/FuncHelper.php`

## 不需要注释的枚举类

以下枚举类**不需要**添加行内注释，因为它们的枚举值本身就是中文描述：

- `OperationActionEnum` - 操作类型（枚举值本身就是中文）
- `LogActionEnum` - 日志操作类型（枚举值本身就是中文）
- `ResourceTypeEnum` - 资源类型（枚举值本身就是中文）
- `DictionaryCategoryEnum` - 字典类别（枚举值本身就是中文）

## 相关文档

- [枚举类注解注释规范](./enum-annotation.md) - 使用 PHP 8 Attribute 注解为枚举添加描述信息
