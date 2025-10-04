// import { NextResponse } from "next/server";

// export const middleware = async (request) => {
//   const cookie = request.cookies.get("userID")?.value;
//   // return NextResponse.rewrite(new URL("/", request.nextUrl.origin))
//   // return Response.redirect(new URL("/", request.nextUrl.origin))

//   if (cookie) {
//     if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register") {
//       return Response.redirect(new URL("/", request.nextUrl.origin))
//     }
//   } else if (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/register") {
//     return Response.redirect(new URL("/login", request.nextUrl.origin))
//   }
// }

export { auth as middleware } from "@/auth"


// export const config = {
//   matcher: ["/", "/login", "/register"],
//   // matcher: ["/about"]
// }