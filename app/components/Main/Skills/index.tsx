import { tech } from "@/content/data";
import { motion } from "framer-motion";
import Image from "next/image";
import { opacity } from "../../Preloader/anim";

const Skills = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1, delay: 0.5 }}
			viewport={{ once: true }}
			className="w-full grid gap-2 grid-cols-2 lg:grid-cols-4 p-2 sm:p-4"
		>
			{tech.map((t) => (
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: tech.indexOf(t) * 0.1 }}
					key={t.name}
					className="text-center border-1 rounded-md p-3 m-1 sm:m-2 flex gap-3 sm:gap-4 items-center justify-start dark:bg-zinc-900 dark:border-zinc-800 bg-zinc-300 border-zinc-200 hover:scale-105 transition-transform duration-200 cursor-pointer touch-manipulation"
				>
					<Image
						src={t.image}
						alt={`${t.name} icon`}
						width={24}
						height={24}
						className="rounded-full dark:bg-white sm:w-[30px] sm:h-[30px] flex-shrink-0"
					/>
					<h2 className="text-sm sm:text-base font-medium truncate">{t.name}</h2>
				</motion.div>
			))}
		</motion.div>
	);
};

export default Skills;
