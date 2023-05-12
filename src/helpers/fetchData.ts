import { ApiResponse } from "@/interfaces";
import axios, { AxiosResponse } from "axios";

//TODO: Implement better error handling
async function fetchData<T>(path: string, params: any) {

    try {        

        const { data: { data, success, errors } }: AxiosResponse<ApiResponse<T>> = await axios.get(path, { params });

        if (success) {
            return data;
        }

        throw errors;

    } catch (error: any) {

        throw error;

    }

}

export default fetchData;