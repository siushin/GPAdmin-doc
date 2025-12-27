# 生成树数据（带缩进字符）

除了标准的树形结构数据外，GPAdmin 还提供了带缩进字符的树形数据生成方案，适用于下拉选择器、表格显示等需要扁平化展示树形结构的场景。

## 使用 TreeHtmlFormatter 工具类

项目提供了 `TreeHtmlFormatter` 工具类用于将树形结构数据转换为带缩进字符的扁平数据。

**类位置**：`Siushin\Util\Utils\TreeHtmlFormatter`

### 基本用法

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
];

// 创建 TreeHtmlFormatter 实例
$formatter = new TreeHtmlFormatter([
    'id_field'       => 'id',           // 主键字段名
    'output_id'      => 'id',           // 输出数据中的ID字段名（通常与id_field相同）
    'title_field'    => 'name',         // 标题字段名
    'children_field' => 'children',     // 子节点字段名
    'output_title'   => 'name',         // 输出数据中的标题字段名（会添加缩进字符）
    'fields'         => ['id', 'name'], // 要输出的字段列表（可选，默认输出所有字段）
]);

// 格式化数据
$flatData = $formatter->format($treeData);
```

**返回结果：**

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
        'name' => '├─ └─ 子节点1-2'
    ],
    [
        'id' => 4,
        'name' => '├─ 父节点2'
    ],
]
```

### 缩进字符说明

- `├─`：表示有兄弟节点的节点
- `└─`：表示最后一个子节点

缩进字符会根据层级自动添加，例如：

- 第一层：`├─ 节点名称`
- 第二层：`├─ └─ 节点名称`
- 第三层：`├─ └─ └─ 节点名称`

## 在 Controller 中使用

### 示例：组织架构树形HTML数据

在 `OrganizationController` 中实现带缩进字符的树形数据接口：

```php
use Siushin\Util\Utils\TreeHtmlFormatter;

class OrganizationController extends Controller
{
    /**
     * 获取组织架构树状Html数据
     * tips：按层级使用占位符 ├─、└─ 缩进
     * @return JsonResponse
     */
    public function getFullTreeDataForHtml(): JsonResponse
    {
        $params = trimParam(request()->all());

        // 获取树形数据
        $treeData = Organization::getTreeData($params);

        // 如果没有数据，返回空数组
        if (empty($treeData)) {
            return success();
        }

        // 使用 TreeHtmlFormatter 格式化数据
        $formatter = new TreeHtmlFormatter([
            'id_field'       => 'organization_id',
            'output_id'      => 'organization_id',
            'title_field'    => 'organization_name',
            'children_field' => 'children',
            'output_title'   => 'organization_name',
            'fields'         => ['organization_id', 'organization_name'], // 只返回指定字段
        ]);

        $htmlData = $formatter->format($treeData);

        return success($htmlData);
    }
}
```

### 配置参数说明

`TreeHtmlFormatter` 构造函数接受的配置参数：

| 参数 | 类型 | 说明 |
|------|------|------|
| `id_field` | `string` | 树形数据中的主键字段名 |
| `output_id` | `string` | 输出数据中的ID字段名（通常与 id_field 相同） |
| `title_field` | `string` | 树形数据中的标题字段名 |
| `children_field` | `string` | 子节点字段名（默认为 'children'） |
| `output_title` | `string` | 输出数据中的标题字段名（会在该字段的值前添加缩进字符） |
| `fields` | `array` | 要输出的字段列表（可选，如果指定则只返回这些字段） |

## 使用场景

### 1. 下拉选择器

带缩进字符的树形数据非常适合在下拉选择器中展示层级关系：

```php
// 获取带缩进的组织架构数据
$organizations = $this->getFullTreeDataForHtml();

// 前端可以直接使用
// <Select>
//   {organizations.map(item => (
//     <Option key={item.organization_id} value={item.organization_id}>
//       {item.organization_name}
//     </Option>
//   ))}
// </Select>
```

### 2. 表格展示

在表格中展示层级关系：

```php
// 表格列定义
$columns = [
    ['title' => '组织架构', 'dataIndex' => 'organization_name'],
    // ... 其他列
];

// 数据已经包含缩进字符，直接显示即可
```

### 3. 列表展示

在列表页面展示层级关系：

```php
// 列表数据
$list = [
    ['organization_id' => 1, 'organization_name' => '├─ 总公司'],
    ['organization_id' => 2, 'organization_name' => '├─ └─ 技术部'],
    ['organization_id' => 3, 'organization_name' => '├─ └─ └─ 前端组'],
];
```

## 完整示例

### 后端接口实现

```php
namespace Modules\Base\Http\Controllers;

use Siushin\Util\Utils\TreeHtmlFormatter;
use Modules\Base\Models\Organization;

class OrganizationController extends Controller
{
    /**
     * 获取组织架构树形HTML数据
     * @return JsonResponse
     */
    public function getFullTreeDataForHtml(): JsonResponse
    {
        $params = trimParam(request()->all());

        // 1. 获取标准树形数据
        $treeData = Organization::getTreeData($params);

        if (empty($treeData)) {
            return success([]);
        }

        // 2. 使用 TreeHtmlFormatter 转换为带缩进字符的扁平数据
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

### 前端使用示例

```typescript
import { request } from '@umijs/max';
import { Select } from 'antd';

// 获取带缩进的组织架构数据
export async function getOrganizationTreeForSelect(params: {
  organization_tid: number;
}) {
  return request('/api/admin/organization/getFullTreeDataForHtml', {
    method: 'POST',
    data: params,
  });
}

// 在组件中使用
const OrganizationSelect: React.FC = () => {
  const [options, setOptions] = useState<Array<{label: string, value: number}>>([]);

  useEffect(() => {
    getOrganizationTreeForSelect({ organization_tid: 1 }).then((res) => {
      if (res.code === 200) {
        setOptions(
          res.data.map((item: any) => ({
            label: item.organization_name,
            value: item.organization_id,
          }))
        );
      }
    });
  }, []);

  return <Select options={options} />;
};
```

## 与标准树形数据的对比

### 标准树形数据（Tree::getTree()）

**优点：**

- 保持完整的层级结构
- 适合树形组件展示
- 便于递归处理

**缺点：**

- 不适合下拉选择器等扁平展示场景
- 前端需要额外处理才能展示层级

### 带缩进字符的树形数据（TreeHtmlFormatter::format()）

**优点：**

- 扁平化结构，适合下拉选择器、表格等场景
- 视觉上清晰展示层级关系
- 前端使用简单

**缺点：**

- 丢失了树形结构的嵌套关系
- 不适合需要递归处理的场景

## 注意事项

1. **必须先获取树形数据**：`TreeHtmlFormatter` 需要先通过 `Tree::getTree()` 获取标准树形数据，然后才能格式化。

2. **字段配置要正确**：确保 `id_field`、`title_field`、`children_field` 等配置与树形数据的字段名一致。

3. **output_title 字段会被修改**：`TreeHtmlFormatter` 会在 `output_title` 指定的字段值前添加缩进字符，原始值会被修改。

4. **fields 参数控制输出**：如果指定了 `fields` 参数，只会返回这些字段；如果不指定，会返回所有字段（除了 children）。

5. **性能考虑**：格式化过程会遍历整个树形结构，对于大型树结构，建议考虑缓存机制。

## 相关文档

- [生成树数据](./tree-data.md) - 标准树形数据生成方案
