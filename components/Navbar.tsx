"use client";

import { useEffect, useState } from "react";
import { BsMinecart } from "react-icons/bs";
import { PiCoffeeDuotone } from "react-icons/pi";
import { auth } from "@/utils/firebaseAuth";
import { onAuthStateChanged } from "firebase/auth";
import { CiUser } from "react-icons/ci";

import useCartStore from "@/store/useCartStore";
import Link from "next/link";
import CartModal from "./CartModal";
import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";

const Navbar = () => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State to control LoginModal visibility

	const { cart } = useCartStore();
	const totalItems = cart.length;

	useEffect(() => {
		// Listen for auth state changes
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	return (
		<nav>
			<header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f3ece7] px-5 py-3 gap-2 w-full">
				<Link href="/">
					<div className="flex items-center gap-4 text-[#1b130d]">
						<PiCoffeeDuotone />
						<h2 className="text-[#1b130d] text-lg font-bold leading-tight tracking-[-0.015em]">
							Cafe 88
						</h2>
					</div>
				</Link>

				<div className="flex flex-1 justify-end gap-8">
					<div className="flex gap-2">
						<button
							className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f3ece7] text-[#1b130d] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
							onClick={() => setIsCartOpen(true)}
						>
							<BsMinecart size={17} />
						</button>

						{/* Conditionally render LoginModal or LogoutModal */}
						{isLoggedIn ? (
							<LogoutModal />
						) : (
							<button
								onClick={() => setIsLoginModalOpen(true)} // Open the LoginModal when clicked
								className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f3ece7] text-[#1b130d] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
							>
								<CiUser />
							</button>
						)}

						{/* Cart Modal */}
						{isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}

						{/* Login Modal */}
						<LoginModal
							isOpen={isLoginModalOpen}
							onClose={() => setIsLoginModalOpen(false)} // Close the LoginModal when needed
						/>

						{/* Display total items if there are items in the cart */}
						{totalItems > 0 && (
							<span className="absolute top-0 right-16 text-slate-900 rounded-xl text-sm flex items-center justify-center mt-1 mr-2">
								{totalItems}
							</span>
						)}
					</div>
				</div>
			</header>
		</nav>
	);
};

export default Navbar;
