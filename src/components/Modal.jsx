import { motion } from "framer-motion";

export default function Modal({ children, isOpen, setIsOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setIsOpen(false)}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center"
    >
      <motion.div
        className="w-full md:w-fit"
        initial={{ scale: 0, rotate: "20deg" }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: "-20deg" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
