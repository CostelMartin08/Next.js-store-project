import { DatabaseService } from "@/app/db";
import type { NextApiRequest, NextApiResponse } from 'next'
 

const dbService = new DatabaseService();


export async function GET(req: NextApiRequest, res: NextApiResponse) {

    const data = await dbService.getAllProducts();

    return new Response(JSON.stringify(data))

}
