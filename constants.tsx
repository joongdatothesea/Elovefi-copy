
import React from 'react';
import { AppState, MemoryCategory, PoolType, PackingItem, HealthProfile, CareerProfile, BucketListItem, WorkoutType, TrainingPlanDay } from './types';

export const DEFAULT_CINEMA_MOTTO = "To see the world, things dangerous to come to, to see behind walls, draw closer, to find each other, and to feel. That is the purpose of life.";

export const DEFAULT_PACKING_LIST: Omit<PackingItem, 'id'>[] = [
  { item: 'Clothes (衣服)', category: 'CLOTHES', owner: 'Elvin', checked: false },
  { item: 'Shaver (剃须刀)', category: 'TOILETRIES', owner: 'Elvin', checked: false },
  { item: 'Laptop (电脑)', category: 'TECH', owner: 'Elvin', checked: false },
  { item: 'Camera (相机)', category: 'TECH', owner: 'Elvin', checked: false },
  { item: 'Film Camera (胶片相机)', category: 'TECH', owner: 'Elvin', checked: false },
  { item: 'Polaroid (拍立得)', category: 'TECH', owner: 'Elvin', checked: false },
  { item: 'Passport', category: 'ESSENTIALS', owner: 'Elvin', checked: false },
  { item: 'Phone Charger', category: 'TECH', owner: 'Elvin', checked: false },
  { item: 'Clothes (衣服)', category: 'CLOTHES', owner: 'Fiona', checked: false },
  { item: 'Skincare', category: 'TOILETRIES', owner: 'Fiona', checked: false },
  { item: 'Makeup', category: 'TOILETRIES', owner: 'Fiona', checked: false },
  { item: 'Passport', category: 'ESSENTIALS', owner: 'Fiona', checked: false },
  { item: 'Phone Charger', category: 'TECH', owner: 'Fiona', checked: false },
  { item: 'Power Bank', category: 'TECH', owner: 'Fiona', checked: false },
];

const createEmptyMatrix = (): Record<number, TrainingPlanDay[]> => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const matrix: Record<number, TrainingPlanDay[]> = {};
  for (let w = 1; w <= 4; w++) {
    matrix[w] = days.map(d => ({ day: d, sessions: [] }));
  }
  return matrix;
};

const INITIAL_HEALTH_ELVIN: HealthProfile = {
  age: 30, height: 179, weight: 88, zodiac: '--',
  logs: [{ id: '1', date: '2025-01-05', rhr: 65, sleep: 7.5, stress: 4, weight: 88 }],
  workouts: [{ id: 'w1', date: '2025-12-10', type: 'Chest', duration: 30, intensity: 'Medium', calories: 250, startTime: '10:00', endTime: '10:30' }],
  meals: [],
  waterIntake: 0,
  mentalLogs: [],
  medicalProfile: { bloodType: 'A+', allergies: ['None'], chronicConditions: [], currentConditions: [], pastSurgeries: [], familyHistory: [] },
  medications: [], vaccines: [], healthChecks: [], labResults: [],
  dietProtocol: '16:8 ARCHITECTURE',
  trainingMatrix: createEmptyMatrix()
};

const INITIAL_HEALTH_FIONA: HealthProfile = {
  age: 25, height: 174, weight: 70, zodiac: '--',
  logs: [{ id: '1', date: '2025-01-05', rhr: 72, sleep: 8.2, stress: 3, weight: 70 }],
  workouts: [],
  meals: [],
  waterIntake: 0,
  mentalLogs: [],
  medicalProfile: { bloodType: 'B', allergies: ['None'], chronicConditions: [], currentConditions: [], pastSurgeries: [], familyHistory: [] },
  medications: [], vaccines: [], healthChecks: [], labResults: [],
  dietProtocol: '16:8 ARCHITECTURE',
  trainingMatrix: createEmptyMatrix()
};

