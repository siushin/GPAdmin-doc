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
            { text: '概述', link: '/frontend/' },
            { text: '快速开始', link: '/frontend/getting-started' },
            { text: '项目结构', link: '/frontend/structure' },
            { text: '开发规范', link: '/frontend/standards' }
          ]
        },
        {
          text: '模块开发',
          items: [
            { text: '概述', link: '/frontend/modules/' }
          ]
        },
        {
          text: '公共组件',
          items: [
            { text: '概述', link: '/frontend/components/' },
            { text: '动态获取图标', link: '/frontend/components/动态获取图标' }
          ]
        }
      ],
      '/backend/': [
        {
          text: '后端开发',
          items: [
            { text: '概述', link: '/backend/' },
            { text: '快速开始', link: '/backend/getting-started' },
            { text: '项目结构', link: '/backend/structure' },
            {
              text: '开发规范',
              collapsed: false,
              items: [
                { text: '概述', link: '/backend/standards/' },
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
                { text: '数据库规范', link: '/backend/standards/database' },
                { text: 'Git 提交规范', link: '/backend/standards/git' }
              ]
            }
          ]
        },
        {
          text: '模块开发',
          items: [
            { text: '概述', link: '/backend/modules/' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API',
          items: [
            { text: '概述', link: '/api/' },
            { text: 'API 文档', link: '/api/documentation' },
            { text: '接口规范', link: '/api/standards' }
          ]
        },
        {
          text: '公共API',
          collapsed: false,
          items: [
            { text: '生成树数据', link: '/api/common-api/tree-data' },
            { text: '生成树数据（带缩进字符）', link: '/api/common-api/tree-data-indent' },
            { text: '组织架构', link: '/api/common-api/organization' }
          ]
        },
        {
          text: '公共函数',
          collapsed: false,
          items: [
            { text: 'LaravelTool', link: '/api/common-api/laravel-tool' },
            { text: 'PHP Util', link: '/api/common-api/php-util' }
          ]
        }
      ],
      '/deploy/': [
        {
          text: '部署运维',
          items: [
            { text: '概述', link: '/deploy/' },
            { text: '环境配置', link: '/deploy/environment' },
            { text: '部署流程', link: '/deploy/process' }
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
