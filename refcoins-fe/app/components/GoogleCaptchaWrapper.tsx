'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

function GoogleCaptchaWrapper({ children }: { children: React.ReactNode }) {
  const recaptchaKey: string = process.env.NEXT_PUBLIC_RECAPTCHA as string;
  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
      {children}
    </GoogleReCaptchaProvider>
  );
}

export default GoogleCaptchaWrapper;