const DEFAULT_CAREER_ELVIN: CareerProfile = {
  role: 'Production Supervisor',
  focus: 'Focusing on process optimization, automation, and mechanical design.',
  roadmap: [
    { id: 'r1', timeframe: 'NOW', title: 'Production Supervisor' },
    { id: 'r2', timeframe: '3 YEARS', title: 'Production Manager' },
    { id: 'r3', timeframe: '5 YEARS', title: 'General Manager' },
    { id: 'r4', timeframe: '10 YEARS', title: 'Retired ✌️' },
  ],
  strategicGoals: [
    { id: 'g1', title: 'Senior Operations Status', progress: 42, priority: 'High', details: [] }
  ],
  skills: [
    { id: 's1', name: 'Process Engineering', level: 4, category: 'Technical' },
    { id: 's2', name: 'Lean / 5S', level: 4, category: 'Technical' },
    { id: 's3', name: 'Data Analysis', level: 4, category: 'Technical' },
    { id: 's4', name: 'Communication', level: 3, category: 'Soft' },
    { id: 's5', name: 'Leadership', level: 5, category: 'Leadership' },
  ],
  learning: [
    { id: 'l1', title: 'Advanced Mechanical Simulation', status: 'In Progress', provider: 'Coursera' },
    { id: 'l2', title: 'Six Sigma Green Belt', status: 'Completed', provider: 'ASQ' },
  ],
  experience: [
    { id: 'e1', role: 'Production Supervisor', company: 'Global Tech Manufacturing', period: '2022 - Present', achievements: ['Increased line efficiency by 25% through AI-driven load balancing.', 'Managed a team of 40+ operators during peak expansion phase.'] },
    { id: 'e2', role: 'Junior Mechanical Engineer', company: 'BuildOps Solutions', period: '2019 - 2022', achievements: ['Designed modular housing components used in 12 state projects.', 'Reduced material waste by 15% using predictive analysis.'] },
  ],
  salaryHistory: [
    { id: 'sh1', year: '2023', amount: 85000 },
    { id: 'sh2', year: '2024', amount: 98000 },
    { id: 'sh3', year: '2025', amount: 120000 },
  ],
  opportunities: [
    { id: 'jo1', role: 'Ops Director', company: 'Apex Innovations', status: 'Wishlist', salary: '$160k' },
  ],
};

const DEFAULT_CAREER_FIONA: CareerProfile = {
  role: 'Interior Designer',
  focus: 'Specializing in high-end residential aesthetics and spatial psychology.',
  roadmap: [
    { id: 'r1', timeframe: 'NOW', title: 'Senior Designer' },
    { id: 'r2', timeframe: '3 YEARS', title: 'Design Associate' },
    { id: 'r3', timeframe: '5 YEARS', title: 'Design Partner' },
    { id: 'r4', timeframe: '10 YEARS', title: 'Independent Studio Owner' },
  ],
  strategicGoals: [
    { id: 'g1', title: 'Industry Accreditation', progress: 65, priority: 'High', details: [] }
  ],
  skills: [
    { id: 's1', name: 'Spatial Planning', level: 5, category: 'Technical' },
    { id: 's2', name: '3D Visualization', level: 5, category: 'Technical' },
    { id: 's3', name: 'Client Psychology', level: 4, category: 'Soft' },
  ],
  learning: [
    { id: 'l1', title: 'Sustainable Material Science', status: 'In Progress', provider: 'Design Lab' },
  ],
  experience: [
    { id: 'e1', role: 'Lead Interior Designer', company: 'Modern Living Studios', period: '2021 - Present', achievements: ['Delivered over 50 luxury residential projects across the APAC region.', 'Standardized vendor procurement reducing lead times by 30%.'] },
  ],
  salaryHistory: [
    { id: 'sh1', year: '2024', amount: 72000 },
    { id: 'sh2', year: '2025', amount: 92000 },
  ],
  opportunities: [],
};

