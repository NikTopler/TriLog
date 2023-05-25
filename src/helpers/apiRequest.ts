import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse } from "@/interfaces";

const config: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'x-www-form-urlencoded'
    }
}

//TODO: Implement better error handling
async function handleApiRequest<T>(promise: Promise<AxiosResponse<ApiResponse<T>>>) {

    try {

        const { data: { data, success, errors } }: AxiosResponse<ApiResponse<T>> = await promise;

        if (success) {
            return data;
        }

        throw errors;

    } catch (error: any) {

        throw error;

    }

}

async function apiGet<T>(path: string, params: object) {
    return handleApiRequest<T>(axios.get(path, { params, ...config }));
}

async function apiPost<T>(path: string, data: object) {
    return handleApiRequest<T>(axios.post(path, data, config));
}

async function apiPut<T>(path: string, data: object) {
    return handleApiRequest<T>(axios.put(path, data, config));
}

async function apiDelete<T>(path: string, params: object) {
    return handleApiRequest<T>(axios.delete(path, { params, ...config }));
}

export {
    apiGet,
    apiPost,
    apiPut,
    apiDelete
};