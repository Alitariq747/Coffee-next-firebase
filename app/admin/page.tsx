'use client'



import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import app from "@/firebaseConfig";
import OrdersTable from "@/components/OrdersTable";
import Loader from "@/components/Loader";


const AdminPage = () => {
	const [loading, setLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);
	
	const auth = getAuth(app);
	const db = getFirestore(app);
	const router = useRouter();

	useEffect(() => {
		const checkAdmin = async (user: any) => {
			if (!user) {
				router.push("/");
				return;
			}

			const userDoc = doc(db, "users", user.uid);
			const userSnapshot = await getDoc(userDoc);

			if (userSnapshot.exists() && userSnapshot.data().role === "admin") {
				setIsAdmin(true);
			} else {
				router.push("/");
			}

			setLoading(false);
		};

		// Listen for auth state changes
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			checkAdmin(user);
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
    }, [auth, db, router]);
    

	if (loading) return <Loader />;

	if (!isAdmin) return null;

	

	return (
		<div className="p-4 w-2/3 container mx-auto mt-4 min-h-screen">
			<h1 className="text-2xl font-bold">Admin Dashboard</h1>
			<p>Welcome, {auth.currentUser?.email}!</p>
			<div className="flex flex-row p-3 items-center justify-between">
				<h1 className="text-xl font-bold pt-5">Current Orders</h1>
			
			</div>
			<OrdersTable />
		</div>
	);
};

export default AdminPage;