const BUCKET_LIST: BucketListItem[] = [
  { id: 'l1', title: '下雨天在家煮火锅', category: MemoryCategory.Life, completed: false },
  { id: 'l2', title: '一起做饭', category: MemoryCategory.Life, completed: false },
  { id: 'l3', title: '一起逛超市', category: MemoryCategory.Life, completed: false },
  { id: 'l4', title: '逛家居店 / 宜家', category: MemoryCategory.Life, completed: false },
  { id: 'l5', title: '一起买宜家家具而不吵架', category: MemoryCategory.Life, completed: false },
  { id: 'l6', title: '在家情侣 SPA', category: MemoryCategory.Life, completed: false },
  { id: 'l7', title: '开家庭会议', category: MemoryCategory.Life, completed: false },
  { id: 'l8', title: '接小刘放学', category: MemoryCategory.Life, completed: false },
  { id: 'l9', title: '手机壁纸换成合照', category: MemoryCategory.Life, completed: false },
  { id: 'l10', title: '拍视频记录生活', category: MemoryCategory.Life, completed: false },
  { id: 'l11', title: '一起逛街', category: MemoryCategory.Life, completed: false },
  { id: 'l12', title: '野餐', category: MemoryCategory.Life, completed: false },
  { id: 'l13', title: '一起做年夜饭', category: MemoryCategory.Life, completed: false },
  { id: 'l14', title: '一起淋雨漫步', category: MemoryCategory.Life, completed: false },
  { id: 'l15', title: '一起骑自行车，闯过大街小巷', category: MemoryCategory.Life, completed: false },
  { id: 'm1', title: '每月过纪念日（3号）', category: MemoryCategory.Milestone, completed: false },
  { id: 'm2', title: '存款 10 万澳币', category: MemoryCategory.Milestone, completed: false },
  { id: 'm3', title: '一起存钱', category: MemoryCategory.Milestone, completed: false },
  { id: 'm4', title: '老郑拿下驾照', category: MemoryCategory.Milestone, completed: false },
  { id: 'm5', title: '一起买房前的稳定生活规划', category: MemoryCategory.Milestone, completed: false },
  { id: 'm6', title: '设计梦中的婚礼', category: MemoryCategory.Milestone, completed: false },
  { id: 'm7', title: '难忘的求婚', category: MemoryCategory.Milestone, completed: false },
  { id: 'm8', title: '蜜月旅行', category: MemoryCategory.Milestone, completed: false },
  { id: 'm9', title: '一起见家长', category: MemoryCategory.Milestone, completed: false },
  { id: 'm10', title: '定制恋爱协议', category: MemoryCategory.Milestone, completed: false },
  { id: 'm11', title: '给一年后的彼此写信', category: MemoryCategory.Milestone, completed: false },
  { id: 'r1', title: '买花', category: MemoryCategory.Romance, completed: false },
  { id: 'r2', title: '无论走到哪里，都给对方带礼物', category: MemoryCategory.Romance, completed: false },
  { id: 'r3', title: '在一起的时候每天亲对方、说爱你', category: MemoryCategory.Romance, completed: false },
  { id: 'r4', title: '穿情侣装', category: MemoryCategory.Romance, completed: false },
  { id: 'r5', title: '情侣纹身', category: MemoryCategory.Romance, completed: false },
  { id: 'r6', title: '买一对情侣戒指', category: MemoryCategory.Romance, completed: false },
  { id: 'r7', title: '做恋爱手账本', category: MemoryCategory.Romance, completed: false },
  { id: 'r8', title: '一起看烟花', category: MemoryCategory.Romance, completed: false },
  { id: 'r9', title: '一起喝得酩酊大醉', category: MemoryCategory.Romance, completed: false },
  { id: 'r10', title: '定期复盘，吐槽对方', category: MemoryCategory.Romance, completed: false },
  { id: 'r11', title: '角色互换一天', category: MemoryCategory.Romance, completed: false },
  { id: 'g1', title: '一起图书馆学习', category: MemoryCategory.Growth, completed: false },
  { id: 'g2', title: '一起学习一个新技能 / 特长', category: MemoryCategory.Growth, completed: false },
  { id: 'g3', title: '一起跑马拉松', category: MemoryCategory.Growth, completed: false },
  { id: 'g4', title: '一起减肥（15 斤）', category: MemoryCategory.Growth, completed: false },
  { id: 'g5', title: '教会老郑游泳', category: MemoryCategory.Growth, completed: false },
  { id: 'g6', title: '搞个小车', category: MemoryCategory.Growth, completed: false },
  { id: 'e1', title: '一起徒步', category: MemoryCategory.Experience, completed: false },
  { id: 'e2', title: '沙滩上晒太阳', category: MemoryCategory.Experience, completed: false },
  { id: 'e3', title: '爬山', category: MemoryCategory.Experience, completed: false },
  { id: 'e4', title: '一起爬山看日出', category: MemoryCategory.Experience, completed: false },
  { id: 'e5', title: '看日出', category: MemoryCategory.Experience, completed: false },
  { id: 'e6', title: '看日落', category: MemoryCategory.Experience, completed: false },
  { id: 'e7', title: '一起去动物园', category: MemoryCategory.Experience, completed: false },
  { id: 'e8', title: '一起泡温泉', category: MemoryCategory.Experience, completed: false },
  { id: 'e9', title: '一起参加别人的婚礼', category: MemoryCategory.Experience, completed: false },
  { id: 'e10', title: '一起去一次海底世界', category: MemoryCategory.Experience, completed: false },
  { id: 'e11', title: '一起看雪', category: MemoryCategory.Experience, completed: false },
  { id: 'e12', title: '一起捏泥巴做陶瓷', category: MemoryCategory.Experience, completed: false },
  { id: 'e13', title: '养一只狗', category: MemoryCategory.Experience, completed: false },
  { id: 'ent1', title: 'KTV', category: MemoryCategory.Entertainment, completed: false },
  { id: 'ent2', title: '酒吧小酌', category: MemoryCategory.Entertainment, completed: false },
  { id: 'ent3', title: '去电影院看电影', category: MemoryCategory.Entertainment, completed: false },
  { id: 'ent4', title: '一起看恐怖片', category: MemoryCategory.Entertainment, completed: false },
  { id: 'ent5', title: '看歌剧', category: MemoryCategory.Entertainment, completed: false },
  { id: 'ent6', title: '看画展', category: MemoryCategory.Entertainment, completed: false },
  { id: 'ent7', title: '一起去一次音乐节 / 演唱会', category: MemoryCategory.Entertainment, completed: false },
  { id: 'ent8', title: '一起看演唱会', category: MemoryCategory.Entertainment, completed: false },
  { id: 'ent9', title: '一起看 F1 赛车', category: MemoryCategory.Entertainment, completed: false },
  { id: 'ent10', title: '一起看陈奕迅演唱会', category: MemoryCategory.Entertainment, completed: false },
  { id: 'ent11', title: '一起坐摩天轮', category: MemoryCategory.Entertainment, completed: false },
  { id: 't1', title: '一起旅行', category: MemoryCategory.Travel, completed: false },
  { id: 't2', title: '一起无计划旅行', category: MemoryCategory.Travel, completed: false },
  { id: 't3', title: '说走就走的公路旅行', category: MemoryCategory.Travel, completed: false },
  { id: 't4', title: '一起坐飞机', category: MemoryCategory.Travel, completed: false },
  { id: 't5', title: '一起坐邮轮', category: MemoryCategory.Travel, completed: false },
  { id: 't6', title: '一起露营', category: MemoryCategory.Travel, completed: false },
  { id: 't7', title: '一起潜水', category: MemoryCategory.Travel, completed: false },
  { id: 't8', title: '一起滑冰 / 滑雪', category: MemoryCategory.Travel, completed: false },
  { id: 't9', title: '一起去看樱花', category: MemoryCategory.Travel, completed: false },
  { id: 't10', title: '一起去走朝盛之路', category: MemoryCategory.Travel, completed: false },
  { id: 't11', title: '一起做时光胶囊', category: MemoryCategory.Travel, completed: false },
  { id: 't12', title: '去冰岛拍婚纱照', category: MemoryCategory.Travel, completed: false },
  { id: 't13', title: '一起去冰岛', category: MemoryCategory.Travel, completed: false },
  { id: 't14', title: '一起到北欧看极光', category: MemoryCategory.Travel, completed: false },
  { id: 't15', title: '一起去日本', category: MemoryCategory.Travel, completed: false },
  { id: 't16', title: '去新加坡', category: MemoryCategory.Travel, completed: false },
  { id: 't17', title: '一起去对方老家葫芦岛旅行', category: MemoryCategory.Travel, completed: false },
  { id: 't18', title: '去新西兰', category: MemoryCategory.Travel, completed: false },
  { id: 't19', title: '去泰国', category: MemoryCategory.Travel, completed: false },
];

