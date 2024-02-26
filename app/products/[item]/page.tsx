'use client'
import React, {useEffect} from 'react';
import Product from '@/app/components/product/product';
import { useSearchParams } from 'next/navigation';

const ItemPage = () => {

    const searchParams = useSearchParams()
 
    const search = searchParams.get('item')

    return (

        <>
      {console.log(search)}
            <Product />

        </>
    )
}


export default ItemPage;


