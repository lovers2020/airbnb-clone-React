import { useQuery } from "react-query";
import { getMe } from "../global/api";
import { IUser } from "../global/types";

export default function useUser() {
    const { isLoading, data, isError } = useQuery<IUser>(["me"], getMe, {
        retry: false,
        refetchOnWindowFocus: false,
    });

    return {
        userLoading: isLoading,
        user: data,
        isLoggedIn: !isError,
    };
}
