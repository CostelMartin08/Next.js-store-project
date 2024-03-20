export const publicRoutes = [

    "/",
    "/products",
    "/products/",
    "/collections",
   "/collections/[category]" ,
    "/auth/new-verification"
    
];


export const authRoutes = [
    "/auth/signIn",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
];

export const apiAuthPrefix = "/api/";

export const DEFAULT_LOGIN_REDIRECT = "/";