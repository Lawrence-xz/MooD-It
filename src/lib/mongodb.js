import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('请添加 MongoDB URI 到环境变量');
}

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    // 强制创建新连接
    if (!cachedClient) {
      cachedClient = new MongoClient(uri, options);
      await cachedClient.connect();
      console.log('已创建新的 MongoDB 连接');
    }

    const db = cachedClient.db('musicMemo');
    cachedDb = db;

    // 测试连接
    await db.command({ ping: 1 });
    console.log('MongoDB 连接成功');

    return { client: cachedClient, db };
  } catch (error) {
    console.error('MongoDB 连接错误:', error);
    // 清除缓存的连接
    cachedClient = null;
    cachedDb = null;
    throw error; // 向上抛出错误
  }
}