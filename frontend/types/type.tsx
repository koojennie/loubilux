// type nya User
export interface User {
    id: string;
    userId: string;
    name: string;
    username: string;
    email: string;
    phoneNumber: string;
    role: string;
    profilePicture: string;
    createdAt: string;
    updateAt: string;
}

// interface Category 
export interface Category {
    id: string;
    name: string;
    prefix: string;
    description: string;
}

// interface Product
export interface Product {
    no?:number;
    id: string;
    name: string;
    productCode: string;
    quantity: number;
    price: number;
    statusPublish: string;
    images: string[];
    description: string;
    category: Category;
    createdAt?: Date;
    updateAt?: Date;
}

// export interface orderLinetitem
export interface OrderLineItem {
    id: string;
    orderId: Order;
    product: Product;
    quantity: number;
    subPrice: number;
}
// export interface Order
export interface Order {
    id: string;
    user: User;
    orderlineitems: OrderLineItem;
    orderId: string;
    orderDate: Date;
    statusOrder: string;
    paymentMethod: string;
    paymentStatus: string;
    createdAt?: Date;
    updatedAt?: Date;
}

