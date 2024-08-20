"use client";

import { Button, Select, SelectItem } from "@nextui-org/react";
import { RiStarSFill, RiStarSLine } from "react-icons/ri";
import React, { useState } from "react";
import { toast } from "sonner";

import { Product, Size } from "@/types/types";
import useCartStore from "@/store/useCartStore";
import Link from "next/link";
import CartModal from "./CartModal";

interface AddToCartButtonProps {
	product: Product;
}

const ProductDetail: React.FC<AddToCartButtonProps> = ({ product }) => {
	const addItem = useCartStore((state) => state.addItem);
	const {cart} = useCartStore()
	const [selectedSize, setSelectedSize] = useState<Size | null>(null);
	const [isCartOpen, setIsCartOpen] = useState(false);



	const handleAddToCart = () => {
		if (selectedSize) {
			toast.success('Adding to cart..')
			addItem(product, selectedSize, 1);
		} else {
			toast.warning("Please select a size");
		}
	};

	return (
		<div className="flex flex-col gap-3 justify-center items-center xl:justify-start xl:items-start pt-2 w-full px-4 md:px-6 xl:px-8 max-w-screen-xl mx-auto">
			{/* Title */}

			<h1 className="font-bold text-xl lg:text-2xl text-[#1b130d]">
				{product.name}
				{" | "}
				<span className="text-medium font-normal text-[#1b130d]">
					{product.category}
				</span>
			</h1>

			{/* Reviews section */}
			<div className="flex flex-row gap-1 items-center justify-center">
				<RiStarSFill />
				<RiStarSFill />
				<RiStarSFill />
				<RiStarSFill />
				<RiStarSLine />
				<p className="text-base font-bold text-[#1b130d]">500 reviews</p>
			</div>

			<Select
				onChange={(e) => {
					const size = product.sizes.find((s) => s.size === e.target.value);
					setSelectedSize(size || null);
				}}
				variant="underlined"
				placeholder="Choose a size"
				label="Selected Size"
				className="max-w-xs"
			>
				{product.sizes.map((size) => (
					<SelectItem
						key={size.size}
						value={size.size}
					>
						{size.size.toLocaleUpperCase()}
					</SelectItem>
				))}
			</Select>
			<p className="text-sm font-normal text-[#1b130d]">
				Price: {selectedSize ? "$" : ""}
				{selectedSize?.price}
			</p>

			{/* About Section */}
			<div className="mt-4">
				<h3 className="text-xl font-semibold text-[#1b130d]">
					About Our Taste
				</h3>
				<ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-[#1b130d]">
					<li>
						A cup of coffee is a beverage essential because of its timeless
						appeal
					</li>
					<li>
						Easy to prepare. It can be brewed using various methods, from drip
						machines to manual pour-overs.
					</li>
					<li>
						Available in various sizes, from a standard espresso shot to a large
						Americano, catering to different preferences.
					</li>
					<li>
						You can customize your coffee by adding cream, sugar, or flavorings
						to suit your taste preferences.
					</li>
				</ul>
			</div>
			<div className="flex flex-row items-center justify-center gap-4">
				<Link href="/">
					<Button
						radius="md"
						className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-4"
					>
						Select More
					</Button>
				</Link>
				<Button
					radius="md"
					className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-4"
					onClick={handleAddToCart}
				>
					Add to basket
				</Button>
				{cart.length > 0 && (
					<Button
						radius="md"
						className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-4"
						onClick={() => setIsCartOpen(true)}
					>
						Open Cart
					</Button>
				)}
				{isCartOpen && <CartModal onClose={() => setIsCartOpen(false)}/>}
			</div>
		</div>
	);
};

export default ProductDetail;
