import { prisma } from "../../../../generated/prisma-client";
import { generateTorken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        const token = generateTorken(user.id);
        return token;
      } else {
        throw Error("Wrong email/secret combination");
      }
    }
  }
};
