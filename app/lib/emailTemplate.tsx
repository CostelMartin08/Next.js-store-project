import * as React from 'react';
import { CartProduct } from '../types';

interface EmailTemplateProps {
    data: CartProduct[],
    name: string,
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    data, name
}) => (
    <div>
        <h1>Good news, {name}!</h1>

        <table className='w-screen'>
            <caption style={{ textAlign: 'left', paddingBottom: '20px', fontSize: '15px' }}>Your order has been processed.</caption>
            <thead className='flex'>
                <tr>
                    <th scope="col"></th>
                    <th style={{ textAlign: 'left' }} className='w-9/12' scope="col">Product details</th>
                    <th scope="col">Price</th>

                </tr>
            </thead>
            <tbody className='flex'>
                {data.map((product, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td 
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <img src={`https://gadgetgrid.ro/images/${product.category}/${product.id}/${product.photo[0]}`} width="60px" height="60px" alt={product.name} />
                            <p style={{paddingLeft:'15px'}}>{product.name}</p>
                        </td>
                        <td>
                            <h2>{product.price}$</h2>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
