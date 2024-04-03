
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
    unitsSold: number;

}

export interface Product {
    id: string,
    name: string,
    photo: string[],
    description: string | null,
    stock: number,
    price: number,
    discount: number;
    discountPrice: number,
    status: boolean,

}

export interface OrderProduct {
    category: any;
    idProduct: string;
    id: string;
    ordersId: string | null;
    name: string;
    photo: string;
    count: number;
    price: number;
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

export interface addProductsStock {
    collection: string;
    files: File[];
    productName: string;
    price: number | undefined;
    stock: number | undefined;
    description: string;
    discountPrice: number | undefined;
}

export interface allValues extends addProductsStock {
    discount: number;
    unitsSold: number;
    status: boolean;
    date: Date;

}

export interface ProductsStock {
    id: string;
    name: string;
    category: string;
    photo: string[];
    description: string | null;
    stock: number;
    price: number;
    discountPrice: number;
    discount: number;
    unitsSold: number;
    status: boolean;
    date: Date;

}

