import {
	getAuth,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import app from "@/firebaseConfig";
import db from "./firestore";

const auth = getAuth(app)

const signInWithGoogle = async () => {
	try {
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
		const user = result.user;
		const userDoc = doc(db, "users", user.uid);

		const userSnapshot = await getDoc(userDoc);
		if (!userSnapshot.exists()) {
			await setDoc(userDoc, { email: user.email, role: "user" }); // default role: user
		}
	} catch (error) {
		console.error("Error signing in: ", error);
	}
};

const signUpWithEmail = async (email: string, password: string) => {
	try {
		const result = await createUserWithEmailAndPassword(auth, email, password);
		const user = result.user;
		const userDoc = doc(db, "users", user.uid);

		await setDoc(userDoc, { email: user.email, role: "user" }); // default role: user
	} catch (error) {
		console.error("Error signing up: ", error);
	}
};

const signInWithEmail = async (email: string, password: string) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.error("Error signing in: ", error);
	}
};

const logout = () => {
	signOut(auth);
};

export { auth, signInWithGoogle, signUpWithEmail, signInWithEmail, logout };