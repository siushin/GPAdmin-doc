# Cases 模型转换

Cases 目录提供了模型数据转换的功能。

## 类列表

### Json

JSON 转换类，用于将模型数据转换为 JSON 格式，支持自定义转换规则。

## Json 使用

`Json` 是一个 Laravel Eloquent 模型属性转换类，用于自动将 JSON 字符串与数组之间进行转换。

**类位置**：`Siushin\LaravelTool\Cases\Json`

#### 基本用法

在模型中使用 `Json` 转换类：

```php
use Siushin\LaravelTool\Cases\Json;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $casts = [
        'settings' => Json::class,
        'metadata' => Json::class,
    ];
}
```

#### 使用示例

```php
// 存储数据时，数组会自动转换为 JSON 字符串
$user = new User();
$user->settings = ['theme' => 'dark', 'language' => 'zh-CN'];
$user->save();
// 数据库中存储为: {"theme":"dark","language":"zh-CN"}

// 读取数据时，JSON 字符串会自动转换为数组
$user = User::find(1);
echo $user->settings['theme']; // 'dark'
echo $user->settings['language']; // 'zh-CN'
```

#### 处理 null 值

`Json` 转换类会自动处理 `null` 值：

```php
// 如果数据库中的值为 null，读取时也会返回 null
$user = User::find(1);
$user->settings = null;
$user->save();

$user = User::find(1);
var_dump($user->settings); // null
```

#### 与 Laravel 原生 JSON 转换的区别

Laravel 原生的 `json` 转换类型功能类似，但 `Json` 转换类使用 `JSON_UNESCAPED_UNICODE` 选项，确保中文字符不会被转义：

```php
// Laravel 原生 json 转换
protected $casts = [
    'settings' => 'json', // 中文字符可能被转义为 \uXXXX
];

// Json 转换类
protected $casts = [
    'settings' => Json::class, // 中文字符保持原样
];
```

