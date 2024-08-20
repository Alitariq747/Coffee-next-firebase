
export interface Size {
	size: string;
	price: number;
}

export interface Product {
    id: string;
	name: string;
	sizes: Size[];
	image: string;
	availability: boolean;
	slug: string;
	category: string
}

export interface CartItem extends Product {
	selectedQuantity: number;
	selectedSize: string;
	selectedPrice: number;
}

export interface Blend {
	id: string;
	name: string;
	availability: boolean;
	description: string;
	image: string
}

export interface Order {
	id: string;
	items: CartItem[];
	name: string;
	email: string;
	phone: number;
	pickUpTime: number;
	completed: boolean;
	promo: string | null;
	createdAt: string; // Store as an ISO string for compatibility
	bill: number;
}

