import { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import useSWR from "swr";
import Autopilot from "twilio/lib/rest/Autopilot";

interface ResponseType {
  ok: boolean;
  error?: any;
}

interface KakaoSessionInfo{
  kakaoId: number,
  name: string,
  profile_image: string,
  thumbnail_image:string,
  loggedFrom:string,
}

export function Kakao(){
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;

  const loginHandler = useCallback(
    async(code: string | string[])=>{
      const response: ResponseType = await fetch('/api/users/kakao-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authCode: code,
        }),
      }).then((response) => response.json());
      
      if(response.ok){
        router.push("/");
      }else{
        console.log("response error")
        router.push("/enter");
      }
    },[router]
  );
  
  useEffect(()=>{
    if(authCode){
      loginHandler(authCode);
    } else if(kakaoServerError){
      console.log("kakoServerError")
      router.push("/enter");
    }
  }, [loginHandler, authCode, kakaoServerError, router]);
};

export default Kakao;

