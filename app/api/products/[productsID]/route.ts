import { getProductByName } from "@/app/data/products";


export async function POST(req: Request, context: any) {
    try {
        const { params } = context;
        console.log(params.productsID);

        const data = await getProductByName(params.productsID)

        return new Response(JSON.stringify(data));
    } catch (error) {
        console.error('A aparut o eroare:', error);
        return new Response('A aparut o eroare', { status: 500 });
    }
}