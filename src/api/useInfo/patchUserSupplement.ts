import axios from "../axiosConfig";

export default async function patchUserSupplement(
	storageId: number,
	userSupplement: FormData,
) {
	const response = await axios.patch(`/storages/${storageId}`, userSupplement, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
}
