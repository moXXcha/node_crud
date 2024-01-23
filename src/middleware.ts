import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// import "server-only";
import { createClient } from "./utils/supabase/middleware";

export async function middleware(req: NextRequest) {
  console.log("middleware");
  const res = NextResponse.next();
  const supabase = createClient(req);


  // ユーザーのsessionを更新
  const { data, error } = await supabase.supabase.auth.getSession();

  if (error) {
    console.log(error.message);
  }

  // すでにloginしている場合に、/loginにアクセスした場合、/にリダイレクトする
  if (data.session && req.nextUrl.pathname === "/login") {
    console.log("loginしているので、/にリダイレクト");
    return NextResponse.redirect(new URL("/", req.url));
  }

  console.log("data: ", data);

  if (req.nextUrl.pathname === "/login") {
    console.log("login画面なので、何もしない");
    return res;
  }

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|[id]).*)"],
};
