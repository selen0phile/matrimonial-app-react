import { motion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi";
export default function Button({ onClick, text, className, icon = false }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.5, rotate: "-5deg" }}
            whileTap={{ scale: 0.7, rotate: "5deg" }}
            className={
                className ||
                "bg-white rounded-[10px] btn1 flex items-center justify-center h-[40px] w-[130px]"
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
