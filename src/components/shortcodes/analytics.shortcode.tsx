"use client";

import Script from "next/script";
import config from "@/config/config.json";

export default function Analytics() {
  const { enable, gtm_id } = config.google_tag_manager;

  if (!enable || !gtm_id || process.env.NODE_ENV === "development") {
    return null;
  }

  return (
    <>
      {/* Google Consent Mode v2 — default all to denied (GDPR) */}
      <Script id="gtag-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
            'ad_personalization': 'denied',
            'ad_user_data': 'denied'
          });
        `}
      </Script>

      {/* Google Tag Manager */}
      <Script id="gtm" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtm_id}');
        `}
      </Script>
    </>
  );
}
