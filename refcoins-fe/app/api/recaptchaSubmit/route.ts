
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {

    const postData = await req.json();
  const { gRecaptchaToken } = postData;

  const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;
  console.log(secretKey);
  let response;
  try {
    response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      `secret=${secretKey}&response=${gRecaptchaToken}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  } catch (error) {
    console.error('Error verifying ReCAPTCHA:', error);
    return NextResponse.json({success: false})
  }

  if (response && response.data?.success && response.data?.score > 0.5){
    console.log('response.data?.score', response.data?.score)
    return NextResponse.json({success: true, score: response.data?.score})
  }else{
    return NextResponse.json({success: false})
  }
}
 
