import { motion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi";
export default function Button({ onClick, text, className, icon, iconLeft = true }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.5, rotate: "-5deg" }}
            whileTap={{ scale: 0.7, rotate: "5deg" }}
            className={
                className ||
                "rounded-[10px] btn2 flex items-center justify-center h-[40px] w-[130px]"
            }
        >
            {text}
            {icon && (
                <>
                    &nbsp; <HiOutlineArrowRight />
                </>
            )}
        </motion.button>
    );
}
