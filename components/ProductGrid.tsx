import { getProducts } from "@/utils/data/getProducts"

import ProductCard from "./ProductCard";

interface ProductGridProps {
	category: string
}


const ProductGrid: React.FC<ProductGridProps> = async ({category}) => {

    const products = await getProducts(category)

    
    if (!products) {
        return <div className="w-full mx-auto my-auto">Loading....</div>
    }

	return (
		<div className="container mx-auto w-2/3 mt-10 pb-4 flex flex-col gap-5">
			<h1 className="text-lg md:text-2xl font-bold text-[#1b130d]">
				Featured {category}
			</h1>
			<div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-2">
				{products.map((product) => (
					<ProductCard
						product={product}
						key={product.id}
					/>
				))}
			</div>
		</div>
	);
}

export default ProductGrid