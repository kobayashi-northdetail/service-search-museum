import Script from 'next/script';

const GoogleAdsense: React.FC = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${
        process.env.NEXT_PUBLIC_ADSENSE_ID || ''
      }`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

export default GoogleAdsense;
