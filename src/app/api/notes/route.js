import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  let client;
  try {
    const { client: dbClient, db } = await connectToDatabase();
    client = dbClient;

    const notes = await db.collection('notes')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify(notes), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('获取笔记失败:', error);
    return new Response(
      JSON.stringify({ 
        error: '获取笔记失败', 
        details: error.message 
      }), 
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export async function POST(request) {
  let client;
  try {
    const { client: dbClient, db } = await connectToDatabase();
    client = dbClient;

    const body = await request.json();
    const { content } = body;
    
    if (!content) {
      return new Response(
        JSON.stringify({ error: '内容不能为空' }), 
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const result = await db.collection('notes').insertOne({
      content,
      createdAt: new Date()
    });

    return new Response(
      JSON.stringify({ 
        id: result.insertedId.toString(), 
        content,
        createdAt: new Date()
      }), 
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('保存笔记失败:', error);
    return new Response(
      JSON.stringify({ 
        error: '保存笔记失败', 
        details: error.message 
      }), 
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}