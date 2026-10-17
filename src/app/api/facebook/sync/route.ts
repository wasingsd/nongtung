import { NextRequest, NextResponse } from 'next/server';
import { syncFacebookPostsAction } from '@/app/actions/facebookActions';

export async function POST(req: NextRequest) {
  try {
    const result = await syncFacebookPostsAction();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const result = await syncFacebookPostsAction();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
