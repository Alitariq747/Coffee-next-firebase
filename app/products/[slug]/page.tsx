import { getSingleProduct } from "@/utils/data/getProducts";
import Image from "next/image";
import ProductDetail from "@/components/ProductDetail";

const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
	const slug = params.slug;

	const product = await getSingleProduct(slug);

	if (!product) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex w-full h-screen flex-col xl:flex-row gap-4 md:gap-12 justify-start mt-10">
			<div className="h-56 w-72 relative md:h-[400px] md:w-[700px] max-xl:mx-auto xl:p-8 xl:ml-8 xl:h-[600px] xl:w-[800px]">
				<Image
					src={product.image}
					alt={product.name}
					fill
					className="rounded-xl object-cover"
					priority
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>
			<div className="flex flex-col gap-3 items-center xl:items-start justify-start">
				<ProductDetail product={product} />
			</div>
		</div>
	);
};

export default ProductDetailPage;
