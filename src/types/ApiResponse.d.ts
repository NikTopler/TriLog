// TODO: implement errors type

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    errors?: any[];
}

export default ApiResponse;