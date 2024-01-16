import { FaMoon, FaSun } from "react-icons/fa";
import { FaAirbnb } from "react-icons/fa";
import {
    Avatar,
    Box,
    Button,
    HStack,
    IconButton,
    LightMode,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import LoginModal from "./loginModal";
import SignUpModal from "./signUpModal";
import { Link } from "react-router-dom";
import useUser from "../../lib/useUser";
import { logOut } from "../../global/api";
import { useQueryClient } from "react-query";

export default function Header() {
    const { userLoading, isLoggedIn, user } = useUser();
    const {
        isOpen: isLoginOpen,
        onClose: onLoginClose,
        onOpen: onLoginOpen,
    } = useDisclosure();
    const {
        isOpen: isLSignUpOpen,
        onClose: onLSignUpClose,
        onOpen: onLSignUpOpen,
    } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200");
    const Icon = useColorModeValue(FaMoon, FaSun);
    const toast = useToast();
    const queryClient = useQueryClient();
    async function onLogOut() {
        await logOut();
        queryClient.refetchQueries(["me"]);
        const toastId = toast({
            title: "Login out...!",
            description: "Sad to see you go...",
            status: "loading",
            position: "bottom-right",
            isClosable: true,
        });
        setTimeout(() => {
            toast.update(toastId, {
                status: "success",
                title: "Done!",
                description: "See you later!",
            });
        }, 1000);
    }

    return (
        <>
            <Box>
                <Stack
                    justifyContent="space-between"
                    alignItems={"center"}
                    px={40}
                    py={5}
                    direction={{ sm: "column", md: "row" }}
                    spacing={{ sm: 4, md: 0 }}
                    borderBottomWidth={1}
                >
                    <Box color={logoColor}>
                        <Link to={"/"}>
                            <FaAirbnb size={"48"} />
                        </Link>
                    </Box>

                    <HStack spacing={"2"}>
                        <IconButton
                            onClick={toggleColorMode}
                            variant={"ghost"}
                            aria-label="Toggle dark mode"
                            icon={<Icon />}
                        />
                        {!userLoading ? (
                            !isLoggedIn ? (
                                <>
                                    <Button onClick={onLoginOpen}>
                                        Log In
                                    </Button>
                                    <LightMode>
                                        <Button
                                            colorScheme={"red"}
                                            onClick={onLSignUpOpen}
                                        >
                                            Sign up
                                        </Button>
                                    </LightMode>
                                </>
                            ) : (
                                <Menu>
                                    <MenuButton>
                                        <Avatar
                                            name={user?.name}
                                            src={user?.avatar}
                                            size={"md"}
                                        />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={onLogOut}>
                                            Log out
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            )
                        ) : null}
                    </HStack>
                    <LoginModal
                        isOpen={isLoginOpen}
                        onClose={onLoginClose}
                    ></LoginModal>
                    <SignUpModal
                        isOpen={isLSignUpOpen}
                        onClose={onLSignUpClose}
                    />
                </Stack>
            </Box>
        </>
    );
}
