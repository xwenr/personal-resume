/**
 * Central translation dictionary — Chinese (default) & English.
 *
 * Add new strings by first adding them to `zh`, then TypeScript will
 * enforce the exact same shape on `en` (and any future locale).
 */

export const zh = {
  nav: {
    brand: 'Xin Yongchun',
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
    titleWords: ['产品经理', '&', 'AIGC 探索者'],
    description:
      '游走在应用统计与 AIGC 产品之间 —— 用数据的严谨思考产品决策，用产品的温度设计用户体验。',
    viewPortfolio: '查看作品',
    sayHello: '打个招呼',
    studioName: '产品 · 数据 · AIGC',
    est: '2026',
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
      coursesLabel: '核心课程',
      honorsLabel: '荣誉',
      items: [
        {
          period: '2025.09 – 2027.06',
          location: '重庆',
          school: '重庆大学',
          badges: ['985', '双一流'],
          department: '数学与统计学院',
          degree: '硕士 · 应用统计',
          achievements: [],
          courses: [
            '高等统计学',
            '机器学习与数据挖掘',
            '数据库原理',
            '深度学习',
            '时间序列分析',
            '统计数据分析方法',
            '统计建模',
          ],
          honors: '',
        },
        {
          period: '2021.09 – 2025.06',
          location: '成都',
          school: '西南财经大学',
          badges: ['211', '双一流'],
          department: '数学学院',
          degree: '本科 · 金融数学',
          achievements: ['GPA 88', '专业前 25%'],
          courses: [
            '数学分析',
            '高等代数',
            '概率论与数理统计',
            '会计学',
            '投资学',
            '货币金融学',
            '数学建模',
            '计量经济学',
            '金融衍生品定价',
            '数据挖掘',
          ],
          honors:
            '2021 – 2024 年每学期均获学业奖学金，曾获科研创新奖学金、光华贡献奖学金等。',
        },
      ],
    },
    skills: {
      eyebrow: '核心技能',
      title: '一套面向现代产品工作的全栈工具箱。',
      footnote: '· 每日应用于产品落地与研究分析',
      coverSrc: '/photo/1.jpg',
      coverAlt: '技能板块配图',
      categories: [
        {
          name: '产品设计',
          tags: ['Axure', 'Figma', 'Vibe Coding', '需求分析', '原型输出'],
        },
        {
          name: '数据科学',
          tags: ['Python', 'Pandas', 'SQL', 'Scikit-learn', '数据库设计'],
        },
        {
          name: '数据分析',
          tags: ['Excel 透视表', 'Tableau', 'Power BI', '商业洞察'],
        },
        {
          name: '语言',
          tags: ['英语六级 (584)', '英文文献阅读'],
        },
      ],
    },
    awards: {
      eyebrow: '竞赛与荣誉',
      viewDetailLabel: '查看详情',
      items: [
        {
          year: '2024.04',
          title: '第四届美团商业分析精英大赛',
          rank: '卓越作品奖 · 全国前 50 强入围复赛',
          description:
            '作品《绿色引擎——新能源汽车销量增长的驱动解码与营销创新》：通过网络爬虫获取新能源车型配置、品牌影响力、区域经济与用户反馈等数据，利用多元线性回归、随机森林、LDA 主题建模与 K-means 聚类探究销量驱动因素，并引入大语言模型开发多功能数据分析与方案设计平台。负责组内统筹、报告框架撰写、材料收集与部分模型编写，以及 PPT、网页 UI 展示制作与演示视频录制。',
          link: '/awards/index.html?id=meituan',
        },
        {
          year: '2023.09',
          title: '高教社杯全国大学生数学建模竞赛',
          rank: '四川省二等奖',
          description:
            '作品《基于目标优化的蔬菜类商品自动定价与补货决策》：通过回归分析与目标优化求解分段定价与最优补货策略。参与问题分析与建模过程，全程负责论文撰写。',
          link: '/awards/index.html?id=cumcm',
        },
        {
          year: '2023.05',
          title: 'CFA Research Challenge · 南方航空公司研报',
          rank: '',
          description:
            '担任组长，负责财务分析部分的撰写与全英文报告整合、美化。围绕南方航空公司及其股票展开研究，涵盖财务分析、公司估值、投资逻辑与风险提醒。',
          link: '/awards/index.html?id=cfa',
        },
        {
          year: '2023.04',
          title: '全国大学生统计建模大赛',
          rank: '四川省二等奖',
          description:
            '论文《机会因素对低收入状态的影响分析》：使用多元 Probit 回归与 LightGBM 测算个体低收入状态概率，构造泰尔指数衡量机会不平等系数，并以基尼系数作对比分析。负责模型构建、实证部分编程，参与论文编写。',
          link: '/awards/index.html?id=statistics',
        },
        {
          year: '2023.04',
          title: '正大杯全国大学生市场调查与分析大赛',
          rank: '进入国奖评选',
          description:
            '针对果茶酒行业：综合 PEST、SWOT 分析行业与企业，使用 K-means 聚类与 Logistic 回归建模消费者行为，结合 4P 与 STP 策略给出营销建议。担任组长，负责分工协调、市场现状与营销策划部分撰写，以及报告整理与排版美化。',
          link: '/awards/index.html?id=zhengda',
        },
      ],
    },
  },
  experience: {
    eyebrow: '02 — 实习经历',
    titlePrefix: '五段实习，',
    titleEmphasis: '一条清晰轨迹',
    titleSuffix: '。',
    description:
      '从数据风控到产品落地，再到 AIGC 模型运营 —— 每一段都在回答同一个问题：数据如何变成真正有用的产品体验。',
    items: [
      {
        id: 'haima-cloud',
        company: '安徽海马云科技股份有限公司重庆分公司',
        role: 'AIGC 产品实习生',
        period: '2026.02 – 2026.05',
        location: '重庆',
        narrative:
          '作为 RunningHub 平台 API 产品线实习生，负责 AIGC 模型能力的商业化接入与计费体系构建。通过对 100+ 个跨模态模型（视频 / 图像 / 音频）的接入参数配置与全生命周期运营，独立设计并落地了包含 250+ 个定价规则的双币种自动化计费系统，支持平台 API 业务的商业化闭环。',
        highlights: [
          '功能模块设计：独立负责 API 专区公告系统设计及计费前端展示优化，提升信息传达与交易转化效率',
          '产品改版支持：深度参与快捷创作功能改版与平台计费系统合并需求，协同确保复杂逻辑的平滑迭代',
          '计费自动化提效：基于 Vibe Coding 搭建定价平台，实现 250+ 规则的双币种自动计算、存储与条件查询',
          '模型闭环运营：负责 100+ 模型接入排期、参数配置与样例调试，确保前端可用性 100% 且上线周期缩短至 1 周',
        ],
      },
      {
        id: 'xianxiang',
        company: '重庆先享智能科技有限公司',
        role: '数据产品助理',
        period: '2025.11 – 2026.01',
        location: '重庆',
        narrative:
          '作为数据产品助理，深度参与个人流水风控报告及配套增值服务的需求迭代，并负责产品从 Web 端向小程序端的轻量化迁移与功能同步。通过对流水识别字段扩展、报告可视化模块及律师函接口接入的设计，为 3C 租机及信贷公司提供数据洞察与决策支撑。',
        highlights: [
          '轻量化迁移：主导 SaaS 平台小程序化，实现移动端消息推送与触达',
          '全链路流程优化：参与迭代流水报告识别逻辑，覆盖解析至结构化输出全链路',
          '多维需求管理：建立多方需求评估机制，统一管理产品池并排布优先级',
          '风控模型应用：利用 SQL 提取数据特征，参与租机违约预测模型的设计优化',
        ],
      },
      {
        id: 'jiqizhixin',
        company: '机器之心（北京）科技有限公司',
        role: '市场调研分析实习生',
        period: '2024.11 – 2025.03',
        location: '北京',
        narrative:
          '作为市场调研分析实习生，深度参与 AI 前沿技术追踪与产业地图构建。通过对多模态大模型、具身智能等底层演进及全球厂商动态的深度拆解，输出 20+ 份产业情报周报并参与构建 AI 公司数据库，为区域产业规划与战略决策提供高质量的情报支持。',
        highlights: [
          '前沿技术追踪：产出 20+ 篇深度周报，覆盖多模态大模型 / 具身智能 / 智能体等领域技术演进',
          '产业数据治理：参与设计并维护 AI 公司画像数据库，为调研提供结构化支撑',
          '深度研报撰写：基于技术报告、公司背景、测评数据等资料输出多篇深度解读稿',
        ],
      },
      {
        id: 'feishu-shennuo',
        company: '飞书深诺数字科技（上海）股份有限公司',
        role: '风控策略实习生',
        period: '2024.07 – 2024.10',
        location: '上海',
        narrative:
          '作为风控策略实习生，深度参与跨境数字营销场景下的客户信用风险与合规管理。通过 SQL 提取 Meta / TikTok 等媒体合规数据构建自动化报表，并监控后付用户余额使用及回款情况，为公司在出海广告投放业务中的资金安全与链路合规提供量化决策支持。',
        highlights: [
          '媒体合规监控：利用 SQL 分析 Google / TikTok 数据，管控高危违约客户',
          '余额风险预警：监控后付用户信用额度，通过预警介入确保资金安全',
          '关联风险排查：分析客户间担保关联，识别潜在风险并完善风控体系',
          '策略模型迭代：参与定期优化客户分级模型讨论，提升风险识别精准度与有效性',
        ],
      },
      {
        id: 'jll',
        company: '仲量联行测量师事务所（JLL）成都分公司',
        role: '研究部实习生',
        period: '2024.02 – 2024.06',
        location: '成都',
        narrative:
          '作为研究部实习生，深度参与成都及西南地区工业物流地产的市场监测与研报编写。通过对宏观经济数据及物流地产数据的清洗与建模，产出季度研报与行业研报，提供量化支持与行业洞察。',
        highlights: [
          '行业数据建模：更新新能源车企财务数据、内外资制造企业国内建厂数据、电子信息产业链企业数据库，搭建行业规模分析框架',
          '空间量化分析：运用 ArcGIS 可视化产业链分布，优化物流地产监测',
          '中英研报编写：协助完成西部物流地产季报与新能源汽车、成都电子信息产业链行业研报撰写，负责报告数据可视化',
        ],
      },
    ],
  },
  about: {
    eyebrow: '02½ — 关于我',
    subtitle:
      '我是一名具备金融数学与应用统计复合背景的学生。通过五段涵盖 AIGC、SaaS 及风控领域的跨行业实习，我沉淀了扎实的业务抽象与需求拆解能力，也锻炼了跨团队沟通与协作能力。我具备极强的逻辑建模力与闭环思维，对数据敏感。我自学能力强，乐于探索新鲜事物，喜欢探索利用Vibe Coding落地产品巧思。身边人对我的评价是：靠谱，值得信赖，适应力强，能力强。',
    hobbiesLabel: '爱好',
    hobbies: ['打羽毛球', '读书', '看电影'],
    imageSrc: '/photo/2.jpg',
    imageAlt: '关于我 — 配图',
  },
  works: {
    eyebrow: '03 — 项目作品',
    titlePrefix: '动手做出来的',
    titleEmphasis: '那些作品。',
    description:
      '从 GitHub 同步的独立项目与课余研究 —— 用代码、数据与原型，回应真实场景的问题。',
    scrollHint: '向右滚动查看 →',
    worksCountSuffix: '个项目',
    viewRepo: '查看仓库',
    viewLive: '在线预览',
    viewDetail: '查看详情',
    updatedPrefix: '更新于',
    starsLabel: '星标',
    noneYet: '仓库资料同步中…',
  },
  contact: {
    eyebrow: '04 — 联系方式',
    titleWords: ['让我们', '一起', '构建吧。'],
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
}