const DEFAULT_WORKOUT_TYPES: WorkoutType[] = [
  { id: 'wt1', label: 'Chest', category: 'strength', icon: 'Dumbbell', owner: 'Family' },
  { id: 'wt2', label: 'Back', category: 'strength', icon: 'Dumbbell', owner: 'Family' },
  { id: 'wt3', label: 'Shoulder', category: 'strength', icon: 'Dumbbell', owner: 'Family' },
  { id: 'wt4', label: 'Arms', category: 'strength', icon: 'Dumbbell', owner: 'Family' },
  { id: 'wt5', label: 'Legs/Glute', category: 'strength', icon: 'Dumbbell', owner: 'Family' },
  { id: 'wt6', label: 'Full Body', category: 'strength', icon: 'Dumbbell', owner: 'Family' },
  { id: 'wt7', label: 'Run', category: 'cardio', icon: 'Zap', owner: 'Family' },
  { id: 'wt8', label: 'Walk', category: 'cardio', icon: 'Zap', owner: 'Family' },
  { id: 'wt9', label: 'Cycle', category: 'cardio', icon: 'Zap', owner: 'Family' },
  { id: 'wt10', label: 'Yoga/Stretch', category: 'flex', icon: 'Wind', owner: 'Family' },
  { id: 'wt11', label: 'HIIT', category: 'special', icon: 'Zap', owner: 'Family' },
  { id: 'wt12', label: 'Sports', category: 'special', icon: 'Activity', owner: 'Family' },
];

