import { motion } from "framer-motion";
export default function ButtonWrap({ className, children, onClick }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.1, rotate: "0deg" }}
            whileTap={{ scale: 0.9, rotate: "0deg" }}
            className={className}
        >
            {children}
        </motion.button>
    );
}
