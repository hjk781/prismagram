import { prisma } from "../../../../generated/prisma-client";
import { generateTorken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args, { request }) => {
      console.log(request);
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            loginSecret: ""
          }
        });
        const token = generateTorken(user.id);
        return token;
      } else {
        throw Error("Wrong email/secret combination");
      }
    }
  }
};
