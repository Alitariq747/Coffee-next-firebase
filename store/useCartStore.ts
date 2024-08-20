import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { Size, Product, CartItem } from "@/types/types";

interface CartState {
	cart: CartItem[];
	addItem: (product: Product, size: Size, quantity: number) => void;
	removeItem: (productId: string, size: string) => void;
	increaseItemQuantity: (productId: string, size: string) => void;
	decreaseItemQuantity: (productId: string, size: string) => void;
	total: () => number; 
	emptyCart: () => void;
}

const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			cart: [],
			addItem: (product: Product, size: Size, quantity: number) => {
				const { cart } = get();
				const existingItemIndex = cart.findIndex(
					(item) => item.id === product.id && item.selectedSize === size.size
				);

				if (existingItemIndex !== -1) {
					const updatedCart = cart.map((item) =>
						item.id === product.id && item.selectedSize === size.size
							? { ...item, selectedQuantity: item.selectedQuantity + quantity }
							: item
					);
					set({ cart: updatedCart });
				} else {
					set({
						cart: [
							...cart,
							{
								...product,
								selectedQuantity: quantity,
								selectedSize: size.size,
								selectedPrice: size.price,
							},
						],
					});
				}
			},
			removeItem: (productId: string, size: string) => {
				set((state) => ({
					cart: state.cart.filter(
						(item) => !(item.id === productId && item.selectedSize === size)
					),
				}));
			},
			increaseItemQuantity: (productId: string, size: string) => {
				set((state) => ({
					cart: state.cart.map((item) =>
						item.id === productId && item.selectedSize === size
							? { ...item, selectedQuantity: item.selectedQuantity + 1 }
							: item
					),
				}));
			},
			decreaseItemQuantity: (productId: string, size: string) => {
				set((state) => ({
					cart: state.cart.map((item) =>
						item.id === productId &&
						item.selectedSize === size &&
						item.selectedQuantity > 1
							? { ...item, selectedQuantity: item.selectedQuantity - 1 }
							: item
					),
				}));
			},
			total: () => {
				return get().cart.reduce(
					(total, item) => total + item.selectedQuantity * item.selectedPrice,
					0
				);
			},
			emptyCart: () => {
				set({ cart: [] });
			},
		}),
		{
			name: "cart-storage", // Unique name for localStorage key
			partialize: (state) => ({ cart: state.cart }), // Specify what part of the state to persist
		} as PersistOptions<CartState>
	)
);

export default useCartStore;
