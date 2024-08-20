import { Blend } from "@/types/types"
import Image from "next/image"

interface BlendCardProps {
    blend: Blend
}


const BlendCard: React.FC<BlendCardProps> = ({blend}) => {
    return (
			<div className="flex flex-col gap-3 items-start justify-start">
				<div className="relative border-none rounded-lg w-full h-52">
					<Image
						src={blend.image}
						alt={blend.name}
						fill
						className="object-cover rounded-xl"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						priority
					/>
				</div>
				<div className="text-[#1b130d]">
					<h3 className="text-md font-semibold">{blend.name}</h3>
					<p className="text-sm font-extralight">{blend.description}</p>
				</div>
			</div>
		);
}

export default BlendCard