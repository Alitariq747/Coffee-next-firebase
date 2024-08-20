"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import useCartStore from "@/store/useCartStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import app from "@/firebaseConfig";
import { Order } from "@/types/types";
import { createOrder } from "@/utils/data/createOrder";
import CartModal from "@/components/CartModal";
import { toast } from "sonner";

interface OrderFormInput {
	order: Order;
}

const OrderConfirmationPage: React.FC = () => {
	const { cart, emptyCart } = useCartStore();
	const total = useCartStore((state) => state.total());
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<OrderFormInput>();

	const [isCartOpen, setIsCartOpen] = useState(false);

	// State to track client-side hydration
	const [isHydrated, setIsHydrated] = useState(false);

	const router = useRouter()

	const auth = getAuth(app)

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	const onSubmit: SubmitHandler<OrderFormInput> = async (data) => {
		// Check for errors before submitting
		if (Object.keys(errors).length > 0) {
			// If there are any errors, display an alert
			toast.error("Please fill in all required fields.");
			return;
		}

		data.order.items = cart;
		data.order.bill = total;
		data.order.completed = false
		const id = await createOrder(data.order);
		toast.success("Order placed Successfully")	
		emptyCart()
		router.push(`/success/${id}`)
	};

	return (
		<div className="w-full h-screen">
			<h1 className="text-center text-2xl lg:text-4xl font-bold text-slate-950 mt-5">
				Checkout
			</h1>
			<div className="container mx-auto flex flex-row w-full gap-2 mt-5">
				<div className="w-3/4">
					{/* Checkout Details */}
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col items-start justify-start gap-3">
							{/* Promo Code */}
							<div className="flex flex-col gap-2 p-4 w-full">
								<h2 className="text-base font-semibold text-slate-950">
									ENTER ANY PROMO CODE OR VOUCHER
								</h2>
								<Input
									type="text"
									variant="underlined"
									label=""
									{...register("order.promo")}
								/>
							</div>
							{/* EMAIL ADDRESS */}
							{auth.currentUser ? (
								<p className="p-4">
									<span className="font-medium">Email: </span>
									{auth.currentUser.email}
								</p>
							) : (
								<div className="flex flex-col gap-2 p-4 w-full">
									<h2 className="text-base font-semibold text-slate-950">
										ENTER YOUR EMAIL ADDRESS
									</h2>
									<Input
										isClearable
										type="email"
										variant="bordered"
										className="max-w-xs"
										radius="none"
										{...register("order.email", { required: true })}
									/>
									{/* Error handling for email */}
									{errors.order?.email && (
										<p className="text-red-500 text-sm">Email is required.</p>
									)}
								</div>
							)}

							{/* PickUp details */}
							{}
							<div className="flex flex-col gap-3 p-4 w-full">
								<h2 className="text-base font-semibold text-slate-950">
									PICK-UP DETAILS:
								</h2>
								<div className="flex flex-col gap-1">
									<h3 className="text-sm font-normal text-slate-950">
										ENTER YOUR FULLNAME:
									</h3>
									<Input
										isClearable
										type="text"
										variant="bordered"
										className="max-w-xs"
										radius="none"
										{...register("order.name", { required: true })}
									/>
									{/* Error handling for fullname */}
									{errors.order?.name && (
										<p className="text-red-500 text-sm">
											Full name is required.
										</p>
									)}
								</div>
								<div className="flex flex-col gap-1">
									<h3 className="text-sm font-normal text-slate-950">
										ENTER YOUR MOBILE:
									</h3>
									<Input
										isClearable
										type="tel"
										variant="bordered"
										className="max-w-xs"
										radius="none"
										{...register("order.phone", { required: true })}
									/>
									{/* Error handling for mobile */}
									{errors.order?.phone && (
										<p className="text-red-500 text-sm">
											Mobile number is required.
										</p>
									)}
								</div>
								<div className="flex flex-col gap-1">
									<h3 className="text-sm font-normal text-slate-950">
										SPECIFY PICK-UP TIME:
									</h3>
									<Input
										isClearable
										type="text"
										variant="bordered"
										className="max-w-xs"
										radius="none"
										{...register("order.pickUpTime", { required: true })}
									/>
									{/* Error handling for pick-up time */}
									{errors.order?.pickUpTime && (
										<p className="text-red-500 text-sm">
											Pick-up time is required.
										</p>
									)}
								</div>
								<Button
									radius="md"
									className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-4 w-1/6"
									type="submit"
								>
									Place Order
								</Button>
							</div>
						</div>
					</form>
				</div>
				<div className="max-md:hidden w-1/4 h-auto">
					{/* Cart Summary */}
					<div className="flex flex-col items-start justify-start gap-3">
						<div className="flex flex-row items-center justify-between p-2 w-full">
							<p>{cart.length} Item(s)</p>
							<button
								className="text-xs font-extralight text-slate-600"
								onClick={() => setIsCartOpen(true)}
							>
								Edit
							</button>
						</div>
						<hr />
						{cart.map((item) => (
							<div
								className="flex flex-row items-center justify-start gap-4 w-full px-2"
								key={item.name}
							>
								<div className="relative w-16 h-16">
									<Image
										src={item.image}
										fill
										alt={item.name}
										className="object-cover rounded-sm"
									/>
								</div>
								<div>
									<p className="text-slate-950 text-xs font-light">
										{item.name}
									</p>
									<p className="text-slate-950 text-xs font-light">
										${item.selectedPrice}
									</p>
									<p className="text-slate-950 text-xs font-light">
										Qty: {item.selectedQuantity}
									</p>
								</div>
							</div>
						))}
						{/* Bottom Total Section */}
						<div className="flex flex-row items-center justify-between w-full px-2">
							<h3 className="text-slate-950 font-medium text-base">Total:</h3>
							{isHydrated ? (
								<p className="text-slate-950 font-medium text-base">
									${total.toFixed(2)}
								</p>
							) : (
								<p className="text-slate-950 font-medium text-base">$0.00</p>
							)}
						</div>
					</div>
				</div>
			</div>
			{isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
		</div>
	);
};

export default OrderConfirmationPage;
