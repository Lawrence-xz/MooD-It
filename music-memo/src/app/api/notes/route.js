import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("musicMemo");
    const notes = await db.collection("notes")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(
      { error: '获取笔记失败' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const client = await clientPromise;
    const db = client.db("musicMemo");
    
    const newNote = {
      content: data.content,
      createdAt: new Date(),
    };
    
    const result = await db.collection("notes").insertOne(newNote);
    
    return NextResponse.json({
      success: true,
      note: { ...newNote, _id: result.insertedId }
    });
  } catch (error) {
    return NextResponse.json(
      { error: '保存笔记失败' },
      { status: 500 }
    );
  }
}