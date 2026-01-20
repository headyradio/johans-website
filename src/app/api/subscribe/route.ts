import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.KIT_API_KEY;

    if (!apiKey) {
      console.error('KIT_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      );
    }

    // Kit V4 API - Create subscriber
    const response = await fetch('https://api.kit.com/v4/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Kit-Api-Key': apiKey,
      },
      body: JSON.stringify({
        email_address: email,
        first_name: firstName || undefined,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Kit API error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to subscribe' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!',
      subscriber: data.subscriber,
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'An error occurred while subscribing' },
      { status: 500 }
    );
  }
}
