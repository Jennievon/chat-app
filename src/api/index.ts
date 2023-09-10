import axios, { AxiosResponse } from "axios";
import useSWR, { SWRResponse, mutate } from "swr";

const API_BASE_URL = "https://assignment.bunq.com/api";
const token = "eWVWQpOXowD5Tem3fgiSaS6ZZRumks4d";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// SWR fetcher function
const fetcher = async <Data>(url: string): Promise<Data> => {
  try {
    const response: AxiosResponse<Data> = await axiosInstance.get(url);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
};

export const useGetData = <Data>(url: string): SWRResponse<Data, Error> => {
  const { data, error, mutate } = useSWR<Data, Error>(url, fetcher);

  //@ts-ignore
  return {
    data,
    error,
    mutate,
    isLoading: !error && !data,
  };
};

export const postData = async <Data>(
  url: string,
  body: object
): Promise<Data> => {
  try {
    const response: AxiosResponse<Data> = await axiosInstance.post(url, body);
    mutate(url);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to post data: ${error.message}`);
  }
};
