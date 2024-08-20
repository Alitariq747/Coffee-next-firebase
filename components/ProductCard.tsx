import Image from "next/image";
import { Card, CardFooter, Button } from "@nextui-org/react";
import { Product } from "@/types/types";
import React from "react";
import Link from "next/link";

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	return (
		<Card
			isFooterBlurred
			radius="lg"
			className="border-none relative w-64 h-52 md:w-40 md:h-40 xl:w-64 xl:h-52"
		>
			<Image
				alt="Woman listing to music"
				className="object-cover"
				src={product.image}
				fill
				quality={100}
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			/>
			<CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
				<p className="text-tiny text-white/80">
					{product.name + ": $" + product.sizes[0].price}
				</p>
				<Link href={`products/${product.slug}`}>
					<Button
						className="text-tiny text-white bg-black/20"
						variant="flat"
						color="default"
						radius="lg"
						size="sm"
					>
						Details
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
};

export default ProductCard;
