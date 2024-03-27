import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import {
  IoMenu,
  IoPeople,
  IoTimer,
  IoExitOutline,
  IoMoonOutline,
  IoSunnyOutline,
  IoSettingsOutline,
} from "react-icons/io5";

import { IconType } from "react-icons";
import { FiBell, FiChevronDown } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import ProfileDrawer from "../ProfileDrawer";
import { useState } from "react";

interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  to: string;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: MdDashboard, to: "/dashboard" },
  { name: "My Team", icon: IoPeople, to: "/team" },
  { name: "Next schedule", icon: IoTimer, to: "/next-schedule" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="2s ease"
      bg={useColorModeValue("white", "surfaceDark")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.100", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h={20} alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          Schedule
          <Text as="span" color="yellow">
            Whiz
          </Text>
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, to, ...rest }: NavItemProps) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        mt={{ base: 0, md: 2 }}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue("yellow", "gray.700"),
        }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="18" _groupHover={{}} as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { toggleColorMode } = useColorMode();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    // Clear authentication data (tokens, session)
    // Update user authentication state
    // Redirect user to login page
    navigate("/login");
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((isDrawerOpen) => !isDrawerOpen);
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("backgroundLight", "backgroundDark")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("backgroundLight", "backgroundDark")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<IoMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontWeight="bold"
      >
        {/* The current name based on the path location */}
        {location.pathname === "/dashboard"
          ? "Dashboard"
          : location.pathname === "/team"
            ? "Team"
            : location.pathname === "/next-schedule"
              ? "Next schedule"
              : "Schedule Whiz"}
      </Text>

      <HStack spacing={{ base: "0", md: "4" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />

        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar name="The user name" src="the url" />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">The user name</Text>
                  <Text
                    fontSize="xs"
                    color={useColorModeValue("black", "white")}
                  >
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.700")}
              borderColor={useColorModeValue("gray.100", "surfaceDark")}
              // Display in front of other elements
              zIndex="999"
            >
              <MenuItem onClick={toggleDrawer} justifyContent="space-between">
                Profile
                <IoSettingsOutline />
                <ProfileDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
              </MenuItem>
              <MenuItem
                onClick={toggleColorMode}
                justifyContent="space-between"
              >
                Theme
                {useColorModeValue(<IoMoonOutline />, <IoSunnyOutline />)}
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignOut} justifyContent="space-between">
                Sign out
                <IoExitOutline />
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const NavbarLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("backgroundLight", "backgroundDark")}
      h="full"
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>
        {/* Get the content of the path selected on app.tsx  */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default NavbarLayout;
