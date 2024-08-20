import Image from "next/image";

const Banner = () => {
    return (
			<div className="relative container mx-auto mt-5 border rounded-xl shadow-md md:w-2/3 w-full h-60 md:h-96 lg:h-[700px] m-4">
				<Image
					src="https://images.pexels.com/photos/428310/pexels-photo-428310.jpeg?auto=compress&cs=tinysrgb&w=800"
					alt="banner-image"
					fill
					className="rounded-xl shadow-md"
					quality={100}
					priority
				/>
				<div className="absolute bottom-2 md:bottom-4 text-left p-4 text-white flex flex-col gap-2 md:gap-4">
					<h1 className="text-lg font-semibold lg:font-extrabold lg:text-6xl">
						Explore `The` Best coffees in town...
					</h1>
					<p className="text-sm font-normal">
						Now Your favourite coffee is at a click away!
					</p>
				</div>
			</div>
		);
}

export default Banner


    
