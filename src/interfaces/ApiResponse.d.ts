// TODO: implement errors type

interface ApiResponse<T> {
    success: boolean;
    data?: T,
    errors?: any[];
}

export default ApiResponse;