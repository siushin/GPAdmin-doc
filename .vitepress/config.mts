import { defineConfig } from 'vitepress'

// 计算版权年份
const getCopyrightYear = () => {
  const currentYear = new Date().getFullYear();
  return currentYear === 2025 ? '2025' : `2025-${currentYear}`;
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GPAdmin开发手册",
  description: "基于 Ant Design Pro + Laravel 的开箱即用的企业级管理后台",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/images/pokemon.png',

    nav: [
      { text: '首页', link: '/' },
      { text: '前端开发', link: '/frontend/' },
      { text: '后端开发', link: '/backend/' },
      { text: 'API', link: '/api/' },
      { text: '部署运维', link: '/deploy/' },
      { text: 'FAQ', link: '/faq/' },
      { text: 'Issues', link: '/feedback/' }
    ],

    sidebar: {
      '/frontend/': [
        {
          text: '前端开发',
          items: [
            { text: '快速开始', link: '/frontend/' },
            { text: '项目结构', link: '/frontend/structure' },
            { text: '开发规范', link: '/frontend/standards' }
          ]
        },
        {
          text: '模块开发',
          items: [
            { text: '快速开始', link: '/frontend/modules/' }
          ]
        },
        {
          text: '公共组件',
          items: [
            { text: '快速开始', link: '/frontend/components/' },
            { text: '动态获取图标', link: '/frontend/components/icon' }
          ]
        }
      ],
      '/backend/': [
        {
          text: '后端开发',
          items: [
            { text: '快速开始', link: '/backend/' },
            { text: '项目结构', link: '/backend/structure' },
            {
              text: '开发规范',
              collapsed: false,
              items: [
                { text: '快速开始', link: '/backend/standards/' },
                { text: '命名规范', link: '/backend/standards/naming' },
                { text: '控制器规范', link: '/backend/standards/controller' },
                { text: '模型规范', link: '/backend/standards/model' },
                { text: 'API 规范', link: '/backend/standards/api' },
                {
                  text: '枚举注释规范',
                  collapsed: false,
                  items: [
                    { text: '枚举类注释规范', link: '/backend/standards/enum' },
                    { text: '枚举类注解注释规范', link: '/backend/standards/enum-annotation' }
                  ]
                },
                { text: '数据库规范', link: '/backend/standards/database' }
              ]
            }
          ]
        },
        {
          text: '模块开发',
          items: [
            { text: '快速开始', link: '/backend/modules/' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API',
          items: [
            { text: '快速开始', link: '/api/' },
            { text: 'API 文档', link: '/api/documentation' },
            { text: '接口规范', link: '/api/standards' }
          ]
        },
        {
          text: '公共依赖包',
          collapsed: false,
          items: [
            {
              text: 'laravel-tool',
              collapsed: false,
              items: [
                { text: '快速开始', link: '/api/dependencies/laravel-tool/' },
                { text: '属性类', link: '/api/dependencies/laravel-tool/attributes' },
                { text: '模型转换', link: '/api/dependencies/laravel-tool/cases' },
                { text: '枚举类', link: '/api/dependencies/laravel-tool/enums' },
                { text: '助手函数', link: '/api/dependencies/laravel-tool/funcs' },
                { text: '特征类', link: '/api/dependencies/laravel-tool/traits' },
                { text: '工具类', link: '/api/dependencies/laravel-tool/utils' }
              ]
            },
            {
              text: 'php-util',
              collapsed: false,
              items: [
                { text: '快速开始', link: '/api/dependencies/php-util/' },
                { text: '助手函数', link: '/api/dependencies/php-util/funcs' },
                { text: '特征类', link: '/api/dependencies/php-util/traits' },
                { text: '工具类', link: '/api/dependencies/php-util/utils' }
              ]
            }
          ]
        },
        {
          text: '官方模块',
          collapsed: false,
          items: [
            {
              text: 'Base: 基础服务',
              collapsed: false,
              items: [
                { text: '快速开始', link: '/api/modules/base/' },
                {
                  text: 'API',
                  collapsed: false,
                  items: [
                    { text: '组织架构', link: '/api/modules/base/api/organization' }
                  ]
                }
              ]
            },
            {
              text: 'SMS: 短信服务',
              collapsed: false,
              items: [
                { text: '快速开始', link: '/api/modules/sms/' }
              ]
            }
          ]
        }
      ],
      '/deploy/': [
        {
          text: '部署运维',
          items: [
            { text: '快速开始', link: '/deploy/' },
            { text: '环境配置', link: '/deploy/environment' },
            { text: '部署流程', link: '/deploy/process' },
            { text: 'Git 提交规范', link: '/deploy/git' }
          ]
        }
      ],
      '/faq/': [
        {
          text: 'FAQ',
          items: [
            { text: '常见问题', link: '/faq/' }
          ]
        }
      ],
      '/feedback/': [
        {
          text: 'Issues',
          items: [
            { text: '意见反馈', link: '/feedback/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/siushin/GPAdmin' }
    ],

    footer: {
      message: `Copyright © ${getCopyrightYear()} <a href="https://gpadmin.siushin.com" target="_blank">GPAdmin</a>. All rights reserved.`
    }
  },

  vite: {
    server: {
      host: true, // 允许外部访问
      allowedHosts: true, // 允许所有域名
    }
  }
})
