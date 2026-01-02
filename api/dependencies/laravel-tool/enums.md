# Enums 枚举类

枚举类提供了常用的枚举类型定义。

## 类列表

### GenderTypeEnum

性别类型枚举，定义了性别相关的枚举值。

### UploadFileTypeEnum

上传文件类型枚举，定义了支持的文件类型。

### RequestSourceEnum

请求来源枚举，定义了请求的来源类型。

### SocialTypeEnum

社交类型枚举，定义了社交平台相关的类型。

## GenderTypeEnum 使用

性别类型枚举，定义了常用的性别选项。

**类位置**：`Siushin\LaravelTool\Enums\GenderTypeEnum`

#### 枚举值

```php
enum GenderTypeEnum: string
{
    case male    = '男';
    case female  = '女';
    case secrecy = '保密';
}
```

#### 使用示例

```php
use Siushin\LaravelTool\Enums\GenderTypeEnum;

// 获取枚举值
$gender = GenderTypeEnum::male->value; // '男'

// 获取所有枚举值
$allGenders = array_map(fn($case) => $case->value, GenderTypeEnum::cases());
// ['男', '女', '保密']

// 在模型中使用
$user->gender = GenderTypeEnum::male->value;
```

## RequestSourceEnum 使用

请求来源枚举，用于标识请求的来源渠道。

**类位置**：`Siushin\LaravelTool\Enums\RequestSourceEnum`

#### 使用示例

```php
use Siushin\LaravelTool\Enums\RequestSourceEnum;

// 获取所有请求来源
$validSources = array_map(fn($case) => $case->value, RequestSourceEnum::cases());

// 验证请求来源
if (in_array($source, $validSources)) {
    // 处理请求
}
```

## SocialTypeEnum 使用

社交类型枚举，用于标识社交平台类型。

**类位置**：`Siushin\LaravelTool\Enums\SocialTypeEnum`

#### 使用示例

```php
use Siushin\LaravelTool\Enums\SocialTypeEnum;

// 在查询中使用
$account = Account::where('social_type', SocialTypeEnum::Phone->value)->first();

// 在创建记录时使用
Account::create([
    'social_type' => SocialTypeEnum::Phone->value,
    // ... 其他字段
]);
```

## UploadFileTypeEnum 使用

上传文件类型枚举，定义了支持的文件类型。

**类位置**：`Siushin\LaravelTool\Enums\UploadFileTypeEnum`

#### 使用示例

```php
use Siushin\LaravelTool\Enums\UploadFileTypeEnum;

// 验证文件类型
$fileType = UploadFileTypeEnum::Image->value;
if ($uploadedFile->getMimeType() === $fileType) {
    // 处理图片上传
}
```

