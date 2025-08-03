import { auth } from "@clerk/nextjs/server";
import prismadb from "./database/prismadb";
import { MAX_FREE_API_USES } from "@/constants";
import { handleError } from "./utils";
import { CreateUserParams, UpdateUserParams } from "@/types";

export const createUser = async (user: CreateUserParams) => {
  try {
    const { clerkId, email, firstName, lastName, photo, username } = user;

    const newUser = await prismadb.user.create({
      data: {
        userId: clerkId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        photo: photo,
        username: username,
      },
    });

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export const getUserById = async (userId: string) => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const user = await prismadb.user.delete({
      where: {
        userId: userId,
      },
    });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
  try {
    const { firstName, lastName, photo, username } = user;

    const updatedUser = await prismadb.user.update({
      where: {
        userId: clerkId,
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        photo: photo,
        username: username,
      },
    });

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

export const increaseApiLimit = async () => {
  const { userId } = await auth();

  if (!userId) return;

  const user = await prismadb.user.findUnique({
    where: {
      userId: userId,
    },
  });

  if (user) {
    await prismadb.user.update({
      where: {
        userId: userId,
      },
      data: {
        count: user.count + 1,
      },
    });
  } else {
    await prismadb.user.create({
      data: {
        userId: userId,
      },
    });
  }
};

export const addCredits = async (creditsAmount: number, userId: string) => {
  if (!userId) return;

  const user = await prismadb.user.findUnique({
    where: {
      userId: userId,
    },
  });

  if (user) {
    await prismadb.user.update({
      where: {
        userId: userId,
      },
      data: {
        credits: user.credits + creditsAmount,
      },
    });
  } else {
    await prismadb.user.create({
      data: {
        userId: userId,
        credits: creditsAmount,
      },
    });
  }
};

export const checkUserApiLimit = async () => {
  const { userId, has } = await auth();

  if (!userId) return false;

  if (has({ plan: "pro" })) return true;

  const user = await prismadb.user.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!user || user.count < MAX_FREE_API_USES) return true;

  return false;
};

export const makeUserPaymentTool = async (toolName: string) => {
  const { userId } = await auth();

  if (!userId) return false;

  const user = await prismadb.user.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!user) return false;

  const tool = await prismadb.tools.findUnique({
    where: {
      title: toolName,
    },
  });

  if (!tool) return false;

  if (user.credits >= tool.price) {
    await prismadb.user.update({
      where: {
        userId: userId,
      },
      data: {
        credits: user.credits - tool.price,
      },
    });

    return true;
  }

  return false;
};

export const getUserApiLimitCount = async () => {
  const { userId } = await auth();

  if (!userId) return 0;

  const user = await prismadb.user.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!user) return 0;

  return user.count;
};

export const getUserGredits = async () => {
  const { userId } = await auth();

  if (!userId) return 0;

  const user = await prismadb.user.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!user) return 0;

  return user.credits;
};
