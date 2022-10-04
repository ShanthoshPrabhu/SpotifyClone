// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";


// export async function middleware (req) {
//    const token = await getToken({req , secret:process.env.NEXTAUTH_SECRET})

//   console.log("token" ,token)
//    const {pathname} = req.nextUrl
//    console.log(pathname)
//    if (pathname.includes('/api/auth')|| token) {
//        return NextResponse.next();
//    }

//    if (!token && pathname!== '/login') {
//      return NextResponse.redirect('/login')
//    }
// }