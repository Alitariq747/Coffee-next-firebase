import { auth, logout } from "@/utils/firebaseAuth";
import { useRouter } from "next/navigation";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react";
import { FaUserCheck } from "react-icons/fa";
import { toast } from "sonner";

export default function LogoutModal() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const router = useRouter()

	const handleLogout = async () => {
		await logout();
		toast.info('Logging out...')
		router.push('/')

	};

	return (
		<div>
			<button
				className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f3ece7] text-[#1b130d] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
				onClick={onOpen}
			>
				<FaUserCheck size={17} />
			</button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Logged In
							</ModalHeader>
							<ModalBody>
								<h2>Welcome {auth.currentUser?.email} to Cafe 88</h2>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="flat"
									onPress={onClose}
								>
									Close
								</Button>
								<Button
									color="primary"
									onClick={handleLogout}
									onPress={onClose}
								>
									Log out
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
