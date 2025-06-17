import apiClient from "@src/utils/apiClient";

export const getBiayaPerawatan = async (params = {}) => {
	try {
		// console.log(params);

		const response = await apiClient.get(`/biaya-perawatan`, {
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
