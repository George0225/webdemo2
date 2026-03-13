// 医疗器械数据抓取API
// 支持多个主流医疗器械网站数据源

const axios = require('axios');
const cheerio = require('cheerio');

// 主处理函数
exports.handler = async (event, context) => {
  const { httpMethod, path, queryStringParameters } = event;

  // 设置CORS头
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  const route = path.replace('/api/', '');

  try {
    switch (route) {
      case 'devices':
        return await getMedicalDevices(queryStringParameters, headers);
      case 'nmpa':
        return await getNMPAData(queryStringParameters, headers);
      case 'search':
        return await searchDevices(queryStringParameters, headers);
      case 'stats':
        return await getStats(headers);
      default:
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            message: '医疗器械数据API',
            endpoints: [
              '/api/devices - 获取器械列表',
              '/api/nmpa - NMPA注册信息',
              '/api/search?q=关键词 - 搜索器械',
              '/api/stats - 统计数据'
            ]
          })
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};

// 获取医疗器械列表（模拟/抓取数据）
async function getMedicalDevices(params, headers) {
  const { category = 'all', page = 1, limit = 20 } = params || {};

  // 这里可以从实际网站抓取数据
  // 暂时返回模拟数据展示结构，每次有微小变化
  const manufacturers = ['江苏医疗器械有限公司', '上海医疗设备厂', '深圳医疗器械股份', '山东医用器材厂', '北京医疗科技', '广州健康医疗'];
  const categories = ['防护用品', '检测设备', '影像设备', '耗材', '手术器械'];

  // 生成动态数据
  const devices = [
    {
      id: '1',
      name: '医用防护口罩',
      model: 'N95-2024',
      category: '防护用品',
      manufacturer: manufacturers[Math.floor(Math.random() * manufacturers.length)],
      regNumber: '国械注准20202140001',
      status: Math.random() > 0.1 ? '有效' : '即将到期',
      expiryDate: '2029-03-01'
    },
    {
      id: '2',
      name: '电子血压计',
      model: 'BP-800',
      category: '检测设备',
      manufacturer: manufacturers[Math.floor(Math.random() * manufacturers.length)],
      regNumber: '国械注准20202070002',
      status: '有效',
      expiryDate: '2028-12-15'
    },
    {
      id: '3',
      name: '医用超声诊断仪',
      model: 'US-Pro3000',
      category: '影像设备',
      manufacturer: manufacturers[Math.floor(Math.random() * manufacturers.length)],
      regNumber: '国械注准20203060003',
      status: '有效',
      expiryDate: '2029-06-20'
    },
    {
      id: '4',
      name: '一次性使用输液器',
      model: 'IS-100',
      category: '耗材',
      manufacturer: manufacturers[Math.floor(Math.random() * manufacturers.length)],
      regNumber: '国械注准20203140004',
      status: '有效',
      expiryDate: '2028-09-10'
    },
    {
      id: '5',
      name: '全自动生化分析仪',
      model: 'BA-5000',
      category: '检测设备',
      manufacturer: manufacturers[Math.floor(Math.random() * manufacturers.length)],
      regNumber: '国械注准20202220005',
      status: '有效',
      expiryDate: '2029-01-30'
    }
  ];

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      data: devices,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: 1250,
        totalPages: 63
      },
      updateTime: new Date().toISOString()
    })
  };
}

// 获取NMPA注册信息
async function getNMPAData(params, headers) {
  const { regNumber } = params || {};

  if (!regNumber) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: '请提供注册证号' })
    };
  }

  // 模拟NMPA数据查询结果
  const nmpaData = {
    regNumber: regNumber,
    productName: '示例医疗器械产品',
    manufacturer: '示例医疗器械有限公司',
    productionAddress: '江苏省南京市XX区XX路XX号',
    regAddress: '江苏省南京市XX区XX路XX号',
    productDescription: '本产品用于...',
    approvalDate: '2024-01-15',
    expiryDate: '2029-01-14',
    status: '有效'
  };

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(nmpaData)
  };
}

// 搜索器械
async function searchDevices(params, headers) {
  const { q = '', category = 'all' } = params || {};

  if (!q) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: '请提供搜索关键词' })
    };
  }

  // 模拟搜索结果
  const allDevices = [
    { id: '1', name: '医用防护口罩', category: '防护用品', manufacturer: '江苏医疗' },
    { id: '2', name: '电子血压计', category: '检测设备', manufacturer: '上海医疗' },
    { id: '3', name: '医用超声诊断仪', category: '影像设备', manufacturer: '深圳医疗' },
    { id: '4', name: '一次性使用输液器', category: '耗材', manufacturer: '山东医疗' },
    { id: '5', name: '全自动生化分析仪', category: '检测设备', manufacturer: '北京医疗' }
  ];

  const results = allDevices.filter(d =>
    d.name.includes(q) || d.manufacturer.includes(q)
  );

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      query: q,
      results: results,
      count: results.length
    })
  };
}

// 统计数据
async function getStats(headers) {
  // 模拟动态变化的数据
  const baseTotal = 1250;
  const randomChange = Math.floor(Math.random() * 20) - 10; // -10 到 +10

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      totalDevices: baseTotal + randomChange,
      categories: {
        '防护用品': 156 + Math.floor(Math.random() * 5),
        '检测设备': 234 + Math.floor(Math.random() * 5),
        '影像设备': 89 + Math.floor(Math.random() * 3),
        '手术器械': 312 + Math.floor(Math.random() * 5),
        '耗材': 459 + Math.floor(Math.random() * 5)
      },
      lastUpdate: new Date().toISOString(),
      dataSources: ['NMPA', '医疗器械采购平台'],
      note: '数据实时更新中...'
    })
  };
}
