import { Spinner } from "@nextui-org/react";

const Loader = () => {
    return (
			<div className="container mx-auto w-2/3 h-screen mt-8">
				<div className="flex flex-col gap-8 md:gap-12 items-center justify-center">
					<h1 className="text-2xl md:text-4xl font-bold text-slate-950">
						Processing...
					</h1>
					<Spinner size="lg" />
				</div>
			</div>
		);
}

export default Loader