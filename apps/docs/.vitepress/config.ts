import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Galbi SDK",
  description: "pnpm",
  lang: 'ja',
  ignoreDeadLinks: true,

  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ['script', { src: 'https://platform.twitter.com/widgets.js' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap' }]
  ],
  locales: {
    root: {
      label: '日本語',
      lang: 'ja',
      head: [
        ["meta", { property: "og:title", content: "Galbi SDK" }],
        ["meta", { property: "og:image", content: "https://galbi-sdk-docs.pages.dev/ja/about.png" }],
        ["meta", { property: "og:site_name", content: "Galbi SDK" }],
        ["meta", { property: "og:description", content: "VRChatのワールドをウェブから複数人で作る仕組みです。" }],
        ["meta", { property: "twitter:card", content: "summary_large_image" }],
        ["meta", { property: "twitter:site", content: "@peraperavrc" }],
        ["meta", { property: "twitter:title", content: "Galbi SDK" }],
      ],
      themeConfig: {
        nav: [
          { text: 'ホーム', link: '/' },
          { text: '基本的な使い方', link: '/guide/getting-started' }
        ],
        sidebar: {
          '/guide/': [
            {
              text: '基本的な使い方',
              items: [
                { text: '概要', link: '/guide/getting-started' },
                { text: '開発環境の準備', link: '/guide/playcanvas-setup' },
                { text: 'ワールドの生成', link: '/guide/playcanvas-world-create' },
                { text: 'VRChatで読み込み', link: '/guide/vrchat-sync' },
                { text: 'オブジェクトを追加してみよう', link: '/guide/playcanvas-edit-object' },
              ]
            },
        
            {
              text: 'ワールド制作 Tips',
              items: [
                { text: 'テクスチャの設定 ※必須', link: '/guide/how-to-load-texture' },
                { text: 'Blenderからモデルをインポート', link: '/guide/how-to-add-original-models' },
                { text: '複数人での共同編集について', link: '/guide/how-to-add-collaborator' },
              ]
            },
    
            {
              text: '完成後',
              items: [
                { text: '3Dモデルのエクスポート', link: '/guide/how-to-upload-vrchat' },
              ]
            },
      
            {
              text: 'リンク集',
              items: [
              { text: 'リリースノート', link: '/guide/release-note' },
              { text: 'Discord', link: 'https://discord.gg/X8VcCVuXqW' },
              { text: 'Galbi SDK (プロジェクト)', link: 'https://playcanvas.com/project/1292374/' },
                { text: 'PlayCanvasドキュメント', link: 'https://developer.playcanvas.com/ja/user-manual/' },
              ]
            },
          ]
        },
        socialLinks: [
          { icon: 'discord', link: 'https://discord.gg/X8VcCVuXqW' }

          
        ],
    
      }
    },
    en: {
      label: 'English',
      lang: 'en', // optional, will be added  as `lang` attribute on `html` tag
      link: '/en/',
      title: "Galbi SDK",
      head: [
        ["meta", { property: "og:title", content: "Galbi SDK" }],
        ["meta", { property: "og:image", content: "https://galbi-sdk-docs.pages.dev/en/about.png" }],
        ["meta", { property: "og:site_name", content: "Galbi SDK" }],
        ["meta", { property: "og:description", content: "The easiest way to create a world with multiple people in VRChat." }],
        ["meta", { property: "twitter:card", content: "summary_large_image" }],
        ["meta", { property: "twitter:site", content: "@peraperavrc" }],
        ["meta", { property: "twitter:title", content: "Galbi SDK" }],
      ],
      description: "The easiest way to create a world with multiple people in VRChat.",
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Basic Usage', link: '/en/guide/getting-started' }
        ],
        sidebar: {
          '/en/guide/': [
            {
                text: 'Basic Usage',
              items: [
                { text: 'Overview', link: '/en/guide/getting-started' },
                { text: 'Prepare Development Environment', link: '/en/guide/playcanvas-setup' },
                { text: 'Create World', link: '/en/guide/playcanvas-world-create' },
                { text: 'Sync to VRChat', link: '/en/guide/vrchat-sync' },
                { text: 'Add Object', link: '/en/guide/playcanvas-edit-object' },
              ]
            },
        
            {
              text: 'World Creation Tips',
              items: [
                { text: 'Set Texture ※Required', link: '/en/guide/how-to-load-texture' },
                { text: 'Import Model from Blender', link: '/en/guide/how-to-add-original-models' },
                { text: 'Collaboration', link: '/en/guide/how-to-add-collaborator' },
              ]
            },
    
            {
              text: 'After Completion',
              items: [
                { text: 'Export 3D Model', link: '/en/guide/how-to-upload-vrchat' },
              ]
            },
      
            {
              text: 'Links',
              items: [
              { text: 'Release Note', link: '/en/guide/release-note' },
              { text: 'Discord', link: 'https://discord.gg/X8VcCVuXqW' },
              { text: 'Galbi SDK (Project)', link: 'https://playcanvas.com/project/1292374/' },
                { text: 'PlayCanvas Document', link: 'https://developer.playcanvas.com/ja/user-manual/' },
              ]
            },
          ]
        },
        socialLinks: [
          { icon: 'discord', link: 'https://discord.gg/X8VcCVuXqW' }
        ],
      }
    },
    ko: {
      label: '한국어',
      lang: 'ko',
      link: '/ko/',
      title: "Galbi SDK",
      head: [
        ["meta", { property: "og:title", content: "Galbi SDK" }],
        ["meta", { property: "og:image", content: "https://galbi-sdk-docs.pages.dev/ko/about.png" }],
        ["meta", { property: "og:site_name", content: "Galbi SDK" }],
        ["meta", { property: "og:description", content: "VRChat에서 여러 사람이 함께 월드를 만들 수 있는 웹 기반 도구" }],
        ["meta", { property: "twitter:card", content: "summary_large_image" }],
        ["meta", { property: "twitter:site", content: "@peraperavrc" }],
        ["meta", { property: "twitter:title", content: "Galbi SDK" }],
      ],
      description: "VRChat에서 여러 사람이 함께 월드를 만들 수 있는 웹 기반 도구",
      themeConfig: {
        nav: [
          { text: '홈', link: '/ko/' },
          { text: '기본 사용법', link: '/ko/guide/getting-started' }
        ],
        sidebar: {
          '/ko/guide/': [
            {
                text: '기본 사용법',
              items: [
                { text: '개요', link: '/ko/guide/getting-started' },
                { text: '개발 환경 준비', link: '/ko/guide/playcanvas-setup' },
                { text: '프로젝트 생성', link: '/ko/guide/playcanvas-world-create' },
                { text: 'VRChat에 동기화', link: '/ko/guide/vrchat-sync' },
                { text: '오브젝트 추가', link: '/ko/guide/playcanvas-edit-object' },
              ]
            },
        
            {
              text: '프로젝트 제작 팁',
              items: [
                { text: '텍스처 설정 ※필수', link: '/ko/guide/how-to-load-texture' },
                { text: 'Blender에서 모델 인ポ트', link: '/ko/guide/how-to-add-original-models' },
                { text: '협업', link: '/ko/guide/how-to-add-collaborator' },
              ]
            },
    
            {
              text: '완료 후',
              items: [
                { text: '3D 모델 내보내기', link: '/ko/guide/how-to-upload-vrchat' },
              ]
            },
      
            {
              text: 'Links',
              items: [
              { text: '릴리즈 노트', link: '/ko/guide/release-note' },
              { text: 'Discord', link: 'https://discord.gg/X8VcCVuXqW' },
              { text: 'Galbi SDK (Project)', link: 'https://playcanvas.com/project/1292374/' },
                { text: 'PlayCanvas Document', link: 'https://developer.playcanvas.com/ja/user-manual/' },
              ]
            },
          ]
        },
        socialLinks: [
          { icon: 'discord', link: 'https://discord.gg/X8VcCVuXqW' }
        ],
      }
    },
  }
}) 