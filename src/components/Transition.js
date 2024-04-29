import { animate, motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, y: 1000 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0 },
};

const animations2 = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 },
};

const Transition = ({ children }) => {
  return (
    <>
      <motion.div
        variants={animations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default Transition;
