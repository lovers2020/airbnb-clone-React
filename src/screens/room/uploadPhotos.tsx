import {
    Box,
    Button,
    Center,
    Container,
    FormControl,
    Heading,
    HStack,
    Input,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

import useHostOnlyPage from "../../components/hostOnlyPage";
import useProtectedPage from "../../components/protectedPage";
import { CreatePhoto, getUploadURL, UploadImage } from "../../global/api";

interface IForm {
    file: FileList;
}
interface IUploadURLResponse {
    id: string;
    uploadURL: string;
}
export default function UploadPhotos() {
    const { register, handleSubmit, watch, reset } = useForm<IForm>();
    const toast = useToast();
    const createPhotoMuataion = useMutation(CreatePhoto, {
        onSuccess: () => {
            toast({
                status: "success",
                title: "Image Uploaded!",
                description: "Feel free to upload more images.",
                isClosable: true,
                position: "bottom-right",
            });
            reset();
        },
    });
    const uploadImageMutation = useMutation(UploadImage, {
        onSuccess: ({ result }: any) => {
            if (roomPk) {
                createPhotoMuataion.mutate({
                    description: "I Love react",
                    file: `https://imagedelivery.net/lwkcitGcrq7lY0_fE2f2Dw/${result.id}/public`,
                    roomPk,
                });
            }
        },
    });
    const uploadURLMutation = useMutation(getUploadURL, {
        onSuccess: (data: IUploadURLResponse) => {
            uploadImageMutation.mutate({
                uploadURL: data.uploadURL,
                file: watch("file"),
            });
        },
    });
    const { roomPk } = useParams();
    useHostOnlyPage();
    useProtectedPage();

    const onSubmit = (data: any) => {
        uploadURLMutation.mutate();
    };
    return (
        <>
            <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
                <Container>
                    <Heading textAlign={"center"}>Upload a Photo</Heading>
                    <VStack
                        as="form"
                        spacing={5}
                        mt={10}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FormControl>
                            <Input
                                {...register("file")}
                                type="file"
                                accept="image/*"
                            />
                        </FormControl>
                        <Button
                            isLoading={
                                createPhotoMuataion.isLoading ||
                                uploadImageMutation.isLoading ||
                                uploadURLMutation.isLoading
                            }
                            type="submit"
                            w="100%"
                            colorScheme={"red"}
                        >
                            Upload photos
                        </Button>
                    </VStack>
                </Container>
            </Box>
        </>
    );
}
