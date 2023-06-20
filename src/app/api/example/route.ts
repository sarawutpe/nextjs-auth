import { NextRequest, NextResponse } from "next/server";
import { getToken, decode, JWTDecodeParams, encode } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const sessionToken =
      req.cookies.get("next-auth.session-token")?.value ?? "";

    const tokenSecert = process.env.JWT_SECRET;
    const secret = process.env.NEXTAUTH_SECRET;

    console.log(`${process.env.NEXT_PUBLIC_GOOGLE_ID}`);
    console.log(`${process.env.NEXT_PUBLIC_GOOGLE_SECRET}`);

    if (!tokenSecert) {
      return NextResponse.json({
        status: "no",
      });
    }

    const tk = await getToken({ req: req, secret: secret, raw: true });

    const decoded = await decode({
      secret: tokenSecert,
      token: sessionToken,
    });

    return NextResponse.json({
      status: true,
      decoded: decoded,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: false,
      decoded: error.message,
    });
  }
}
