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
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUserNinja } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import {
    IUsernameLoginError,
    IUsernameLoginSuccess,
    IUsernameLoginVariables,
    usernameLogin,
} from "../../global/api";
import SocialLogin from "./socialLogin";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}
interface IForm {
    username: string;
    password: string;
}
export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IForm>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation<
        IUsernameLoginSuccess,
        IUsernameLoginError,
        IUsernameLoginVariables
    >(usernameLogin, {
        onSuccess: (data) => {
            toast({
                title: "welcome back",
                status: "success",
            });
            onClose(); // 모달 창을 닫기 위함
            reset();
            queryClient.refetchQueries(["me"]);
        },
    });
    const onSubmit = ({ username, password }: IForm) => {
        mutation.mutate({ username, password });
    };
    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen}>
                <ModalOverlay></ModalOverlay>
                <ModalContent>
                    <ModalHeader>Log in</ModalHeader>
                    <ModalCloseButton></ModalCloseButton>
                    <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
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
                                    isInvalid={Boolean(
                                        errors.username?.message
                                    )}
                                    type="text"
                                    {...register("username", {
                                        required: "Please write a username",
                                    })}
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
                                    isInvalid={Boolean(
                                        errors.password?.message
                                    )}
                                    type="password"
                                    {...register("password", {
                                        required: "Please write a password",
                                    })}
                                    variant={"filled"}
                                    placeholder="Password"
                                />
                            </InputGroup>
                        </VStack>
                        {mutation.isError ? (
                            <Text
                                color={"red.500"}
                                textAlign="center"
                                fontSize={"sm"}
                            >
                                Username or Password are wrong.
                            </Text>
                        ) : null}

                        <Button
                            isLoading={mutation.isLoading}
                            type="submit"
                            w={"100%"}
                            mt={4}
                            colorScheme="red"
                        >
                            Log in
                        </Button>
                        <SocialLogin></SocialLogin>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
