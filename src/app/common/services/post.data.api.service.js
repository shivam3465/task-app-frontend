import axios from "axios";
import { AppConfig } from "../constants/app.config";

//this will send get request to passed url
export const postDataApiService = async (url, body) => {
	const { API_BASE_URL } = AppConfig;

	const apiURL = `${API_BASE_URL}/api/v1/${url}`;
	try {
		const { data } = await axios.post(apiURL, body, {
			withCredentials: true,
			headers: { "Content-Type": "application/json" },
		});
		return [data, null];
	} catch (error) {
		return [null, error];
	}
};
