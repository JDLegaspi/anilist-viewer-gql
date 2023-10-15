import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, jobTitle } = (await req.json()) as {
      username: string;
      jobTitle: string;
    };

    const session = await getServerSession(authOptions);

    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        username,
        jobTitle,
        hasCompletedOnboarding: true,
      },
    });

    return NextResponse.json({});
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 },
    );
  }
}
