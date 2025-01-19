import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    if (!db) {
      console.error('数据库连接失败');
      return NextResponse.json(
        { error: '数据库连接失败' },
        { status: 500 }
      );
    }

    const notes = await db.collection('notes')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(notes);
    
  } catch (error) {
    console.error('获取笔记失败:', error);
    return NextResponse.json(
      { error: '获取笔记失败' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    
    if (!db) {
      console.error('数据库连接失败');
      return NextResponse.json(
        { error: '数据库连接失败' },
        { status: 500 }
      );
    }

    const { content } = await request.json();
    
    if (!content) {
      return NextResponse.json(
        { error: '内容不能为空' },
        { status: 400 }
      );
    }

    const result = await db.collection('notes').insertOne({
      content,
      createdAt: new Date()
    });

    return NextResponse.json(
      { id: result.insertedId, content },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('保存笔记失败:', error);
    return NextResponse.json(
      { error: '保存笔记失败' },
      { status: 500 }
    );
  }
}