import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	signInWithGoogle,
	signUpWithEmail,
	signInWithEmail,
	auth,
} from "@/utils/firebaseAuth";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Checkbox,
	Input,
} from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { LockIcon, MailIcon } from "./Icons";
import useCartStore from "@/store/useCartStore";
import { toast } from "sonner";

const LoginModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
	isOpen,
	onClose,
}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSignUp, setIsSignUp] = useState(false);
	const router = useRouter();

	const { cart } = useCartStore();

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	const handleSignInWithGoogle = async () => {
		await signInWithGoogle();
		toast.success("Signing In...");

		onClose(); // Close the modal after successful login
		if (cart.length > 0) {
			router.push("/confirm-order");
		} else {
			router.push("/");
		}
	};

	const handleEmailSubmit = async () => {
		if (isSignUp) {
			await signUpWithEmail(email, password);
			toast.success("Signing Up...");
		} else {
			await signInWithEmail(email, password);
			toast.success("Signing In...");
		}
		onClose(); // Close the modal after successful login
		if (cart.length > 0) {
			router.push("/confirm-order");
		} else {
			router.push("/");
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onClose}
			placement="top-center"
		>
			<ModalContent>
				{() => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							{isSignUp ? "Sign up" : "Log In"}
						</ModalHeader>
						<ModalBody>
							<Input
								autoFocus
								endContent={
									<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
								}
								label="Email"
								placeholder="Enter your email"
								variant="bordered"
								onChange={handleEmailChange}
							/>
							<Input
								endContent={
									<LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
								}
								label="Password"
								placeholder="Enter your password"
								type="password"
								variant="bordered"
								onChange={handlePasswordChange}
							/>
							<div className="flex py-2 px-1 justify-between">
								<Checkbox classNames={{ label: "text-small" }}>
									Remember me
								</Checkbox>
								<Button
									color="danger"
									variant="flat"
									size="sm"
									onClick={() => setIsSignUp(!isSignUp)}
								>
									{isSignUp ? "Log in instead" : "Sign up instead"}
								</Button>
							</div>
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
								color="danger"
								variant="flat"
								onClick={handleEmailSubmit}
							>
								{isSignUp ? "Sign Up" : "Login"}
							</Button>
							<Button
								color="danger"
								variant="flat"
								onPress={handleSignInWithGoogle}
							>
								<FcGoogle />
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default LoginModal;
