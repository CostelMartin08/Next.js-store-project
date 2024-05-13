import * as React from 'react';
import { CartProduct } from '../types';

interface EmailTemplateProps {
    data: CartProduct[],
    name: string,
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    data, name
}) => {

    let totalPrice = 0;

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>GadgetGrid</h1>

            <div style={{ fontSize: 'larger' }}>

                <h3 style={{ marginBottom: '0' }}>Hello, {name}!</h3>
                <p>Thank you for your recent order</p>

                <table style={{ marginInline: 'auto', width: '-webkit-fill-available', textAlign: 'center' }}>

                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th style={{ textAlign: 'left' }} scope="col">Product details</th>
                            <th scope="col">Count</th>
                            <th scope="col">Price</th>

                        </tr>
                    </thead>

                    <tbody>
                        {data.map((product, index) => {

                            let totalPriceForProduct = product.discount > 0 ? product.discountPrice * product.count : product.price * product.count;

                            totalPrice += totalPriceForProduct;

                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td
                                        style={{ display: 'flex', placeItems: 'center' }}>
                                        <img src={`https://gadgetgrid.ro/images/${product.category}/${product.id}/${product.photo[0]}`} width="80px" height="80px" alt={product.name} />
                                        <p style={{ paddingLeft: '15px', width: '20rem' }}>{product.name}</p>
                                    </td>
                                    <td>{product.count}</td>
                                    <td>
                                        <h2>{product.discount > 0 ? product.discountPrice : product.price}€</h2>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>

                <h3 style={{ textAlign: 'end' }}>Total Price: {totalPrice}€</h3>

            </div>
        </div>
    )
};
