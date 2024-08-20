'use client'

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { logout } from "@/utils/firebaseAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const SuccessBottom = () => {

	const router = useRouter()

    const handleLogout = async () => {
		await logout();
		toast.info('Logging Out')
		router.push('/')
		};

    return (
			<div className="flex flex-row gap-x-4 items-center justify-center">
				<Link href="/">
					<Button
						radius="md"
						className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-4"
					>
						Home
					</Button>
				</Link>
				<Button
					radius="md"
					className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-4"
					onClick={handleLogout}
				>
					Logout
				</Button>
			</div>
		);
}

export default SuccessBottom