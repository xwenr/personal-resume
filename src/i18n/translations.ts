/**
 * Central translation dictionary — Chinese (default) & English.
 *
 * Add new strings by first adding them to `zh`, then TypeScript will
 * enforce the exact same shape on `en` (and any future locale).
 */

export const zh = {
  nav: {
    profile: '简介',
    experience: '经历',
    works: '作品',
    contact: '联系',
    cta: '开启合作',
  },
  langSwitch: {
    label: '语言',
    zhShort: '中',
    enShort: 'EN',
    tooltip: '切换语言',
  },
  hero: {
    available: '正在寻求 2026 秋招机会',
    titleWords: ['产品经理', '&', 'AIGC 探索者'] as string[],
    description:
      '游走在应用统计与 AIGC 产品之间 —— 用数据的严谨思考产品决策，用产品的温度设计用户体验。',
    viewPortfolio: '查看作品',
    sayHello: '打个招呼',
    studioName: '辛咏春 · 个人作品集',
    est: '重庆 · 2026',
    scroll: '向下滚动 ↓',
  },
  profile: {
    eyebrow: '01 — 简介',
    titlePrefix: '以数据为底色的',
    titleEmphasis: '产品思考者。',
    description:
      '在应用统计、AIGC 产品与温润的用户体验之间寻找连接 —— 对细节保持好奇，对决策保持严谨。',
    education: {
      eyebrow: '教育背景',
      title: '应用统计（硕士）· 重庆大学',
      subtitle:
        '985 / 双一流 · 数学与统计学院 · 2025.09 – 2027.06 \n金融数学（本科）· 西南财经大学 · GPA 88 · 专业前 25%',
    },
    skills: {
      eyebrow: '核心技能',
      title: '一套面向现代产品工作的 全栈工具箱。',
      footnote: '· 每日应用于产品落地与研究分析',
      items: [
        '产品设计 · PRD / 原型',
        'AIGC 工作流',
        'Python · Pandas / NumPy',
        'Scikit-learn · 机器学习',
        'SQL · 数据库设计',
        'Tableau & Power BI',
        'Excel · 数据透视 / VLOOKUP',
        'Figma · Axure · 墨刀 · Pixso',
        '跨部门沟通协调',
        '英语 CET-6 · 584',
      ],
    },
    awards: {
      eyebrow: '竞赛与荣誉',
      items: [
        {
          year: '2024',
          title: '全国大学生统计建模大赛',
          rank: '省级二等奖',
        },
        {
          year: '2023',
          title: '全国大学生数学建模竞赛',
          rank: '省级二等奖',
        },
        {
          year: '2022',
          title: '西南财经大学学业奖学金',
          rank: '校级',
        },
        {
          year: '2022',
          title: '西南财经大学科研创新奖学金',
          rank: '校级',
        },
      ],
    },
    current: {
      eyebrow: '正在进行',
      content:
        '在海马云科技探索 AIGC 模型的产品化路径 —— 统筹 50+ 视频 / 图像 / 语音生成模型的全生命周期，设计让智能感自然流淌的 API 计费与配置界面。',
      stats: {
        modelsLabel: '接入模型',
        modelsValue: '50+',
        internshipsLabel: '实习经历',
        internshipsValue: '4',
        sqlLabel: 'SQL 脚本',
        sqlValue: '400+',
      },
    },
  },
  experience: {
    eyebrow: '02 — 实习经历',
    titlePrefix: '四段实习，',
    titleEmphasis: '一条清晰轨迹',
    titleSuffix: '。',
    description:
      '从数据风控到产品落地，再到 AIGC 模型运营 —— 每一段都在回答同一个问题：数据如何变成真正有用的产品体验。',
    items: [
      {
        id: 'haima-cloud',
        company: '安徽海马云科技股份有限公司',
        role: 'AIGC 产品实习生',
        period: '2026.02 – 至今',
        location: '重庆',
        narrative:
          '统筹 50+ 个 AIGC 模型 API（视频 / 图像 / 语音生成）的全生命周期运营，独立完成 API 计费管理系统的 PRD 设计，覆盖 227 个定价规则与双币种自动化。',
        highlights: [
          '平均模型上线周期控制在 1 周内，保障前端可用性 100%',
          '搭建 WaveSpeed、MiniMax 等厂商竞品监测体系',
          '独立输出计费系统 PRD：数据模型、接口规范、批量导入导出',
        ],
      },
      {
        id: 'xianxiang',
        company: '重庆先享智能科技有限公司',
        role: '数据产品助理',
        period: '2025.11 – 2026.01',
        location: '重庆',
        narrative:
          '负责 SaaS 平台律函管理、增值服务等模块的需求调研与原型设计，主导小程序端轻量化产品迁移，推进个人流水风控报告的版本迭代。',
        highlights: [
          '建立销售 / 运营 / 客户三方需求收集机制与优先级台账',
          '推进账单接收 → 解析 → 打标签 → 结构化输出的完整链路',
          '参与租机违约预测、权益用户分群等风控模型的数据设计',
        ],
      },
      {
        id: 'jiqizhixin',
        company: '机器之心（北京）科技有限公司',
        role: '市场调研分析实习生',
        period: '2024.11 – 2025.03',
        location: '北京',
        narrative:
          '追踪多模态大模型、智能体、具身智能等 AI 方向动态，输出 20+ 篇动态追踪周报（单篇 20,000 余字），并参与构建 AI 信息服务数据库。',
        highlights: [
          '输出 20+ 篇深度周报，单篇 20,000 余字',
          '基于技术报告与测评撰写产业深度解读稿',
          '参与 AI 公司数据库框架设计与字段录入',
        ],
      },
      {
        id: 'feishu-shennuo',
        company: '飞书深诺数字科技（上海）股份有限公司',
        role: '风控策略实习生',
        period: '2024.07 – 2024.10',
        location: '上海',
        narrative:
          '实施客户信用额度监控与风险评估，基于 SQL 提取媒体合规数据构建日常监控报表，参与客户分级与风险预警模型的迭代。',
        highlights: [
          '识别超额使用风险并协调商务介入，保障资金安全',
          '搭建媒体合规日常监控报表，推动管控落地',
          '结合业务变化迭代风控模型逻辑与效能',
        ],
      },
    ],
  },
  works: {
    eyebrow: '03 — 项目作品',
    titlePrefix: '动手做出来的',
    titleEmphasis: '那些作品。',
    description:
      '实习中独立落地的产品产出，和课余钻研的完整项目 —— 用代码、数据与原型，回应真实场景的问题。',
    scrollHint: '向右滚动查看 →',
    worksCountSuffix: '个项目',
    items: [
      {
        title: '电商平台管理数据库系统',
        subtitle:
          '基于 SQL Server 独立完成电商平台数据库设计与实现，覆盖用户、商品、订单、营销、售后等核心模块。',
        tag: '独立项目',
        meta: '2025.10 · SQL Server · Streamlit',
        accent: 'from-amber-300/40 to-orange-200/20',
      },
      {
        title: 'AIGC 模型计费管理系统',
        subtitle:
          '独立输出覆盖 227 个定价规则的 PRD（数据模型、接口规范、批量导入导出），支撑平台双币种商业化运营。',
        tag: '产品设计',
        meta: '2026 · PRD · 数据模型',
        accent: 'from-stone-300/50 to-neutral-200/20',
      },
      {
        title: '个人流水风控报告',
        subtitle:
          '推动账单接收、解析、识别、字段映射、打标签、结构化输出的完整链路迭代，支撑初创阶段产品快速演进。',
        tag: '数据产品',
        meta: '2025–2026 · SQL · Python',
        accent: 'from-lime-300/35 to-amber-200/20',
      },
      {
        title: 'AI 动态追踪周报',
        subtitle:
          '面向多模态大模型、智能体、具身智能等方向，输出 20+ 篇动态追踪周报与深度解读稿，单篇两万余字。',
        tag: '市场分析',
        meta: '2024–2025 · 行业研究',
        accent: 'from-rose-300/40 to-amber-200/20',
      },
      {
        title: '媒体合规监控看板',
        subtitle:
          '基于 SQL 提取媒体合规数据，构建日常监控报表，识别高违规客户并推动管控措施落地。',
        tag: '风控策略',
        meta: '2024 · SQL · 报表',
        accent: 'from-orange-200/45 to-yellow-100/20',
      },
      {
        title: '更多作品正在孵化',
        subtitle:
          '正在沉淀更多侧项目与开源作品 —— 关于 AIGC 交互、数据可视化与产品原型实验。',
        tag: 'Coming Soon',
        meta: '2026 · 持续更新',
        accent: 'from-stone-400/35 to-stone-200/20',
      },
    ],
  },
  contact: {
    eyebrow: '04 — 联系方式',
    titleWords: ['让我们', '一起', '构建吧。'] as string[],
    description:
      '正在寻求 2026 秋招产品经理 / 数据产品相关机会；也欢迎关于 AIGC、研究与产品体验的任何交流。',
    downloadResume: '下载简历',
    sendEmail: '发送邮件',
    resumeFile: '/resume-zh.pdf',
    email: '1715786877@qq.com',
    phone: '+86 133-0646-0748',
    phoneLabel: '电话',
    emailLabel: '邮箱',
    copyright: '© 2026 辛咏春',
    craftedWith: '用心打造',
    social: {
      phone: '电话',
      email: '邮箱',
      resume: '简历',
    },
  },
} as const

