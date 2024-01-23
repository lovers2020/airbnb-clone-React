import axios from "axios";
import Cookies from "js-cookie";
import { QueryFunctionContext } from "react-query";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    withCredentials: true,
});

export const getRooms = () =>
    axiosInstance.get("rooms/").then((response) => response.data);

export const getRoomDetail = ({ queryKey }: QueryFunctionContext) => {
    const [, roomPk] = queryKey;
    return axiosInstance
        .get(`rooms/${roomPk}`)
        .then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
    const [, roomPk] = queryKey;
    return axiosInstance
        .get(`rooms/${roomPk}/reviews`)
        .then((response) => response.data);
};
export const getMe = () => {
    return axiosInstance.get("users/me").then((response) => response.data);
};

export const logOut = () =>
    axiosInstance
        .post("users/log-out", null, {
            headers: {
                "X-CSRFToken": Cookies.get("csrftoken") || "",
            },
        })
        .then((response) => response.data);

export const githubLogIn = (code: string) =>
    axiosInstance
        .post(
            "/users/github",
            { code },
            {
                headers: {
                    "X-CSRFToken": Cookies.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.status);

export const kakaoLogin = (code: string) =>
    axiosInstance
        .post(
            "/users/kakao",
            { code },
            {
                headers: {
                    "X-CSRFToken": Cookies.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.status);

// Mutation
export interface IUsernameLoginVariables {
    username: string;
    password: string;
}
export interface IUsernameLoginSuccess {
    ok: string;
}
export interface IUsernameLoginError {
    error: string;
}
export const usernameLogin = ({
    username,
    password,
}: IUsernameLoginVariables) =>
    axiosInstance
        .post(
            "/users/log-in",
            { username, password },
            {
                headers: {
                    "X-CSRFToken": Cookies.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.data);

export interface ISignUpVariables {
    username: string;
    password: string;
    email: string;
    name: string;
}
export const SignUp = ({ username, password, email, name }: ISignUpVariables) =>
    axiosInstance
        .post(
            "/users/sign-up",
            { username, password, email, name },
            {
                headers: {
                    "X-CSRFToken": Cookies.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.data);

export const getAmenites = () =>
    axiosInstance.get("rooms/amenities").then((response) => response.data);

export const getCategories = () =>
    axiosInstance.get("categories").then((response) => response.data);

export interface IUploadRoomVariables {
    name: string;
    country: string;
    city: string;
    price: number;
    rooms: number;
    toilets: number;
    description: string;
    address: string;
    pet_friendly: Boolean;
    kind: string;
    amenities: number[];
    category: number;
}

export const uploadRoom = (variables: IUploadRoomVariables) =>
    axiosInstance
        .post("/rooms/", variables, {
            headers: {
                "X-CSRFToken": Cookies.get("csrftoken") || "",
            },
        })
        .then((response) => response.data);

export const getUploadURL = () =>
    axiosInstance
        .post("/medias/photos/get-url", null, {
            headers: {
                "X-CSRFToken": Cookies.get("csrftoken") || "",
            },
        })
        .then((response) => response.data);
export interface IUploadImageVariables {
    file: FileList;
    uploadURL: string;
}
export const UploadImage = ({ file, uploadURL }: IUploadImageVariables) => {
    const form = new FormData();
    form.append("file", file[0]);
    return axios
        .post(uploadURL, form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
};
export interface ICreatePhotoVariables {
    description: string;
    file: string;
    roomPk: string;
}
export const CreatePhoto = ({
    description,
    file,
    roomPk,
}: ICreatePhotoVariables) =>
    axiosInstance
        .post(
            `rooms/${roomPk}/photos`,
            { description, file },
            {
                headers: {
                    "X-CSRFToken": Cookies.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.data);
type CheckBookingQueryKey = [string, string?, Date[]?];
export const checkBooking = ({
    queryKey,
}: QueryFunctionContext<CheckBookingQueryKey>) => {
    const [, roomPk, dates] = queryKey;
    if (dates) {
        const [firstDate, secondDate] = dates;
        const [checkIn] = firstDate.toJSON().split("T");
        const [checkOut] = secondDate.toJSON().split("T");
        return axiosInstance
            .get(
                `rooms/${roomPk}/bookings/check?check_in=${checkIn}&check_out=${checkOut}`
            )
            .then((response) => response.data);
    }
};
