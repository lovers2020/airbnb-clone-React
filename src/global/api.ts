import axios from "axios";
import { QueryFunctionContext } from "react-query";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
});

export const getRooms = () =>
    axiosInstance.get("rooms/").then((response) => response.data);

export const getRoomDetail = ({ queryKey }: QueryFunctionContext) => {
    const [, roomPk] = queryKey;
    return axiosInstance
        .get(`rooms/${roomPk}`)
        .then((response) => response.data);
};
