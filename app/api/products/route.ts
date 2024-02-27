import { getAllProducts } from "@/app/data/products";
import type { NextApiRequest, NextApiResponse } from 'next'
 

export async function GET(req: NextApiRequest, res: NextApiResponse) {

    const data = await getAllProducts();

    return new Response(JSON.stringify(data))

}
