# Utils 工具类

工具类提供了常用的工具方法。

## 类列表

### TreeHtmlFormatter

树结构 HTML 格式化工具类，提供了将树形数据格式化为 HTML 结构的功能。

## TreeHtmlFormatter 使用

`TreeHtmlFormatter` 用于将树形结构数据转换为带缩进字符的扁平数据，适用于下拉选择器、表格显示等场景。

**类位置**：`Siushin\Util\Utils\TreeHtmlFormatter`

详细使用方法请参考 [生成树数据（带缩进字符）](/api/frequent-api/tree-data-indent) 文档。

#### 基本用法

```php
use Siushin\Util\Utils\TreeHtmlFormatter;

// 假设已有树形结构数据（通过 Tree::getTree() 获得）
$treeData = [
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
        ],
    ],
];

// 创建 TreeHtmlFormatter 实例
$formatter = new TreeHtmlFormatter([
    'id_field'       => 'id',
    'output_id'      => 'id',
    'title_field'    => 'name',
    'children_field' => 'children',
    'output_title'   => 'name',
    'fields'         => ['id', 'name'],
]);

// 格式化数据
$flatData = $formatter->format($treeData);
```

#### 配置参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `id_field` | `string` | 树形数据中的主键字段名 |
| `output_id` | `string` | 输出数据中的ID字段名（通常与 id_field 相同） |
| `title_field` | `string` | 树形数据中的标题字段名 |
| `children_field` | `string` | 子节点字段名（默认为 'children'） |
| `output_title` | `string` | 输出数据中的标题字段名（会添加缩进字符） |
| `fields` | `array` | 要输出的字段列表（可选，默认输出所有字段） |
| `indent_prefix` | `string` | 缩进前缀（默认为 '│  '） |
| `branch_middle` | `string` | 中间分支符号（默认为 '├─ '） |
| `branch_last` | `string` | 最后分支符号（默认为 '└─ '） |

#### 在 Controller 中使用

```php
use Siushin\Util\Utils\TreeHtmlFormatter;

class OrganizationController extends Controller
{
    /**
     * 获取组织架构树状Html数据
     */
    public function getFullTreeDataForHtml(): JsonResponse
    {
        $params = trimParam(request()->all());

        // 获取树形数据
        $treeData = Organization::getTreeData($params);

        if (empty($treeData)) {
            return success([]);
        }

        // 使用 TreeHtmlFormatter 格式化数据
        $formatter = new TreeHtmlFormatter([
            'id_field'       => 'organization_id',
            'output_id'      => 'organization_id',
            'title_field'    => 'organization_name',
            'children_field' => 'children',
            'output_title'   => 'organization_name',
            'fields'         => ['organization_id', 'organization_name'],
        ]);

        $htmlData = $formatter->format($treeData);

        return success($htmlData);
    }
}
```

#### 返回结果示例

```php
[
    [
        'id' => 1,
        'name' => '├─ 父节点1'
    ],
    [
        'id' => 2,
        'name' => '├─ └─ 子节点1-1'
    ],
    [
        'id' => 3,
        'name' => '├─ 父节点2'
    ],
]
```

#### 缩进字符说明

- `├─`：表示有兄弟节点的节点
- `└─`：表示最后一个子节点
- `│  `：表示层级连接线

缩进字符会根据层级自动添加，例如：

- 第一层：`├─ 节点名称`
- 第二层：`├─ └─ 节点名称`
- 第三层：`├─ └─ └─ 节点名称`