type Translations = typeof zh

export const en: Translations = {
  nav: {
    profile: 'Profile',
    experience: 'Experience',
    works: 'Works',
    contact: 'Contact',
    cta: 'Get in touch',
  },
  langSwitch: {
    label: 'Language',
    zhShort: '中',
    enShort: 'EN',
    tooltip: 'Switch language',
  },
  hero: {
    available: 'Available for 2026 New-Grad roles',
    titleWords: ['Product', '&', 'AIGC Explorer'],
    description:
      'Working at the intersection of applied statistics and AIGC products — where the rigour of data meets the warmth of thoughtful product design.',
    viewPortfolio: 'View Portfolio',
    sayHello: 'Say hello',
    studioName: 'Xin Yongchun · Portfolio',
    est: 'Chongqing · 2026',
    scroll: 'Scroll ↓',
  },
  profile: {
    eyebrow: '01 — Profile',
    titlePrefix: 'A data-minded',
    titleEmphasis: 'product thinker.',
    description:
      'Building at the intersection of applied statistics, AIGC and thoughtful user experience — curious about the details, rigorous about the decisions.',
    education: {
      eyebrow: 'Education',
      title: 'M.S. Applied Statistics · Chongqing University',
      subtitle:
        '985 / Double First-Class · School of Mathematics & Statistics · 2025.09 – 2027.06 \nB.S. Financial Mathematics · SWUFE · GPA 88 · Top 25%',
    },
    skills: {
      eyebrow: 'Core Skills',
      title: 'A polyglot toolkit for modern product work.',
      footnote: '· Applied daily in shipping product & research',
      items: [
        'Product Design · PRD / Prototyping',
        'AIGC Workflow',
        'Python · Pandas / NumPy',
        'Scikit-learn · Machine Learning',
        'SQL · Database Design',
        'Tableau & Power BI',
        'Excel · Pivot / VLOOKUP',
        'Figma · Axure · MockingBot · Pixso',
        'Cross-functional Collaboration',
        'English CET-6 · 584',
      ],
    },
    awards: {
      eyebrow: 'Competitions & Honours',
      items: [
        {
          year: '2024',
          title: 'National Statistical Modelling Contest',
          rank: 'Provincial Second Prize',
        },
        {
          year: '2023',
          title: 'National Mathematical Modelling Contest',
          rank: 'Provincial Second Prize',
        },
        {
          year: '2022',
          title: 'SWUFE Academic Scholarship',
          rank: 'University Level',
        },
        {
          year: '2022',
          title: 'SWUFE Research & Innovation Scholarship',
          rank: 'University Level',
        },
      ],
    },
    current: {
      eyebrow: 'Currently',
      content:
        'Exploring product paths for AIGC models at Haima Cloud — coordinating 50+ video / image / voice generation model APIs, and designing billing & configuration surfaces that feel quietly intelligent.',
      stats: {
        modelsLabel: 'AIGC Models',
        modelsValue: '50+',
        internshipsLabel: 'Internships',
        internshipsValue: '4',
        sqlLabel: 'SQL Scripts',
        sqlValue: '400+',
      },
    },
  },
  experience: {
    eyebrow: '02 — Experience',
    titlePrefix: 'Four internships,',
    titleEmphasis: 'one clear trajectory',
    titleSuffix: '.',
    description:
      'From risk-control analytics, to data-product delivery, to AIGC model operations — each step answers the same question: how does data turn into useful product experience.',
    items: [
      {
        id: 'haima-cloud',
        company: 'Haima Cloud Technology',
        role: 'AIGC Product Intern',
        period: '2026.02 – Now',
        location: 'Chongqing',
        narrative:
          'Orchestrate the full lifecycle of 50+ AIGC model APIs (video / image / voice generation) and independently deliver the billing-management PRD covering 227 pricing rules with dual-currency automation.',
        highlights: [
          'Avg. new-model onboarding cycle kept within 1 week, 100% front-end availability',
          'Built a competitor-watch system tracking WaveSpeed, MiniMax and more',
          'Delivered end-to-end PRD: data model, API spec, batch import / export',
        ],
      },
      {
        id: 'xianxiang',
        company: 'Xianxiang Intelligent Technology',
        role: 'Data Product Assistant',
        period: '2025.11 – 2026.01',
        location: 'Chongqing',
        narrative:
          'Led requirement research and prototyping for letter-management and value-added modules of the SaaS platform; drove the mini-program migration and iterated the personal transaction risk report product.',
        highlights: [
          'Set up a tri-party (sales / ops / customer) requirement-intake and priority log',
          'Shipped the bill-ingest → parse → tag → structured-output pipeline',
          'Contributed to default-prediction and user-segmentation risk models',
        ],
      },
      {
        id: 'jiqizhixin',
        company: 'Jiqizhixin (Synced)',
        role: 'Market Research Intern',
        period: '2024.11 – 2025.03',
        location: 'Beijing',
        narrative:
          'Tracked AI frontiers (multimodal LLMs, agents, embodied AI), published 20+ weekly bulletins (~20,000 chars each) and contributed to the AI information-service database.',
        highlights: [
          'Published 20+ in-depth weekly bulletins (~20k chars each)',
          'Authored deep-dive analyses blending technical reports & evaluations',
          'Shaped schema and data entry for the AI-company database',
        ],
      },
      {
        id: 'feishu-shennuo',
        company: 'Feishu Shennuo Digital Tech',
        role: 'Risk Strategy Intern',
        period: '2024.07 – 2024.10',
        location: 'Shanghai',
        narrative:
          'Monitored customer credit lines and risk exposure; built SQL-driven compliance reports and iterated customer-tiering and early-warning models.',
        highlights: [
          'Spotted over-limit usage and co-ordinated BD to safeguard funds',
          'Built daily media-compliance dashboards to drive control actions',
          'Iterated risk models in step with evolving business logic',
        ],
      },
    ],
  },
  works: {
    eyebrow: '03 — Selected Works',
    titlePrefix: 'Things',
    titleEmphasis: 'actually built.',
    description:
      'Solo projects and internship deliverables — shipping code, data and prototypes in response to real-world questions.',
    scrollHint: 'Scroll to reveal →',
    worksCountSuffix: 'projects',
    items: [
      {
        title: 'E-commerce Admin Database System',
        subtitle:
          'A solo project on SQL Server: full database design & implementation covering users, products, orders, marketing and after-sales.',
        tag: 'Solo Project',
        meta: '2025.10 · SQL Server · Streamlit',
        accent: 'from-amber-300/40 to-orange-200/20',
      },
      {
        title: 'AIGC Billing Management System',
        subtitle:
          'Wrote the end-to-end PRD covering 227 pricing rules (data model, API spec, batch import / export) for dual-currency monetisation.',
        tag: 'Product Design',
        meta: '2026 · PRD · Data Model',
        accent: 'from-stone-300/50 to-neutral-200/20',
      },
      {
        title: 'Personal Transaction Risk Report',
        subtitle:
          'Iterated the bill-ingest → parse → tag → structured-output pipeline, supporting rapid product evolution at an early-stage startup.',
        tag: 'Data Product',
        meta: '2025–2026 · SQL · Python',
        accent: 'from-lime-300/35 to-amber-200/20',
      },
      {
        title: 'AI Weekly Intelligence Reports',
        subtitle:
          '20+ weekly bulletins and long-form analyses on multimodal LLMs, agents and embodied AI — each around 20,000 characters.',
        tag: 'Market Research',
        meta: '2024–2025 · Industry Research',
        accent: 'from-rose-300/40 to-amber-200/20',
      },
      {
        title: 'Media Compliance Dashboard',
        subtitle:
          'SQL-backed daily compliance monitoring — flagging high-risk advertisers and driving control measures into the media-buying flow.',
        tag: 'Risk Strategy',
        meta: '2024 · SQL · Reporting',
        accent: 'from-orange-200/45 to-yellow-100/20',
      },
      {
        title: 'More Works Incubating',
        subtitle:
          'Side-projects and open-source work taking shape — AIGC interactions, data viz and product prototyping experiments.',
        tag: 'Coming Soon',
        meta: '2026 · Ongoing',
        accent: 'from-stone-400/35 to-stone-200/20',
      },
    ],
  },
  contact: {
    eyebrow: '04 — Contact',
    titleWords: ["Let's", 'Build', 'Together.'],
    description:
      'Open to 2026 new-grad roles in product management and data products, and to thoughtful conversations about AIGC, research and product craft.',
    downloadResume: 'Download Resume',
    sendEmail: 'Send an Email',
    resumeFile: '/resume-en.pdf',
    email: '1715786877@qq.com',
    phone: '+86 133-0646-0748',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    copyright: '© 2026 Xin Yongchun',
    craftedWith: 'Crafted with care',
    social: {
      phone: 'Phone',
      email: 'Email',
      resume: 'Resume',
    },
  },
}

export const translations = { zh, en } as const

export type Locale = keyof typeof translations
