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
import { useNavigate, useParams } from "react-router-dom";
import {
    editRoom,
    getAmenites,
    getCategories,
    getRoomDetail,
} from "../../global/api";
import {
    IAmenity,
    ICategory,
    IRoomDetail,
    IUploadRoomVariables,
} from "../../global/types";
import useHostOnlyPage from "../../components/hostOnlyPage";
import useProtectedPage from "../../components/protectedPage";
import uuid from "react-uuid";

export default function EditRoom() {
    const { register, handleSubmit } = useForm<IUploadRoomVariables>();
    const { roomPk } = useParams();
    const { data: roomData, isLoading: roomDataisLoading } =
        useQuery<IRoomDetail>(["editRoom", roomPk], getRoomDetail);
    const { data: amenities, isLoading: amenitiesLoading } = useQuery<
        IAmenity[]
    >(["amenities"], getAmenites);
    const { data: categories, isLoading: categoriesLoading } = useQuery<
        ICategory[]
    >(["categories"], getCategories);

    let checkAmenities: number[] = [];
    roomData?.amenities?.map((index) => checkAmenities.push(index.pk));

    const toast = useToast();
    const navigate = useNavigate();
    const mutation = useMutation(editRoom, {
        onSuccess: (data: IRoomDetail) => {
            toast({
                status: "success",
                title: "Modified!",
                position: "bottom-right",
            });
            data.pk = Number(roomPk);
            navigate(`/rooms/${roomPk}`);
        },
    });

    function onSubmit(data: IUploadRoomVariables) {
        if (roomPk) {
            data.roomPk = roomPk;
            mutation.mutate(data);
        }
    }
    const isLoading =
        roomDataisLoading && amenitiesLoading && categoriesLoading;
    useHostOnlyPage();
    useProtectedPage();
    return (
        <>
            {!isLoading ? (
                <Box
                    pb={40}
                    mt={10}
                    px={{
                        base: 10,
                        lg: 40,
                    }}
                >
                    <Container>
                        <Heading textAlign={"center"}>Edit Room</Heading>
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
                                    defaultValue={roomData?.name}
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
                                    defaultValue={roomData?.country}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>City</FormLabel>
                                <Input
                                    {...register("city", {
                                        required: true,
                                    })}
                                    type="text"
                                    defaultValue={roomData?.city}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    {...register("address", {
                                        required: true,
                                    })}
                                    type="text"
                                    defaultValue={roomData?.address}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon
                                        children={<FaDollarSign />}
                                    />
                                    <Input
                                        {...register("price", {
                                            required: true,
                                            min: 0,
                                        })}
                                        type="number"
                                        defaultValue={roomData?.price}
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
                                        defaultValue={roomData?.rooms}
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
                                        defaultValue={roomData?.toilets}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    {...register("description", {
                                        required: true,
                                    })}
                                    defaultValue={roomData?.description}
                                ></Textarea>
                            </FormControl>
                            <FormControl>
                                <Checkbox
                                    defaultChecked={roomData?.pet_friendly}
                                    {...register("pet_friendly")}
                                >
                                    Pet friendly?
                                </Checkbox>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Kind of room</FormLabel>
                                <Select
                                    {...register("kind", {
                                        required: true,
                                    })}
                                    defaultValue={roomData?.kind}
                                    placeholder="Choose a kind"
                                >
                                    <option value="entire_place">
                                        Entire_Place
                                    </option>
                                    <option value="private_room">
                                        Private_Room
                                    </option>
                                    <option value="shared_room">
                                        Shared_Room
                                    </option>
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
                                    key={uuid()}
                                    defaultValue={roomData?.category.pk}
                                >
                                    {categories?.map((category, index) => (
                                        <option
                                            key={uuid()}
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
                                    {amenities?.map((amenity, index) => (
                                        <Box key={uuid()}>
                                            <Checkbox
                                                defaultChecked={
                                                    checkAmenities.filter(
                                                        (index) =>
                                                            index === amenity.pk
                                                    ).length > 0
                                                        ? true
                                                        : false
                                                }
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
                                <Text color={"red.500"}>
                                    Something went wrong
                                </Text>
                            ) : null}
                            <Button
                                type="submit"
                                isLoading={mutation.isLoading}
                                colorScheme={"red"}
                                size={"lg"}
                                w="100%"
                            >
                                Edit Room
                            </Button>
                        </VStack>
                    </Container>
                </Box>
            ) : null}
        </>
    );
}
