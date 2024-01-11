import {
    Box,
    Button,
    Grid,
    Heading,
    HStack,
    Image,
    Skeleton,
    SkeletonText,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import Layout from "../components/common/layout";
import Room from "../components/room/room";
import RoomSkeleton from "../components/room/roomSkeleton";

interface IPhoto {
    pk: string;
    file: string;
    description: string;
}

interface IRoom {
    pk: number;
    name: string;
    country: string;
    city: string;
    price: number;
    rating: number;
    is_owner: boolean;
    photos: IPhoto[];
}

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [rooms, SetRooms] = useState<IRoom[]>([]);
    const fetchRooms = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/v1/rooms/");
        const json = await response.json();
        SetRooms(json);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchRooms();
    }, []);
    return (
        <>
            <Layout />
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
                {rooms.map((room) => (
                    <Room
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
