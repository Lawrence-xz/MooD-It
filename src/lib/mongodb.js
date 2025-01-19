import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('请添加 MongoDB URI 到环境变量');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('musicMemo'); // 修改为您的数据库名称

    cachedClient = client;
    cachedDb = db;

    console.log('MongoDB 连接成功');
    return { client, db };
  } catch (error) {
    console.error('MongoDB 连接错误:', error);
    return { client: null, db: null };
  }
}