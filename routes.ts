import localhostUrl from "./nodeEnv";

export const publicRoutes = [

    "/",
    "/contact",
    "usStory",
    "/collections",
    "/collections/category",
    "/products/products",
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

export const DEFAULT_LOGIN_REDIRECT = `${localhostUrl}`;