import apiClient from "@src/utils/apiClient";

export const getBukuBesar = async (params = {}) => {
	try {
		// console.log(params);

		const response = await apiClient.get(`/buku-besar`, {
			headers: {
				"Content-Type": "application/json",
			},
			params,
		});

		const data = response.data;
		return data;
	} catch (error) {
		console.error("Failed to fetch biaya rawat jalan:", error);
		throw error;
	}
};
