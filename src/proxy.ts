import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const isProtectRoute=createRouteMatcher(['/settings(.*)'])

export default clerkMiddleware((auth,req)=>{
  if(isProtectRoute(req)) auth.protect()
})




export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)"
  ]
};