# Utils 工具类

工具类提供了常用的工具方法。

## 类列表

### Tree

树结构工具类，提供了将扁平数据转换为树形结构的功能，支持自定义父子关系字段。

## Tree 使用

`Tree` 工具类用于将扁平数据转换为树形结构，适用于菜单、组织架构等场景。

**类位置**：`Siushin\LaravelTool\Utils\Tree`

详细使用方法请参考 [生成树数据](/api/frequent-api/tree-data) 文档。

#### 基本用法

```php
use Siushin\LaravelTool\Utils\Tree;

// 创建 Tree 实例
// 参数1: 主键字段名
// 参数2: 父级ID字段名
// 参数3: 子节点字段名（可选，默认为 'children'）
// 参数4: 层级字段名（可选，默认为 'level'）
$tree = new Tree('id', 'parent_id');

// 获取树形结构
$treeData = $tree->getTree($data);
```

#### 在 Model 中使用

```php
use Siushin\LaravelTool\Utils\Tree;

class Organization extends Model
{
    /**
     * 获取组织架构（树状结构）
     */
    public static function getTreeData(array $params = []): array
    {
        // 构建查询条件
        $where = self::buildWhereData($params, [
            'organization_tid'  => '=',
            'organization_name' => 'like',
        ]);

        // 获取数据
        $data = self::query()
            ->where($where)
            ->get()
            ->toArray();

        // 转换为树形结构
        return (new Tree('organization_id', 'organization_pid'))->getTree($data);
    }
}
```

#### 自定义字段名

```php
// 使用自定义字段名
$tree = new Tree(
    'menu_id',      // 主键字段
    'parent_id',    // 父级ID字段
    'children',     // 子节点字段名
    'level'         // 层级字段名
);

$treeData = $tree->getTree($data);
```

#### 返回结果

树形结构数据会自动添加以下字段：

- `children` - 子节点数组
- `leaf` - 是否为叶子节点（`true` 表示没有子节点，`false` 表示有子节点）
- `level` - 节点层级（从 0 开始）

**示例：**

```php
[
    [
        'id' => 1,
        'name' => '父节点1',
        'parent_id' => 0,
        'level' => 0,
        'leaf' => false,
        'children' => [
            [
                'id' => 2,
                'name' => '子节点1-1',
                'parent_id' => 1,
                'level' => 1,
                'leaf' => true,
                'children' => [],
            ],
        ],
    ],
]
```

