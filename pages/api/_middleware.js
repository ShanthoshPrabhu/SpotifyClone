// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";


// export async function middleware (req) {
//     const token = await getToken({req})
//    console.log('tokenn',token)
//     const {pathname} = req.nextURL
//     if (pathname.includes('/api/auth') || token ) {
//         return NextResponse.next();
//     }
//     if(!token && pathname !== '/login') {
//         NextResponse.redirect('/login')
//     }
// }