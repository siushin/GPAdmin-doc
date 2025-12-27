# PHP Util

PHP Util 是一个 PHP 工具包，提供了常用的工具类和特征。

**包位置**：`siushin/php-util`

## Traits

### ParamTool

**位置**：`Siushin\Util\Traits\ParamTool`

**方法：**

- `checkEmptyParam()` - 检查参数是否为空

## Utils

### TreeHtmlFormatter

**位置**：`Siushin\Util\Utils\TreeHtmlFormatter`

**方法：**

- `format()` - 将树形结构数据转换为带缩进字符的扁平数据

## 全局函数

### generateId()

**位置**：全局函数

**作用：** 生成唯一ID

### trimParam()

**位置**：全局函数

**作用：** 去除参数中的前后空格

### user_get_fields_array()

**位置**：全局函数

**作用：** 从参数数组中获取指定字段

### compareDbDataDiff()

**位置**：全局函数

**作用：** 对比数据库数据差异，用于新增、更新、删除操作

