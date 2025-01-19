import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    if (!db) {
      console.error('数据库连接失败');
      return new NextResponse(
        JSON.stringify({ error: '数据库连接失败' }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const notes = await db.collection('notes')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return new NextResponse(
      JSON.stringify(notes),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('获取笔记失败:', error);
    return new NextResponse(
      JSON.stringify({ error: '获取笔记失败' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    
    if (!db) {
      console.error('数据库连接失败');
      return new NextResponse(
        JSON.stringify({ error: '数据库连接失败' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { content } = await request.json();
    
    if (!content) {
      return new NextResponse(
        JSON.stringify({ error: '内容不能为空' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const result = await db.collection('notes').insertOne({
      content,
      createdAt: new Date()
    });

    return new NextResponse(
      JSON.stringify({ id: result.insertedId, content }),
      { 
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('保存笔记失败:', error);
    return new NextResponse(
      JSON.stringify({ error: '保存笔记失败' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}