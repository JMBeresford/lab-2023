// "use client";

// import { usePathname } from "next/navigation";
import Script from "next/script";
// import { useEffect } from "react";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  (window as any).gtag("config", "G-77KMRW6WVC", {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  (window as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const Analytics = () => {
  if (process.env.NODE_ENV !== "production") return null;

  // const path = usePathname();

  // useEffect(() => {
  //   pageview(path);
  // }, [path]);

  return (
    <>
      <Script
        async
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-77KMRW6WVC"
      />
      <Script strategy="afterInteractive" id="gtag">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-77KMRW6WVC', {page_path: window.location.pathname});
          `}
      </Script>
    </>
  );
};
