import Script from "next/script";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  // @ts-expect-error window must be typed as unknown here
  (window as unknown).gtag("config", "G-77KMRW6WVC", {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: string;
}) => {
  // @ts-expect-error window must be typed as unknown here
  (window as unknown).gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const Analytics = () => {
  if (process.env.NODE_ENV !== "production") return null;

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
