import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    Select,
    Text,
    Textarea,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getAmenites, getCategories, uploadRoom } from "../../global/api";
import {
    IAmenity,
    ICategory,
    IRoomDetail,
    IUploadRoomVariables,
} from "../../global/types";
import useHostOnlyPage from "../../components/hostOnlyPage";
import useProtectedPage from "../../components/protectedPage";

export default function UploadRoom() {
    const { register, watch, handleSubmit } = useForm<IUploadRoomVariables>();
    console.log(watch());
    const { data: amenities, isLoading: amenitiesLoading } = useQuery<
        IAmenity[]
    >(["amenities"], getAmenites);
    const { data: categories, isLoading: categoriesLoading } = useQuery<
        ICategory[]
    >(["categories"], getCategories);
    const toast = useToast();
    const navigate = useNavigate();
    const mutation = useMutation(uploadRoom, {
        onSuccess: (data: IRoomDetail) => {
            toast({
                status: "success",
                title: "Room created",
                position: "bottom-right",
            });
            navigate(`/rooms/${data.pk}`);
        },
    });

    function onSubmit(data: IUploadRoomVariables) {
        mutation.mutate(data);
    }

    useHostOnlyPage();
    useProtectedPage();
    return (
        <>
            <Box
                pb={40}
                mt={10}
                px={{
                    base: 10,
                    lg: 40,
                }}
            >
                <Container>
                    <Heading textAlign={"center"}>Upload Room</Heading>
                    <VStack
                        spacing={"10"}
                        as="form"
                        mt={5}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                {...register("name", {
                                    required: true,
                                })}
                                type="text"
                            />
                            <FormHelperText>
                                Write the name of your room
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Country</FormLabel>
                            <Input
                                {...register("country", {
                                    required: true,
                                })}
                                type="text"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>City</FormLabel>
                            <Input
                                {...register("city", {
                                    required: true,
                                })}
                                type="text"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input
                                {...register("address", {
                                    required: true,
                                })}
                                type="text"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaDollarSign />} />
                                <Input
                                    {...register("price", {
                                        required: true,
                                        min: 0,
                                    })}
                                    type="number"
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Rooms</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaBed />} />
                                <Input
                                    {...register("rooms", {
                                        required: true,
                                        min: 0,
                                    })}
                                    type="number"
                                    min={0}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Toilets</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaToilet />} />
                                <Input
                                    {...register("toilets", {
                                        required: true,
                                        min: 0,
                                    })}
                                    type="number"
                                    min={0}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                {...register("description", {
                                    required: true,
                                })}
                            ></Textarea>
                        </FormControl>
                        <FormControl>
                            <Checkbox {...register("pet_friendly")}>
                                Pet friendly?
                            </Checkbox>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kind of room</FormLabel>
                            <Select
                                {...register("kind", {
                                    required: true,
                                })}
                                placeholder="Choose a kind"
                            >
                                <option value="entire_place">
                                    Entire_Place
                                </option>
                                <option value="private_room">
                                    Private_Room
                                </option>
                                <option value="shared_room">Shared_Room</option>
                            </Select>
                            <FormHelperText>
                                What kind of room are you lending?
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <Select
                                {...register("category", {
                                    required: true,
                                })}
                                placeholder="Choose a category"
                            >
                                {categories?.map((category) => (
                                    <option
                                        key={category.pk}
                                        value={category.pk}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </Select>
                            <FormHelperText>
                                What category describes your room?
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Amenities</FormLabel>
                            <Grid templateColumns={"1fr 1fr"} gap={5}>
                                {amenities?.map((amenity) => (
                                    <Box key={amenity.pk}>
                                        <Checkbox
                                            value={amenity.pk}
                                            {...register("amenities", {
                                                required: true,
                                            })}
                                        >
                                            {amenity.name}
                                        </Checkbox>
                                        <FormHelperText>
                                            {amenity.description}
                                        </FormHelperText>
                                    </Box>
                                ))}
                            </Grid>
                        </FormControl>
                        {mutation.isError ? (
                            <Text color={"red.500"}>Something went wrong</Text>
                        ) : null}
                        <Button
                            type="submit"
                            isLoading={mutation.isLoading}
                            colorScheme={"red"}
                            size={"lg"}
                            w="100%"
                        >
                            Upload Room
                        </Button>
                    </VStack>
                </Container>
            </Box>
        </>
    );
}
