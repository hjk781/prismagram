import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragment";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfil = await prisma
        .user({ id: user.id })
        .$fragment(USER_FRAGMENT);
      const posts = await prisma.user({ id: user.id }).posts();
      return {
        user: userProfil,
        posts
      };
    }
  }
};
