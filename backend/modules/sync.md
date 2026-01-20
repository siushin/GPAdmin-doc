# 模块自动同步

GPAdmin 提供了模块数据自动同步机制，确保 `gpa_modules` 表始终与本地模块文件保持一致。即使没有安装应用市场管理模块（AppMarket），Base 模块也能自动管理所有模块数据。

## 同步机制

系统提供两种同步方式，互为补充：

| 方式 | 触发时机 | 说明 |
|------|---------|------|
| **启动时同步** | HTTP 请求时 | 使用缓存控制频率，每 5 分钟检查一次 |
| **定时任务同步** | Cron 调度 | 每 5 分钟执行一次，作为兜底保障 |

## 工作流程

```
┌─────────────────────────────────────────────────────────────┐
│                    模块自动同步方案                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌──────────────────────────────────┐   │
│  │ HTTP 请求    │───▶│ syncModulesOnBoot()              │   │
│  └─────────────┘    │ • 检查缓存时间戳                    │   │
│                     │ • 超过 5 分钟则执行同步              │   │
│                     │ • 不阻塞请求（异常静默处理）          │   │
│                     └──────────────────────────────────┘   │
│                                                             │
│  ┌─────────────┐    ┌──────────────────────────────────┐   │
│  │ Cron 定时    │───▶│ gpa:sync-modules (每 5 分钟)     │   │
│  │ (Schedule)  │    │ • 定时任务兜底                     │   │
│  └─────────────┘    │ • withoutOverlapping 防重复       │   │
│                     │ • 输出日志到 storage/logs/         │   │
│                     └──────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Artisan 命令

### 同步所有模块

```bash
php artisan gpa:sync-modules
```

### 同步指定模块

```bash
php artisan gpa:sync-modules --path=Sms
```

### 命令输出示例

```bash
开始扫描模块...

✅ 成功同步 4 个模块:
   - AppMarket (AppMarket)
   - Base (Base)
   - Oss (Oss)
   - Sms (Sms)

═══════════════════════════════════════════════════════════
  模块同步完成！
  成功: 4 个
  失败: 0 个
═══════════════════════════════════════════════════════════
```

## 定时任务配置

::: warning 重要
生产环境需要配置 Laravel 调度器，否则定时任务不会执行。
:::

在服务器的 Crontab 中添加以下配置：

```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

### 日志位置

定时任务的执行日志输出到：

```
storage/logs/modules-sync.log
```

## 同步原理

### 1. 扫描模块目录

系统会扫描 `Modules/` 目录下的所有子目录，查找 `module.json` 文件。

### 2. 解析模块配置

从 `module.json` 中读取以下信息：

- 模块名称 (`name`)
- 模块别名 (`alias`)
- 模块标题 (`title`)
- 模块描述 (`description`)
- 模块版本 (`extra.meta.module_version`)
- 模块状态 (`extra.meta.module_status`)
- 其他元信息...

### 3. 同步到数据库

将解析的模块信息同步到 `gpa_modules` 表：

- **已存在的模块**：更新模块信息
- **新增的模块**：插入新记录
- **使用 `module_name` 作为唯一标识**

## 核心代码

### BaseServiceProvider 中的自动同步

```php
/**
 * 启动时同步模块数据
 * 使用缓存控制扫描频率，避免每次请求都扫描影响性能
 */
protected function syncModulesOnBoot(): void
{
    // 只在非控制台命令时执行（避免影响 artisan 命令执行速度）
    if ($this->app->runningInConsole()) {
        return;
    }

    // 使用缓存控制扫描频率（每 5 分钟扫描一次）
    $cacheKey     = 'gpa_modules_sync_timestamp';
    $syncInterval = 300; // 5 分钟（秒）

    $lastSync = cache()->get($cacheKey, 0);

    if (time() - $lastSync >= $syncInterval) {
        try {
            // 更新缓存时间戳（先更新，防止并发请求重复执行）
            cache()->put($cacheKey, time(), $syncInterval * 2);

            // 执行模块扫描同步
            Module::scanAndUpdateModules();
        } catch (\Exception $e) {
            // 记录日志但不影响应用运行
            Log::warning('模块自动同步失败: ' . $e->getMessage());
        }
    }
}
```

### 定时任务注册

```php
protected function registerCommandSchedules(): void
{
    $this->app->booted(function () {
        $schedule = $this->app->make(Schedule::class);

        // 每 5 分钟同步一次模块数据（定时任务兜底）
        $schedule->command('gpa:sync-modules')
            ->everyFiveMinutes()
            ->withoutOverlapping()
            ->runInBackground()
            ->appendOutputTo(storage_path('logs/modules-sync.log'));
    });
}
```

## 注意事项

### 缓存驱动

确保生产环境配置了有效的缓存驱动（推荐使用 Redis），否则会使用文件缓存。

```env
CACHE_DRIVER=redis
```

### 性能考虑

- 启动时同步使用缓存控制，不会影响每次请求的性能
- 定时任务使用 `withoutOverlapping()` 防止重复执行
- 同步过程中的异常不会影响正常业务

### 手动强制同步

如果需要立即同步（不受缓存限制），可以：

1. 清除缓存后重新访问：
   ```bash
   php artisan cache:forget gpa_modules_sync_timestamp
   ```

2. 直接运行命令：
   ```bash
   php artisan gpa:sync-modules
   ```

## 相关文件

| 文件 | 说明 |
|------|------|
| `Modules/Base/app/Providers/BaseServiceProvider.php` | 启动时同步逻辑和定时任务注册 |
| `Modules/Base/app/Console/Commands/SyncModulesCommand.php` | Artisan 同步命令 |
| `Modules/Base/app/Models/Module.php` | 模块模型，包含 `scanAndUpdateModules()` 方法 |

