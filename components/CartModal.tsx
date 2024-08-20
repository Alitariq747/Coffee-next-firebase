"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebaseAuth"; // Import Firebase auth
import { toast } from "sonner";
import { useState } from "react";
import LoginModal from "./LoginModal"; // Import the LoginModal component

import useCartStore from "@/store/useCartStore";
import { AiOutlineClose } from "react-icons/ai";

const CartModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	const router = useRouter();
	const {
		cart,
		increaseItemQuantity,
		decreaseItemQuantity,
		removeItem,
		emptyCart,
	} = useCartStore();
	const total = useCartStore((state) => state.total());
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State to control LoginModal visibility

	const handleClick = () => {
		if (!auth.currentUser) {
			// Check if the user is authenticated
			toast.error("Please log in first!");
			setIsLoginModalOpen(true); // Open the LoginModal if not authenticated
			return;
		}

		toast.info("Heading to checkout");
		router.push("/confirm-order"); // Redirect to checkout if authenticated
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 mx-4 md:mx-auto">
				<div className="flex justify-between items-center border-b pb-3">
					<h2 className="text-xl font-semibold">Your Cart</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<AiOutlineClose size={24} />
					</button>
				</div>
				<div className="mt-4 space-y-4">
					{cart.length === 0 ? (
						<p className="text-center text-gray-600">Your cart is empty</p>
					) : (
						cart.map((item) => (
							<div
								key={`${item.id}-${item.selectedSize}`}
								className="flex items-center justify-between"
							>
								<div className="flex items-center">
									<img
										src={item.image}
										alt={item.name}
										className="w-16 h-16 rounded-md"
									/>
									<div className="ml-4">
										<h3 className="font-semibold">{item.name}</h3>
										<p className="text-sm text-gray-600">
											Size: {item.selectedSize}
										</p>
										<p className="text-sm text-gray-600">
											Price: ${item.selectedPrice}
										</p>
										<p className="text-sm text-gray-600">
											Quantity: {item.selectedQuantity}
										</p>
									</div>
								</div>
								<div className="flex items-center space-x-2">
									<button
										onClick={() =>
											increaseItemQuantity(item.id, item.selectedSize)
										}
										className="text-gray-500 hover:text-gray-700"
									>
										+
									</button>
									<button
										onClick={() =>
											decreaseItemQuantity(item.id, item.selectedSize)
										}
										className="text-gray-500 hover:text-gray-700"
									>
										-
									</button>
									<button
										onClick={() => removeItem(item.id, item.selectedSize)}
										className="text-red-500 hover:text-red-700"
									>
										Remove
									</button>
								</div>
							</div>
						))
					)}
				</div>
				<div className="border-t pt-3 mt-4 flex justify-between items-center">
					<h3 className="text-lg font-semibold">Total: ${total.toFixed(2)}</h3>
					<div className="flex flex-row gap-5">
						<button
							onClick={handleClick}
							className="text-slate-950 hover:text-red-700"
							disabled={cart.length === 0}
						>
							Place Order
						</button>
						<button
							onClick={emptyCart}
							className="text-red-500 hover:text-red-700"
						>
							Empty Cart
						</button>
					</div>
				</div>
			</div>
			{/* Render the LoginModal */}
			{isLoginModalOpen && (
				<LoginModal
					isOpen={isLoginModalOpen}
					onClose={() => setIsLoginModalOpen(false)}
				/>
			)}
		</div>
	);
};

export default CartModal;
