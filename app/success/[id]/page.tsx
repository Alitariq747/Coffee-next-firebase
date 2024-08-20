import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { Order } from "@/types/types";
import { getOrderById } from "@/utils/data/getOrders";
import SuccessBottom from "@/components/SuccessBottom";

const OrderSuccessPage = async ({ params }: { params: { id: string } }) => {
	const order = await getOrderById(params.id);

	if (!order) {
		return <p>Fetching order</p>;
    }
    

	return (
		<div className="container mx-auto w-2/3 h-screen">
			<div className="mt-16 flex flex-col border-slate-600 border p-12 items-center justify-center gap-4">
				<IoMdCheckmarkCircleOutline size={60} />

				<p className="text-slate-950 font-normal text-base">
					Hey {order.name},
				</p>
				<h1 className="text-slate-950 font-bold text-2xl">
					Your order is confirmed
				</h1>
                <p>Your order would be ready within {order.pickUpTime} minutes..</p>
                <SuccessBottom />
			
			</div>
		</div>
	);
};

export default OrderSuccessPage;