type Translations = typeof zh

export const en: Translations = {
  nav: {
    brand: 'Xin Yongchun',
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
    studioName: 'Product · Data · AIGC',
    est: '2026',
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
      coursesLabel: 'Core courses',
      honorsLabel: 'Honours',
      items: [
        {
          period: '2025.09 – 2027.06',
          location: 'Chongqing',
          school: 'Chongqing University',
          badges: ['985', 'Double First-Class'],
          department: 'School of Mathematics & Statistics',
          degree: 'M.S. Applied Statistics',
          achievements: [],
          courses: [
            'Advanced Statistics',
            'Machine Learning & Data Mining',
            'Database Principles',
            'Deep Learning',
            'Time Series Analysis',
            'Statistical Data Analysis',
            'Statistical Modelling',
          ],
          honors: '',
        },
        {
          period: '2021.09 – 2025.06',
          location: 'Chengdu',
          school: 'SWUFE',
          badges: ['211', 'Double First-Class'],
          department: 'School of Mathematics',
          degree: 'B.S. Financial Mathematics',
          achievements: ['GPA 88', 'Top 25%'],
          courses: [
            'Mathematical Analysis',
            'Advanced Algebra',
            'Probability & Statistics',
            'Accounting',
            'Investments',
            'Monetary Finance',
            'Mathematical Modelling',
            'Econometrics',
            'Financial Derivatives Pricing',
            'Data Mining',
          ],
          honors:
            'Awarded the Academic Scholarship every semester from 2021 to 2024; also received the Research & Innovation Scholarship and the Guanghua Contribution Scholarship, among others.',
        },
      ],
    },
    skills: {
      eyebrow: 'Core Skills',
      title: 'A polyglot toolkit for modern product work.',
      footnote: '· Applied daily in shipping product & research',
      coverSrc: '/photo/1.jpg',
      coverAlt: 'Skills section cover image',
      categories: [
        {
          name: 'Product design',
          tags: [
            'Axure',
            'Figma',
            'Vibe Coding',
            'Requirements analysis',
            'Prototyping',
          ],
        },
        {
          name: 'Data science',
          tags: ['Python', 'Pandas', 'SQL', 'Scikit-learn', 'Database design'],
        },
        {
          name: 'Data analytics',
          tags: [
            'Excel pivot tables',
            'Tableau',
            'Power BI',
            'Business insight',
          ],
        },
        {
          name: 'Languages',
          tags: ['CET-6 (584)', 'English papers & docs'],
        },
      ],
    },
    awards: {
      eyebrow: 'Competitions & Honours',
      viewDetailLabel: 'View details',
      items: [
        {
          year: '2024.04',
          title: 'Meituan Business Analytics Elite Challenge · 4th Edition',
          rank: 'Distinguished Work Award · Top 50 Semi-finalist (National)',
          description:
            'Project “Green Engine — Decoding NEV Sales Drivers & Marketing Innovation”: scraped NEV configuration, brand influence, regional economy and user-feedback data; applied multiple linear regression, random forest, LDA topic modelling and K-means clustering to identify sales drivers; integrated a large language model to build a multi-purpose data-analysis and strategy-design platform. Led coordination, report outlining, research collection and partial modelling; delivered the PPT, web UI and presentation video.',
          link: '/awards/index.html?id=meituan',
        },
        {
          year: '2023.09',
          title:
            'National Undergraduate Mathematical Modelling Contest (Higher-Education Press Cup)',
          rank: 'Provincial Second Prize · Sichuan',
          description:
            'Project “Optimisation-Based Automated Pricing & Replenishment for Vegetables”: used regression analysis and goal optimisation to solve tiered pricing and optimal replenishment. Contributed to problem framing and modelling; owned the full paper write-up.',
          link: '/awards/index.html?id=cumcm',
        },
        {
          year: '2023.05',
          title: 'CFA Research Challenge · China Southern Airlines Equity Report',
          rank: '',
          description:
            'Served as team lead. Owned the financial-analysis section and the integration & polish of the full English report. Covered financial analysis, company valuation, investment logic and risk notes for China Southern Airlines and its listed stock.',
          link: '/awards/index.html?id=cfa',
        },
        {
          year: '2023.04',
          title: 'National Undergraduate Statistical Modelling Contest',
          rank: 'Provincial Second Prize · Sichuan',
          description:
            'Paper “Impact of Opportunity Factors on Low-Income Status”: estimated individual low-income probability via multivariate Probit regression and LightGBM; constructed a Theil index to quantify opportunity inequality and benchmarked against the Gini coefficient. Owned model construction and empirical programming; contributed to the paper write-up.',
          link: '/awards/index.html?id=statistics',
        },
        {
          year: '2023.04',
          title:
            'Zhengda Cup · National Market Research & Analytics Contest',
          rank: 'Shortlisted for National Award',
          description:
            'Focused on the fruit-wine industry: combined PEST and SWOT for industry & company analysis; applied K-means clustering and logistic regression to consumer behaviour; delivered marketing recommendations via 4P and STP frameworks. Served as team lead — owned task allocation, market-landscape and marketing-strategy sections, and the final report polish.',
          link: '/awards/index.html?id=zhengda',
        },
      ],
    },
  },
  experience: {
    eyebrow: '02 — Experience',
    titlePrefix: 'Five internships,',
    titleEmphasis: 'one clear trajectory',
    titleSuffix: '.',
    description:
      'From risk-control analytics, to data-product delivery, to AIGC model operations — each step answers the same question: how does data turn into useful product experience.',
    items: [
      {
        id: 'haima-cloud',
        company: 'Haima Cloud Technology (Chongqing)',
        role: 'AIGC Product Intern',
        period: '2026.02 – 2026.05',
        location: 'Chongqing',
        narrative:
          'Product intern on the RunningHub API product line, owning the commercialisation and billing architecture for AIGC model capabilities. Onboarded 100+ cross-modal models (video / image / audio) end-to-end and designed a dual-currency automated billing system covering 250+ pricing rules — powering the platform’s API monetisation loop.',
        highlights: [
          'Module Design: Independently led the API-zone announcement system and billing front-end polish, lifting clarity and conversion',
          'Product-Revamp Support: Deeply involved in the quick-creation revamp and billing-system merger, keeping complex logic smooth through iteration',
          'Billing Automation: Built a pricing platform with Vibe Coding to auto-compute, store and query 250+ rules across dual currencies',
          'Model Ops Loop: Managed onboarding, parameter configuration and sample debugging for 100+ models — 100% front-end availability, cycle cut to 1 week',
        ],
      },
      {
        id: 'xianxiang',
        company: 'Xianxiang Intelligent Technology',
        role: 'Data Product Assistant',
        period: '2025.11 – 2026.01',
        location: 'Chongqing',
        narrative:
          'Iterated the personal transaction risk report and its value-added services, and led the product’s lightweight migration from Web to WeChat mini-program. Shaped the design of transaction-field expansion, visualisation modules and the legal-letter interface — delivering insight and decision support to 3C rental and lending clients.',
        highlights: [
          'Lightweight Migration: Led the SaaS-to-mini-program migration, enabling mobile push and reach',
          'Pipeline Optimisation: Iterated the transaction-report recognition logic end-to-end, from parsing through structured output',
          'Requirement Triage: Built a multi-stakeholder intake mechanism, unifying the product pool and prioritisation',
          'Risk Modelling: Pulled features via SQL and contributed to the design of rental-default prediction models',
        ],
      },
      {
        id: 'jiqizhixin',
        company: 'Jiqizhixin (Synced)',
        role: 'Market Research Intern',
        period: '2024.11 – 2025.03',
        location: 'Beijing',
        narrative:
          'Tracked AI frontier technologies and built industry maps — covering multimodal LLMs, embodied AI and global vendor dynamics. Published 20+ weekly intelligence bulletins and contributed to the AI-company database, supplying high-signal intel for regional planning and strategy.',
        highlights: [
          'Frontier Tracking: Shipped 20+ in-depth weekly bulletins covering multimodal LLMs, embodied AI and agents',
          'Industry Data Governance: Designed and maintained an AI-company profile database for structured research',
          'Deep-Dive Authoring: Authored long-form analyses synthesising technical reports, company backgrounds and evaluations',
        ],
      },
      {
        id: 'feishu-shennuo',
        company: 'Feishu Shennuo Digital Tech',
        role: 'Risk Strategy Intern',
        period: '2024.07 – 2024.10',
        location: 'Shanghai',
        narrative:
          'Supported credit-risk and compliance management for cross-border digital marketing. Built SQL-driven compliance dashboards from Meta / TikTok data and monitored post-paid balance usage and repayments — underwriting fund safety and compliance for the company’s overseas ad-buy business.',
        highlights: [
          'Media Compliance Monitoring: Used SQL to analyse Google / TikTok data and contain high-risk advertisers',
          'Balance Alert: Monitored post-paid credit lines and intervened early to safeguard funds',
          'Guarantor-Chain Audit: Traced cross-client guarantee links, surfacing latent risk and tightening the control system',
          'Model Iteration: Joined regular reviews of the customer-tiering model, sharpening the precision of risk scoring',
        ],
      },
      {
        id: 'jll',
        company: 'Jones Lang LaSalle (JLL) · Chengdu',
        role: 'Research Intern',
        period: '2024.02 – 2024.06',
        location: 'Chengdu',
        narrative:
          'Covered the industrial & logistics real-estate market in Chengdu and Southwest China. Cleaned and modelled macro and logistics data, co-authoring quarterly and vertical reports that paired quantitative rigour with industry insight.',
        highlights: [
          'Industry Data Modelling: Maintained databases on EV-maker financials, domestic manufacturing footprints and the electronics-industry chain — framing industry-scale analysis',
          'Spatial Analytics: Visualised supply-chain distribution in ArcGIS to sharpen logistics real-estate monitoring',
          'Bilingual Reporting: Co-authored West-China logistics-real-estate quarterlies and vertical reports on EVs and Chengdu’s electronics chain, owning the data visualisations',
        ],
      },
    ],
  },
  about: {
    eyebrow: '02½ — About',
    subtitle:
      "I'm a student with a dual grounding in financial mathematics and applied statistics. Across five internships spanning AIGC, SaaS and risk control, I've built solid skills in business abstraction and requirements breakdown, and in communicating and collaborating across teams. I'm strong in logical modelling and end-to-end thinking, and I'm highly attuned to data. I learn fast, enjoy exploring new ideas, and like finding product touches through Vibe Coding. People around me say I'm dependable, trustworthy, adaptable and capable.",
    hobbiesLabel: 'Interests',
    hobbies: ['Badminton', 'Reading', 'Films'],
    imageSrc: '/photo/2.jpg',
    imageAlt: 'About — portrait',
  },
  works: {
    eyebrow: '03 — Selected Works',
    titlePrefix: 'Things',
    titleEmphasis: 'actually built.',
    description:
      'Solo projects pulled live from GitHub, alongside research work from university — shipping code, data and prototypes in response to real-world questions.',
    scrollHint: 'Scroll to reveal →',
    worksCountSuffix: 'projects',
    viewRepo: 'View repo',
    viewLive: 'Live demo',
    viewDetail: 'View details',
    updatedPrefix: 'Updated',
    starsLabel: 'Stars',
    noneYet: 'Syncing metadata…',
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

export const translations = { zh, en }

export type Locale = keyof typeof translations