export const INITIAL_STATE: AppState = {
  customLogo: undefined,
  memoriesBannerImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2000',
  cinemaEntries: [
    { id: 'c1', videoUrl: '', coverUrl: '', title: 'THE LATEST SEQUENCE', motto: DEFAULT_CINEMA_MOTTO }
  ],
  exhibitEntries: [
    { id: 'e1', coverUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2000', linkUrl: '', title: 'WINTER VOYAGE', caption: 'Capturing the silence of Hokkaido through a different lens.', date: 'JAN 2025', location: 'HOKKAIDO' },
    { id: 'e2', coverUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', linkUrl: '', title: 'DOMESTIC BLISS', caption: 'The soft morning light filtering through our Lane Cove sanctuary.', date: 'FEB 2025', location: 'SYDNEY' },
    { id: 'e3', coverUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1200', linkUrl: '', title: 'URBAN RHYTHMS', caption: 'Exploring the architectural geometry of our future hubs.', date: 'MAR 2025', location: 'MELBOURNE' }
  ],
  cinemaMotto: DEFAULT_CINEMA_MOTTO,
  memories: [
    { id: 'm1', title: '2026 Year in Review', date: '2026-12-31', category: MemoryCategory.Growth, description: 'OKRs Achieved: Fiona mental independence, Job in Sydney. Roadmap highlights: Move to Sydney, PR Grant.', tags: ['#2026', '#YearlyReview', '#Milestone'], images: [] },
    { id: 'm2', title: 'Winter Trip to Japan', date: '2026-01-05', category: MemoryCategory.Travel, description: 'Skiing in Hokkaido and exploring Tokyo. An unforgettable winter odyssey.', tags: ['#Japan', '#Snow', '#Together'], images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2000'], linkedTaskId: 'b1' }
  ],
  tasks: [
     { id: 't1', title: 'Fiona 买一个iPad笔', owner: 'Elvin', completed: false, category: 'Household' },
     { id: 't2', title: '带奥司他韦去日本', owner: 'Fiona', completed: true, category: 'Travel' },
     { id: 't3', title: '收日本行李', owner: 'Family', completed: true, category: 'Travel' }
  ],
  finances: [
    { id: 'f1', type: 'Income', owner: 'Elvin', category: 'Employment Income', amount: 4500, date: '2024-05-01', accountId: 'a1', description: 'Salary' },
    { id: 'f2', type: 'Expense', owner: 'Family', category: 'Food & Groceries', amount: 85.50, date: '2024-05-20', accountId: 'a1', description: 'Supermarket' },
  ],
  accounts: [
    { id: 'a1', name: 'Main Joint', owner: 'Family', balance: 5500, type: 'Bank' },
    { id: 'a2', name: 'Emergency Saver', owner: 'Family', balance: 35000, type: 'Saver' },
    { id: 'a3', name: 'Investment Hub', owner: 'Elvin', balance: 12000, type: 'Investment' },
    { id: 'a4', name: 'Cash Stash', owner: 'Family', balance: 1500, type: 'Cash' },
  ],
  fixedExpenses: [
    { id: 'fx1', title: 'Home Rent', amount: 2000, category: 'Living Essentials', owner: 'Family' },
    { id: 'fx2', title: 'Netflix', amount: 15.99, category: 'Travel & Entertainment', owner: 'Fiona' },
    { id: 'fx3', title: 'Utilities', amount: 350, category: 'Living Essentials', owner: 'Family' },
  ],
  budgets: [
    { category: 'Food & Groceries', period: 'Monthly', limit: 800, usedAmount: 85.50 },
    { category: 'Shopping & Lifestyle', period: 'Monthly', limit: 500, usedAmount: 0 },
  ],
  yearlyBudgetLimit: 60000,
  motivationMessage: "Building a life of shared dreams and boundless growth, one step at a time.",
  expenseCategories: [
    'Food & Groceries', 'Health & Insurance', 'Living Essentials', 
    'Love & Gifts', 'Personal Development', 'Shopping & Lifestyle', 
    'Transport', 'Travel & Entertainment', 'Work Related'
  ],
  incomeCategories: [
    'Employment Income', 'Side Income', 'Investment & Passive Income', 
    'One-off Income', 'Family & Transfers', 'Government Support'
  ],
  pools: [
    { id: 'Survival', name: 'Survival Pool', description: 'Core life maintenance. Covers rent, utilities, and basic food.', targetRule: 'Monthly Essential', targetAmount: 3500, isLocked: true },
    { id: 'Risk', name: 'Risk Pool', description: 'Emergency safety net. Only used for job loss or health crises.', targetRule: '9 Months Coverage', targetAmount: 45000, isLocked: true },
    { id: 'Goal', name: 'Goal Pool', description: 'Earmarked funds for property, travel, or education.', targetRule: 'Project Specific', targetAmount: 100000, isLocked: true },
    { id: 'Lifestyle', name: 'Lifestyle Pool', description: 'Pure spendable income for dining, hobbies, and joy.', targetRule: 'Free Cash', targetAmount: 2000, isLocked: false },
  ],
  poolMappings: [
    { accountId: 'a1', poolId: 'Survival', ratio: 1 },
    { accountId: 'a2', poolId: 'Risk', ratio: 1 },
    { accountId: 'a3', poolId: 'Goal', ratio: 1 },
    { accountId: 'a4', poolId: 'Lifestyle', ratio: 1 },
  ],
  roadmap: [],
  vision: [
    { id: 'v1', title: 'Global Mobility Architecture', horizon: '3-5 Years', description: 'Establishing residency & income streams in 3 key geographic hubs.', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1200' },
    { id: 'v2', title: 'Legacy Wealth Trust', horizon: '10+ Years', description: 'A multigenerational trust designed for family education & healthcare legacy.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200' }
  ],
  objectives: [
    { id: 'o1', title: 'Secure PR Visa Status', progress: 45, priority: 'High', details: [{ id: 'd1', title: 'Document Legalization', progress: 100 }, { id: 'd2', title: 'Medical Assessments', progress: 30 }, { id: 'd3', title: 'Biometrics Appointment', progress: 0 }] },
    { id: 'o2', title: 'Real Estate Portfolio', progress: 20, priority: 'Medium', details: [{ id: 'd4', title: 'Market Research Hubs', progress: 60 }, { id: 'd5', title: 'Lender Pre-approval', progress: 10 }] }
  ],
  trips: [
    { id: 'japan-2026', title: 'Japan Winter Odyssey', location: 'Tokyo & Hokkaido', startDate: '2026-02-10', endDate: '2026-02-24', status: 'Upcoming', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2000', budget: 8000, itinerary: [{ id: 'j1', dayOffset: 0, time: '10:00', activity: 'Arrive at Narita Airport', category: 'Flight', cost: 1200, payBy: 'Family', bookingNumber: 'NH801', location: 'Narita Terminal 1', images: [] }, { id: 'j2', dayOffset: 0, time: '15:00', activity: 'Check-in Shinjuku Hotel', category: 'Accommodations', cost: 300, payBy: 'Elvin', bookingNumber: 'RES-12345', location: 'Park Hyatt Tokyo', images: [] }], budgetItems: [], shoppingList: [], packingList: DEFAULT_PACKING_LIST.map((item, idx) => ({ ...item, id: `default-${idx}` })) as PackingItem[], dayMetadata: { 0: { title: 'Arrival & Shinjuku Night', collapsed: false } }, visaRequirements: 'Japan Visa: Electronic Visa (e-Visa) for tourists available for certain nationalities. Valid for 90 days.' }
  ],
  loveNotes: [],
  memos: [],
  bucketList: BUCKET_LIST,
  workoutTypes: DEFAULT_WORKOUT_TYPES,
  property: { name: 'Lane Cove Sanctuary', address: '12-14 Longueville Rd, Lane Cove NSW 2066', value: 850000, mortgage: 540000, rate: 5.85, term: 30, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' },
  holdings: [
    { id: 'h1', name: 'Vanguard All-World ETF', ticker: 'VWRD', quantity: 450, purchasePrice: 90, currentPrice: 100, value: 45000, pool: 'Risk' as PoolType, type: 'ETF' },
    { id: 'h2', name: 'Nvidia Corp', ticker: 'NVDA', quantity: 100, purchasePrice: 100, currentPrice: 120, value: 12000, pool: 'Goal' as PoolType, type: 'Stock' },
    { id: 'h3', name: 'Bitcoin', ticker: 'BTC', quantity: 0.15, purchasePrice: 50000, currentPrice: 56666, value: 8500, pool: 'Goal' as PoolType, type: 'Crypto' },
  ],
  savingsGoals: [
    { id: 'sg1', name: 'Europe Summer 2026', target: 20000, current: 8500, deadline: '2026-06' },
    { id: 'sg2', name: 'New Family Car', target: 55000, current: 12000, deadline: '2025-12' },
  ],
  mortgageTool: { principal: 540000, rate: 5.85, years: 30 },
  folders: [
    { id: 'fld-elvin', name: "Elvin's Personal", owner: 'Elvin', parentId: null },
    { id: 'fld-fiona', name: "Fiona's Personal", owner: 'Fiona', parentId: null },
    { id: 'fld-family', name: "Shared Identity", owner: 'Family', parentId: null },
    { id: 'fld-finance', name: "Financial Archive", owner: 'Family', parentId: 'fld-family' },
  ],
  files: [
    { id: 'doc-1', name: 'Passport Scan.pdf', type: 'PDF', owner: 'Elvin', folderId: 'fld-elvin', updatedAt: '2024-01-15' },
    { id: 'doc-2', name: 'Property Lease.doc', type: 'DOC', owner: 'Family', folderId: 'fld-family', updatedAt: '2024-03-20' },
  ],
  packingTemplate: DEFAULT_PACKING_LIST,
  elvinHealth: INITIAL_HEALTH_ELVIN,
  fionaHealth: INITIAL_HEALTH_FIONA,
  globalShoppingList: [
     { id: 's1', item: '买点矿泉水', category: 'GROCERIES', checked: true }
  ],
  maintenanceList: [
     { id: 'm1', title: '修空调', date: '2026-02-04', provider: 'Self', completed: false }
  ],
  careerProfiles: {
    Elvin: DEFAULT_CAREER_ELVIN,
    Fiona: DEFAULT_CAREER_FIONA,
    Family: DEFAULT_CAREER_ELVIN
  },
  interests: {
    connectivityIndex: 62,
    points: { Elvin: 120, Fiona: 85 },
    badges: [
      { id: 'b1', title: '留翔含拉屎奖', icon: 'ChefHat', unlocked: false, category: 'Special', xpRequired: 50, color: 'bg-blue-600' },
      { id: 'b2', title: '吵架王', icon: 'Trophy', unlocked: false, category: 'Special', xpRequired: 100, color: 'bg-purple-600' },
    ],
    pursuits: [
      { id: 'p1', title: 'Fitness Hypertrophy', category: 'Hobbies', owner: 'Elvin', status: 'Active', xpValue: 20, currentCompletions: 0 },
      { id: 'p2', title: 'Interior Design Mastery', category: 'Learning', owner: 'Fiona', status: 'Active', xpValue: 40, currentCompletions: 0, image: 'https://images.unsplash.com/photo-1616489953149-835610842817?auto=format&fit=crop&q=80&w=800' }
    ],
    experience: [
      { id: 'e1', title: '羽毛球', date: '2025', owner: 'Elvin', category: 'SPORTS', image: 'https://images.unsplash.com/photo-1626225967045-9410ee7a3e06?auto=format&fit=crop&q=80&w=400' },
      { id: 'e2', title: '摄影', date: '2025', owner: 'Elvin', category: 'HOBBIES', image: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=400' },
      { id: 'e3', title: '瑜伽', date: '2025', owner: 'Fiona', category: 'SPORTS', rating: 4, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=crop&q=80&w=400' },
    ]
  },
  investmentLabReports: [],
  brainstorms: [],
  notifications: [],
  activeDialog: null,
  viewingUrl: undefined,
  viewingUrlTitle: undefined
};
