import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('请添加 MongoDB URI 到环境变量');
}

const uri = process.env.MONGODB_URI;
let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    if (!cachedClient) {
      cachedClient = new MongoClient(uri);
      await cachedClient.connect();
      console.log('已创建新的 MongoDB 连接');
    }

    const db = cachedClient.db('musicMemo');
    cachedDb = db;

    await db.command({ ping: 1 });
    console.log('MongoDB 连接成功');

    return { client: cachedClient, db };
  } catch (error) {
    console.error('MongoDB 连接错误:', error);
    cachedClient = null;
    cachedDb = null;
    throw error;
  }
}