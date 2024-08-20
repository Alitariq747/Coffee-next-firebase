import { getBlends } from "@/utils/data/getProducts"
import BlendCard from "./BlendCard";

const CoffeeBlendGrid = async () => {

    const blends = await getBlends()

    if (!blends) {
			return <div className="w-full mx-auto my-auto">Loading....</div>;
		}

    return (
			<div className="container mx-auto w-2/3 mt-10 pb-4 flex flex-col gap-5">
            <h1 className="text-lg md:text-2xl font-bold text-[#1b130d]">
                Our Best Selling Beans
				</h1>
				<div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
					{blends.map((blend) => (
						<BlendCard
							blend={blend}
							key={blend.id}
						/>
					))}
				</div>
			</div>
		);
}

export default CoffeeBlendGrid