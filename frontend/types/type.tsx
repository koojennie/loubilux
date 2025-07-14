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
    rating: number;
    password: string;
    confirmPassword: string;
    createdAt: string | Date;
    updateAt: string | Date;
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
    productId: string;
    quantity: number;
    price: number;
    subPrice: number;
    statusPublish: string;
    images: string[];
    description: string;
    category: Category | string;
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
    user: User| string;
    orderlineitems: OrderLineItem;
    orderId: string;
    orderDate: string;
    statusOrder: string;
    paymentMethod: string;
    paymentStatus: string;
    totalPrice: number;
    totalSpent: number;
    items: Product[];
    createdAt?: Date;
    updatedAt?: Date;
}

// interface Opname
export interface Opname {
    opnameId: string;
    productId: string;
    product?: Product;
    productName: string;
    recordedStock: number;
    physicalStock: number;
    difference: number;
    note: string;
    createdAt?: Date;
    updatedAt?: Date;
}

