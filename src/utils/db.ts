import prisma from "@/lib/prisma";

export const getUserFromDb = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
