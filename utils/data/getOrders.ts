import { getDatabase, ref, onValue, get } from "firebase/database";
import { Order } from "@/types/types";
import app from "@/firebaseConfig";

export const getOrders = (callback: (orders: Order[]) => void) => {
	const db = getDatabase(app);
	const ordersRef = ref(db, "orders");

	// Listen for real-time updates
	const unsubscribe = onValue(ordersRef, (snapshot) => {
		const data = snapshot.val();
		const orders: Order[] = [];

		for (let id in data) {
			orders.push({ id, ...data[id] });
		}

		// Sort by createdAt if needed
		orders.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);

		// Trigger the callback with the orders data
		callback(orders);
	});

	// Return the cleanup function to unsubscribe the listener
	return unsubscribe;
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
	try {
		const db = getDatabase(app);
		const orderRef = ref(db, `orders/${orderId}`);

		const snapshot = await get(orderRef);

		if (snapshot.exists()) {
			// Combine the ID with the fetched data
			const order = { id: orderId, ...snapshot.val() } as Order;
			return order;
		} else {
			console.log("No order found with the given ID.");
			return null;
		}
	} catch (error) {
		console.error("Error fetching order: ", error);
		return null;
	}
};
