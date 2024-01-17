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
    ToastId,
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
import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";

export default function Header() {
    const { userLoading, isLoggedIn, user } = useUser();
    const {
        isOpen: isLoginOpen,
        onClose: onLoginClose,
        onOpen: onLoginOpen,
    } = useDisclosure();
    const {
        isOpen: isSignUpClose,
        onClose: onSignUpClose,
        onOpen: onSignUpOpen,
    } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("red.500", "red.200");
    const Icon = useColorModeValue(FaMoon, FaSun);
    const toast = useToast();
    const queryClient = useQueryClient();
    const toastId = useRef<ToastId>();

    const mutation = useMutation(logOut, {
        onMutate: () => {
            toastId.current = toast({
                title: "Login out...!",
                description: "Sad to see you go...",
                status: "loading",
                position: "bottom-right",
                isClosable: true,
            });
        },
        onSuccess: () => {
            queryClient.refetchQueries(["me"]);
            if (toastId.current) {
                toast.update(toastId.current, {
                    status: "success",
                    title: "Done!",
                    description: "See you later!",
                });
            }
        },
    });
    async function onLogOut() {
        mutation.mutate();
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
                                            onClick={onSignUpOpen}
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
                        isOpen={isSignUpClose}
                        onClose={onSignUpClose}
                    />
                </Stack>
            </Box>
        </>
    );
}
