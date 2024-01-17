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
