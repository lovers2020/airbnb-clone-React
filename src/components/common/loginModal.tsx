import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
} from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./socialLogin";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen}>
                <ModalOverlay></ModalOverlay>
                <ModalContent>
                    <ModalHeader>Log in</ModalHeader>
                    <ModalCloseButton></ModalCloseButton>
                    <ModalBody>
                        <VStack>
                            <InputGroup>
                                <InputLeftElement
                                    children={
                                        <Box color="gray.500">
                                            <FaUserNinja />
                                        </Box>
                                    }
                                />
                                <Input
                                    variant={"filled"}
                                    placeholder="Username"
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement
                                    children={
                                        <Box color="gray.500">
                                            <FaLock />
                                        </Box>
                                    }
                                />
                                <Input
                                    variant={"filled"}
                                    placeholder="Password"
                                />
                            </InputGroup>
                        </VStack>
                        <Button w={"100%"} mt={4} colorScheme="red">
                            Log in
                        </Button>
                        <SocialLogin></SocialLogin>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
