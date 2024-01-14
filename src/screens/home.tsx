import { Grid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import Room from "../components/room/room";
import RoomSkeleton from "../components/room/roomSkeleton";
import { getRooms } from "../global/api";
import { IRoomList } from "../global/types";

export default function Home() {
    const { isLoading, data } = useQuery<IRoomList[]>(["rooms"], getRooms);

    return (
        <>
            <Grid
                mt={10}
                px={{ base: 10, lg: 40 }}
                columnGap={4}
                rowGap={8}
                templateColumns={{
                    sm: "1fr",
                    md: "1fr 1fr",
                    lg: "repeat(3,1fr)",
                    xl: "repeat(4,1fr)",
                    "2xl": "repeat(5,1fr)",
                }}
            >
                {isLoading ? (
                    <>
                        <RoomSkeleton />
                    </>
                ) : null}
                {data?.map((room, index) => (
                    <Room
                        key={room.pk}
                        pk={room.pk}
                        name={room.name}
                        imageURL={room.photos[0].file}
                        rating={room.rating}
                        city={room.city}
                        country={room.country}
                        price={room.price}
                    />
                ))}
            </Grid>
        </>
    );
}
