import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    InputGroup,
    InputLeftAddon,
    Select,
    Skeleton,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { FaChild, FaEdit, FaStar } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
    checkBooking,
    createBooking,
    getRoomDetail,
    getRoomReviews,
} from "../../global/api";
import { IReview, IRoomBooking, IRoomDetail } from "../../global/types";
import "react-calendar/dist/Calendar.css";
import "../../global/calendar.css";
import { useState } from "react";
import Calendar from "react-calendar";
import { Helmet } from "react-helmet";
import { formatDate } from "../../lib/utils";
import { useForm } from "react-hook-form";
import uuid from "react-uuid";

export default function RoomDetail() {
    const { roomPk } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<IRoomBooking>();
    const [dates, setDates] = useState<Date[]>();
    const { isLoading, data } = useQuery<IRoomDetail>(
        ["rooms", roomPk],
        getRoomDetail
    );
    const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
        IReview[]
    >(["rooms", roomPk, "reviews"], getRoomReviews);
    const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery(
        ["check", roomPk, dates],
        checkBooking,
        {
            cacheTime: 0,
            enabled: dates !== undefined,
        }
    );
    const toast = useToast();
    const muation = useMutation(createBooking, {
        onSuccess: (data: IRoomBooking) => {
            toast({
                status: "success",
                title: "Booked!",
                position: "bottom-right",
            });
        },
    });

    function onEditClick(event: React.SyntheticEvent<HTMLButtonElement>) {
        event.preventDefault();
        navigate(`/rooms/${roomPk}/edit`);
    }
    function onBookingClick(data: IRoomBooking) {
        if (dates && roomPk) {
            const [firstDate, secondDate] = dates;
            const checkIn = formatDate(firstDate);
            const checkOut = formatDate(secondDate);
            data.check_in = checkIn;
            data.check_out = checkOut;
            data.pk = roomPk;
            muation.mutate(data);
        }
    }

    return (
        <>
            <Helmet>
                <title>{data ? data.name : "Loading"}</title>
            </Helmet>
            <Box pb={10} mt={10} px={{ base: 10, lg: 40 }}>
                <Skeleton h={"43px"} isLoaded={!isLoading}>
                    <HStack>
                        <Heading>{data?.name}</Heading>
                        <Button onClick={onEditClick}>
                            {data?.is_owner ? <FaEdit /> : null}
                        </Button>
                    </HStack>
                </Skeleton>
                <Grid
                    mt={8}
                    rounded="xl"
                    overflow={"hidden"}
                    h={"60vh"}
                    templateRows={"1fr 1fr"}
                    templateColumns={"repeat(4,1fr)"}
                    gap={2}
                >
                    {[0, 1, 2, 3, 4].map((index) => (
                        <GridItem
                            colSpan={index === 0 ? 2 : 1}
                            rowSpan={index === 0 ? 2 : 1}
                            overflow={"hidden"}
                            key={index}
                        >
                            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
                                {data?.photos && data?.photos.length !== 0 ? (
                                    <Image
                                        width="100%"
                                        h="100%"
                                        objectFit="cover"
                                        src={data?.photos[index]?.file}
                                    />
                                ) : null}
                            </Skeleton>
                        </GridItem>
                    ))}
                </Grid>
                <Grid gap={60} templateColumns={"2fr 1fr"}>
                    <Box>
                        <HStack mt={"10"} justify="space-between">
                            <VStack alignItems={"flex-start"}>
                                <Skeleton isLoaded={!isLoading} h="30px">
                                    <Heading fontSize="2xl">
                                        House hosted by {data?.owner.name}
                                    </Heading>
                                </Skeleton>
                                <Skeleton isLoaded={!isLoading} h="30px">
                                    <HStack justify={"flex-start"} w="100%">
                                        <Text>
                                            {data?.toilets} toilet
                                            {data?.toilets === 1 ? "" : "s"}
                                        </Text>
                                        <Text>·</Text>
                                        <Text>
                                            {data?.rooms} room
                                            {data?.rooms === 1 ? "" : "s"}
                                        </Text>
                                    </HStack>
                                </Skeleton>
                            </VStack>
                            <Avatar
                                name={data?.owner.name}
                                size={"xl"}
                                src={data?.owner.avatar}
                            ></Avatar>
                        </HStack>
                        <Box mt={10}>
                            <Heading fontSize={"2xl"} mb={5}>
                                <Skeleton isLoaded={!isReviewsLoading}>
                                    <HStack>
                                        <FaStar />
                                        <Text>{data?.rating}</Text>
                                        <Text>·</Text>
                                        <Text>
                                            {reviewsData?.length} review
                                            {reviewsData?.length === 1
                                                ? ""
                                                : "s"}
                                        </Text>
                                    </HStack>
                                </Skeleton>
                            </Heading>
                            <Container
                                mt={16}
                                marginX={"none"}
                                maxW="container.lg"
                            >
                                <Grid templateColumns={"1fr 1fr"} gap={10}>
                                    {reviewsData?.map((review, index) => (
                                        <VStack
                                            alignItems={"flex-start"}
                                            key={index}
                                        >
                                            <HStack>
                                                <Avatar
                                                    name={review.user.name}
                                                    src={review.user.avatar}
                                                    size="md"
                                                ></Avatar>
                                                <VStack
                                                    align="flex-start"
                                                    spacing={0}
                                                >
                                                    <Heading fontSize={"md"}>
                                                        {review.user.name}
                                                    </Heading>
                                                    <HStack spacing={1}>
                                                        <FaStar size={"12px"} />
                                                        <Text>
                                                            {review.rating}
                                                        </Text>
                                                    </HStack>
                                                </VStack>
                                            </HStack>
                                            <Text>{review.payload}</Text>
                                        </VStack>
                                    ))}
                                </Grid>
                            </Container>
                        </Box>
                    </Box>
                    <VStack
                        as={"form"}
                        pt={10}
                        onSubmit={handleSubmit(onBookingClick)}
                    >
                        <Calendar
                            formatDay={(locale, date) =>
                                date.toLocaleString("en", { day: "numeric" })
                            }
                            onChange={setDates as any}
                            prev2Label={null}
                            next2Label={null}
                            minDetail="month"
                            minDate={new Date()}
                            maxDate={
                                new Date(
                                    Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000
                                )
                            }
                            selectRange
                        />
                        <HStack justifyContent={"space-between"}>
                            <Text>Guests</Text>
                            <InputGroup>
                                <InputLeftAddon
                                    children={<FaChild />}
                                ></InputLeftAddon>
                                <Select
                                    {...register("guests", { required: true })}
                                    defaultValue={1}
                                >
                                    {[1, 2, 3, 4].map((current) => (
                                        <option key={uuid()} value={current}>
                                            {current}
                                        </option>
                                    ))}
                                </Select>
                            </InputGroup>
                        </HStack>
                        <Button
                            isLoading={isCheckingBooking}
                            isDisabled={!checkBookingData?.ok}
                            mt={5}
                            w="100%"
                            colorScheme={"red"}
                            type="submit"
                        >
                            Make booking
                        </Button>

                        {!checkBookingData?.ok && !isCheckingBooking ? (
                            <Text color={"red.500"}>
                                Can't book on those dates, sorry.
                            </Text>
                        ) : null}
                    </VStack>
                </Grid>
            </Box>
        </>
    );
}
