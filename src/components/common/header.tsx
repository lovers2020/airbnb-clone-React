import { FaMoon, FaSun } from "react-icons/fa";
import { FaAirbnb } from "react-icons/fa";
import {
    Box,
    Button,
    HStack,
    IconButton,
    LightMode,
    Stack,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import LoginModal from "./loginModal";
import SignUpModal from "./signUpModal";
import { Link } from "react-router-dom";

export default function Header() {
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
                        <Button onClick={onLoginOpen}>Log In</Button>
                        <LightMode>
                            <Button colorScheme={"red"} onClick={onLSignUpOpen}>
                                Sign up
                            </Button>
                        </LightMode>
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
