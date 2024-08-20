'use client'

import { FaInstagram } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { FiTwitter } from "react-icons/fi";





const Footer = () => {
  return (
		<footer className="mt-6 md:mt-12 container mx-auto flex flex-col gap-4 md:gap-6 w-2/3 md:w-1/3 sticky">
			<div className="flex flex-row items-center justify-between text-md font-normal text-[#1b130d]">
				<h3>Privacy Policy</h3>
				<h3>Terms of Service</h3>
			</div>
			<div className="flex flex-col items-center justify-center gap-4">
				<div className="flex flex-row items-center justify-center gap-4">
					<FaInstagram
						size={20}
						color="#1b130d"
					/>
					<SlSocialFacebook size={20} />
					<FiTwitter size={20} />
				</div>
				<h2>LaCafe &trade;</h2>
			</div>
		</footer>
	);
}

export default Footer