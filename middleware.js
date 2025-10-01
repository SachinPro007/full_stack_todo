export const middleware = (request) => {
  const cookie = request.cookies.get("userID")?.value;


  if (cookie) {
    if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register") {
      return Response.redirect(new URL("/", request.nextUrl.origin))
    }
  } else if (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/register") {
    return Response.redirect(new URL("/login", request.nextUrl.origin))

  }
}


export const config = {
  matcher: ["/", "/login", "/register"]
}