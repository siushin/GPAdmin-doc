# 生成树数据

GPAdmin 提供了通用的树形数据生成方案，适用于菜单、组织架构等需要树形结构的场景。

## 使用 Tree 工具类

项目提供了 `Tree` 工具类用于将扁平数据转换为树形结构。

**类位置**：`Siushin\LaravelTool\Utils\Tree`

### 基本用法

```php
use Siushin\LaravelTool\Utils\Tree;

// 假设有以下数据
$data = [
    ['id' => 1, 'name' => '父节点1', 'parent_id' => 0],
    ['id' => 2, 'name' => '子节点1-1', 'parent_id' => 1],
    ['id' => 3, 'name' => '子节点1-2', 'parent_id' => 1],
    ['id' => 4, 'name' => '父节点2', 'parent_id' => 0],
];

// 创建 Tree 实例
// 参数1: 主键字段名
// 参数2: 父级ID字段名
$tree = new Tree('id', 'parent_id');

// 获取树形结构
$treeData = $tree->getTree($data);
```

**返回结果：**

```php
[
    [
        'id' => 1,
        'name' => '父节点1',
        'parent_id' => 0,
        'children' => [
            [
                'id' => 2,
                'name' => '子节点1-1',
                'parent_id' => 1,
            ],
            [
                'id' => 3,
                'name' => '子节点1-2',
                'parent_id' => 1,
            ],
        ],
    ],
    [
        'id' => 4,
        'name' => '父节点2',
        'parent_id' => 0,
    ],
]
```

## 在 Model 中使用

### 示例：组织架构树形数据

在 `Organization` 模型中实现树形数据获取：

```php
use Siushin\LaravelTool\Utils\Tree;

class Organization extends Model
{
    /**
     * 获取组织架构（树状结构）
     * @param array $params
     * @return array
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

### 示例：菜单树形数据

在 `Menu` 模型中实现菜单树形数据获取：

```php
class Menu extends Model
{
    /**
     * 获取菜单树形结构
     * @param array $params
     * @return array
     */
    public static function getTreeData(array $params = []): array
    {
        $query = self::query();
        
        // 可选的条件筛选
        if (isset($params['account_type'])) {
            $query->where('account_type', $params['account_type']);
        }

        $menus = $query
            ->orderBy('sort', 'asc')
            ->orderBy('menu_id', 'asc')
            ->get()
            ->toArray();

        // 使用自定义方法构建树形结构（可以自定义 children 字段名和数据结构）
        return self::buildMenuTree($menus);
    }

    /**
     * 构建菜单树形结构
     * @param array $menus
     * @param int   $parentId
     * @return array
     */
    private static function buildMenuTree(array $menus, int $parentId = 0): array
    {
        $tree = [];

        foreach ($menus as $menu) {
            if ($menu['parent_id'] == $parentId) {
                $menuItem = [
                    'menu_id'     => $menu['menu_id'],
                    'menu_name'   => $menu['menu_name'],
                    'menu_key'    => $menu['menu_key'],
                    'menu_path'   => $menu['menu_path'],
                    // ... 其他字段
                ];

                // 递归获取子菜单
                $children = self::buildMenuTree($menus, $menu['menu_id']);
                if (!empty($children)) {
                    $menuItem['children'] = $children;
                }

                $tree[] = $menuItem;
            }
        }

        return $tree;
    }
}
```

## 在 Controller 中使用

### 示例：组织架构接口

```php
class OrganizationController extends Controller
{
    /**
     * 获取组织架构（树状结构）
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $params = trimParam(request()->all());
        $treeData = Organization::getTreeData($params);
        return success($treeData);
    }
}
```

## 自定义树形结构

如果需要自定义树形结构（如字段名、数据结构等），可以使用自定义的递归方法，参考 `Menu` 模型的 `buildMenuTree` 方法。

### 关键点

1. **主键字段**：用于唯一标识每个节点
2. **父级ID字段**：用于标识节点的父级关系，通常顶级节点的父级ID为 `0`
3. **children 字段**：子节点数组，可以根据需要自定义字段名
4. **排序**：在获取数据时使用 `orderBy` 确保树形结构的顺序

## 注意事项

1. **数据必须包含主键和父级ID字段**：Tree 工具类依赖这两个字段来构建树形结构

2. **父级ID为 0 表示顶级节点**：这是约定，确保数据中顶级节点的父级ID为 `0`

3. **性能考虑**：如果数据量很大，建议在数据库层面进行优化，或者使用缓存机制

4. **循环引用检查**：Tree 工具类内部已经处理了循环引用的情况，但在数据设计时应避免出现循环引用

5. **空数据处理**：如果查询结果为空，应该返回空数组 `[]` 而不是 `null`

