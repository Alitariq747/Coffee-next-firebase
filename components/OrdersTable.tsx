"use client";

import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Button,
} from "@nextui-org/react";

import { Order } from "@/types/types";
import { getOrders } from "@/utils/data/getOrders";
import { markOrderAsComplete } from "@/utils/data/createOrder";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const OrdersTable = () => {
	const [dataLoading, setDataLoading] = useState(true);
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		// Fetch orders with real-time updates
		const unsubscribe = getOrders((fetchedOrders) => {
			// Filter out completed orders
			const pendingOrders = fetchedOrders.filter((order) => !order.completed);
			setOrders(pendingOrders);
			setDataLoading(false);
		});

		// Optional: cleanup listener on unmount
		return () => unsubscribe && unsubscribe();
	}, []);

	const handleMarkAsComplete = async (orderId: string) => {
		await markOrderAsComplete(orderId);
	};

	if (dataLoading) {
		return <Loader />;
	}

	if (orders.length === 0) {
		return <h1>No Pending Orders...</h1>;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3 p-4">
			{orders.map((order) => (
				<Card
					className="max-w-[400px]"
					key={order.id}
				>
					<CardHeader className="flex gap-3">
						<div className="flex flex-col">
							<p className="text-md">Customer: {order.name}</p>
							<p className="text-small text-default-500">
								Total Bill: {order.bill}
							</p>
							<p className="text-small text-default-500">{`Pick Up time: ${order.pickUpTime} minutes`}</p>
						</div>
					</CardHeader>
					<Divider />
					<CardBody>
						<h3 className="text-base font-semibold">Details:</h3>
						{order.items.map((item) => (
							<p key={item.id}>
								{`${item.selectedQuantity} ${item.selectedSize} ${item.name}`}
							</p>
						))}
					</CardBody>
					<Divider />
					<CardFooter>
						<Button
							color="primary"
							size="sm"
							disabled={order.completed}
							onClick={() => handleMarkAsComplete(order.id)}
						>
							{order.completed ? "Completed" : "Mark as complete"}
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
};

export default OrdersTable;
