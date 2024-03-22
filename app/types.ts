
export interface FormData {
    products?: CartProduct[];
    contact?: string;
    country?: string;
    name?: string;
    address?: string;
    postalCode?: string;
    city?: string;
    state?: string;
}

export interface CartProduct extends Product {
    count: number;
    category: string;
    countPrice: number;
}

export interface Product {
    id: string,
    name: string,
    photo: string,
    stock: number,
    price: number,
    discount: boolean,
    discountPrice: number,

}

export interface OrderProduct {
    category: any;

    id: string;
    ordersId: string | null;
    name: string;
    photo: string;
    count: number;
    price: number;
    discount: boolean;
    discountPrice: number;

}

export interface getOrder {
    date: Date;
    id: string;
    userId: string;
    contact: string;
    country: string;
    name: string;
    address: string;
    postalCode: string;
    city: string;
    state: string;
    products: OrderProduct[];
}

export interface UserOrder {
    id: string;
    userId: string;
    contact: string;
    country: string;
    name: string;
    address: string;
    postalCode: string;
    city: string;
    state: string;


}