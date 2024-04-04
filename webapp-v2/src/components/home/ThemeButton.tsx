import { AnimatePresence, motion } from "framer-motion";
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IoMoon, IoSunny } from "react-icons/io5";

const ThemeButton = () => {
  const { toggleColorMode } = useColorMode();
  const iconColor = useColorModeValue("gray", "white");

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        style={{ display: "inline-block" }}
        key={useColorModeValue("light", "dark")}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.12 }}
      >
        <IconButton
          aria-label="Toggle theme"
          colorScheme={useColorModeValue("white", "backgroundDark")}
          _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
          size="xs"
          icon={useColorModeValue(
            <IoMoon size={16} color={iconColor} />,
            <IoSunny size={16} color={iconColor} />,
          )}
          onClick={toggleColorMode}
        ></IconButton>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeButton;
