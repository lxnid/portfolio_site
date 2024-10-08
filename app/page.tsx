"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import Sidebar from "./components/sidebar";
import { Hero } from "./components/hero";
import About from "./components/about";
import { Work } from "./components/work";
import Gallery from "./components/webgallery";
import FixedBackground from "./components/FixedBackground";
import { HoverImageLinks } from "./components/HoverImageLinks";
import MyStory from "./components/MyStory";

// Define the type for section styles
interface SectionStyles {
	[key: string]: {
		backgroundColor: string;
		textColor: string;
	};
}

// Define section styles
const sectionStyles: SectionStyles = {
	sectionWork: {
		backgroundColor: "#ffffff",
		textColor: "#000000",
	},
	sectionAbout: {
		backgroundColor: "#000000",
		textColor: "#ffffff",
	},
	sectionHero: {
		backgroundColor: "#000000",
		textColor: "#ffffff",
	},
	sectionGallery: {
		backgroundColor: "#000000",
		textColor: "#ffffff",
	},
	sectionMenu: {
		backgroundColor: "#000000",
		textColor: "#ffffff",
	},
	sectionStory: {
		backgroundColor: "#000000",
		textColor: "#ffffff",
	},
};

export default function Home() {
	const [backgroundColor, setBackgroundColor] = useState<string>("#000000");
	const [textColor, setTextColor] = useState<string>("#ffffff");

	const handleScroll = () => {
		const sections = document.querySelectorAll("section");
		const scrollPosition = window.scrollY + window.innerHeight / 2;

		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.offsetHeight;
			const sectionId = section.getAttribute("id");

			// Ensure sectionId is not null before using it
			if (sectionId && sectionStyles[sectionId]) {
				if (
					scrollPosition >= sectionTop &&
					scrollPosition < sectionTop + sectionHeight
				) {
					setBackgroundColor(
						sectionStyles[sectionId].backgroundColor
					);
					setTextColor(sectionStyles[sectionId].textColor);
				}
			}
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<ReactLenis root options={{ lerp: 0.05 }}>
			<motion.div
				style={{ backgroundColor, color: textColor }}
				className="w-full h-full min-h-screen"
				transition={{ duration: 1, ease: "easeInOut" }}
			>
				<main className="overflow-hidden sm:overflow-visible">
					<FixedBackground color={backgroundColor} />
					<Sidebar />
					<Hero />
					<About />
					<Work />
					<Gallery />
					<MyStory />
					<HoverImageLinks />
				</main>
			</motion.div>
		</ReactLenis>
	);
}
