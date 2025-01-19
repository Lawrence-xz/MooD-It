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
    const db = client.db('your-database-name'); // 确保这里使用正确的数据库名

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('MongoDB 连接错误:', error);
    return { client: null, db: null };
  }
}

// 添加错误处理和日志
try {
    await clientPromise;
    console.log('MongoDB 连接成功');
  } catch (error) {
    console.error('MongoDB 连接失败:', error);
  }

export default clientPromise;