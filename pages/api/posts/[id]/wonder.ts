import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponsType } from "pages/libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";
import client from "pages/libs/server/client";
import { withApiSession } from "pages/libs/server/withSession";


async function handler(req: NextApiRequest, res: NextApiResponse<ResponsType>) {
  const {
    query: { id },
    session: { user },
  } = req;

  const alreadyExists = await client.wondering.findFirst({
    where: {
      userId: user?.id,
      postId: +id.toString(),
    },
    select:{
      id:true,
    }
  });
  if (alreadyExists) {
    await client.wondering.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.wondering.create({
      data:{
        user:{
          connect:{
            id:user?.id
          }
        },
        post:{
          connect:{
            id:+id.toString(),
          }
        }
      }
    })
  }

  res.json({
    ok: true,
  });
}
export default withApiSession(withHandler({
  methods: ["POST"],
  handler,
  isPrivate:true,
}));
