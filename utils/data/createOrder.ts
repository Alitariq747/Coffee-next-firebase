import { getDatabase, ref, set, push, update } from "firebase/database";
import { Order } from "@/types/types";
import app from "@/firebaseConfig";

export const createOrder = async (order: Order) => {
	const db = getDatabase(app);
	const ordersRef = ref(db, "orders"); // Reference to the 'orders' node

	// Push creates a unique ID for each order
	const newOrderRef = push(ordersRef);
	await set(newOrderRef, {
		...order,
		createdAt: new Date().toISOString(), // Store the createdAt timestamp as a string
	});

	return newOrderRef.key; // Return the unique order ID
};



export const markOrderAsComplete = async (orderId: string) => {
	const db = getDatabase(app);
	const orderRef = ref(db, `orders/${orderId}`);

	// Update the 'completed' field to true
	await update(orderRef, {
		completed: true,
	});

	console.log(`Order ${orderId} marked as complete.`);
};
