import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "pages/libs/server/withSession";
import withHandler, { ResponsType } from "pages/libs/server/withHandler";
import client from "pages/libs/server/client";
import { ResolutionMode } from "typescript";

interface TokenResponse {
  token_type: string;
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  refresh_token_expires_in: string;
  scope: string;
}

interface UserInfo {
  id: number;
  connectedAt: string;
  properties: {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
}


async function getTokenFromKakao(authCode: string) {
  const tokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=c109d239714635f5ea2067ac029a9ba3&redirect_uri=http://localhost:3000/kakao&code=${authCode}`;

  const response: TokenResponse = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "applcation/json",
    },
  }).then((res) => res.json());
  return response;
}
async function getUserFromKakao({ access_token }: TokenResponse) {
  const userinfoUrl = "https://kapi.kakao.com/v2/user/me";
  const response: UserInfo = await fetch(userinfoUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => res.json());
  return response;
}

async function handler (
  req: NextApiRequest,
  res: NextApiResponse<ResponsType>
){
  const { authCode } = req.body;
  const tokenResponse = await getTokenFromKakao(authCode);
  const userInfo = await getUserFromKakao(tokenResponse);
  const {
    id: kakaoId,
    properties: { nickname, profile_image, thumbnail_image },
  } = userInfo;

  async function createUser({
    id: kakaoId,
    properties: { nickname, profile_image, thumbnail_image },
  }: UserInfo) {
    const user = await client.kakaoUser.create({
      data: {
        name: nickname,
        kakaoId,
        loggedFrom: "Kakao",
        profile_image,
        thumbnail_image,
      },
    });
    return user;
  }
  const user = await createUser(userInfo);

  if (req.method === "POST") {
    const {
      id: kakaoId,
      properties: { nickname, profile_image, thumbnail_image },
    } = userInfo;

    console.log(userInfo);

    const user = await client.kakaoUser.create({
      data: {
        name: nickname,
        kakaoId,
        loggedFrom: "Kakao",
        profile_image,
        thumbnail_image,
      },
    });
    res.json({ ok: true, user });
  }
  if (req.method === "GET") {
    const checkUser = await client.kakaoUser.findUnique({
      where: {
        id: req.session.user?.id,
      },
    });
    res.json({ ok: true, checkUser });
  }
};

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler, isPrivate: true })
);
