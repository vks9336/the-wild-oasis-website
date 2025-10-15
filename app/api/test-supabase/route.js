import { NextResponse } from 'next/server';
import { supabase } from '../../_lib/supabase';

export async function GET() {
  try {
    console.log('Testing Supabase connection...');
    console.log('URL:', process.env.SUPABASE_URL);
    console.log('KEY exists:', !!process.env.SUPABASE_KEY);

    const { data, error } = await supabase
      .from('cabins')
      .select('id, name')
      .limit(1);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      env: {
        url: process.env.SUPABASE_URL,
        keyExists: !!process.env.SUPABASE_KEY,
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
        stack: err.stack,
      },
      { status: 500 }
    );
  }
}
