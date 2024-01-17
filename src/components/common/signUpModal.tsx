import { FaUserSecret } from "react-icons/fa";
import { FaEnvelopeOpen } from "react-icons/fa";
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
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./socialLogin";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { SignUp } from "../../global/api";
import { AxiosError } from "axios";
import { useState } from "react";

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}
interface ISignUpForm {
    username: string;
    password: string;
    name: string;
    email: string;
}
export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    const [errorCode, SetErrorCode] = useState<number>(0);
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ISignUpForm>();
    const toast = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation(SignUp, {
        onSuccess: () => {
            toast({
                title: "welcome!",
                status: "success",
            });
            onClose();
            queryClient.refetchQueries(["me"]);
        },
        onError: async (error: AxiosError) => {
            const errorObj = await error.toJSON();
            const errorKey = Object.entries(errorObj).filter(
                ([key]) => key === "status"
            );
            SetErrorCode((current) => errorKey[0][1]);
        },
    });
    function onSubmit({ username, password, name, email }: ISignUpForm) {
        mutation.mutate({ username, password, name, email });
        console.log(errorCode);
        if (errorCode !== 409) reset();
    }
    function onClickModalOverlay() {
        onClose();
        SetErrorCode(0);
        reset();
    }
    console.log(errorCode);

    return (
        <>
            <Modal onClose={onClickModalOverlay} isOpen={isOpen}>
                <ModalOverlay></ModalOverlay>
                <ModalContent>
                    <ModalHeader>Sign up</ModalHeader>
                    <ModalCloseButton></ModalCloseButton>
                    <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                        <VStack>
                            <InputGroup>
                                <InputLeftElement
                                    children={
                                        <Box color="gray.500">
                                            <FaUserSecret />
                                        </Box>
                                    }
                                />
                                <Input
                                    isInvalid={Boolean(errors.name?.message)}
                                    type={"text"}
                                    {...register("name", {
                                        required: "Please write a name",
                                        pattern: {
                                            value: /^[A-za-z가-힣]{3,20}$/,
                                            message:
                                                "only possible to english, korean",
                                        },
                                    })}
                                    variant={"filled"}
                                    placeholder="Name"
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement
                                    children={
                                        <Box color="gray.500">
                                            <FaEnvelopeOpen />
                                        </Box>
                                    }
                                />
                                <Input
                                    isInvalid={Boolean(errors.email?.message)}
                                    type={"text"}
                                    {...register("email", {
                                        required: "Please write a email",
                                        pattern: emailRegex,
                                    })}
                                    variant={"filled"}
                                    placeholder="Email"
                                />
                                {errors.email?.type === "pattern" && (
                                    <Text
                                        textAlign={"center"}
                                        fontSize={"0.8rem"}
                                    >
                                        Please check email form.
                                    </Text>
                                )}
                                {errorCode === 409 ? (
                                    <Text
                                        textAlign={"center"}
                                        fontSize={"13px"}
                                        color={"red.500"}
                                    >
                                        Username or Email are already exist.
                                    </Text>
                                ) : null}
                            </InputGroup>
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
                                    type={"text"}
                                    {...register("username", {
                                        required: "Please write a username",
                                    })}
                                    variant={"filled"}
                                    placeholder="Username"
                                />
                                {errorCode === 409 ? (
                                    <Text
                                        textAlign={"center"}
                                        fontSize={"13px"}
                                        color={"red.500"}
                                    >
                                        Username or Email are already exist.
                                    </Text>
                                ) : null}
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
                                    type={"password"}
                                    {...register("password", {
                                        required: "Please write a password",
                                    })}
                                    variant={"filled"}
                                    placeholder="Password"
                                />
                            </InputGroup>
                        </VStack>
                        <Button
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
