import React from "react";
import "../styles/globals.css";
import { SWRConfig } from "swr";
import Script from "next/script";

declare global {
  interface Window {
    Kakao: any;
  }
}

const kakaoInit = () => {
  window.Kakao.init("c109d239714635f5ea2067ac029a9ba3");
  console.log(window.Kakao.isInitialized());
};

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="w-full mx-auto max-w-2xl">
        <Component {...pageProps} />
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" onLoad={kakaoInit}></Script>
      </div>
    </SWRConfig>
  );
}

export default MyApp;
