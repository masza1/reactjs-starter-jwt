import { closeModal, showModal } from "@src/redux/reducers/modalReducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Table from "./Table/Table";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "@src/utils/apiClient";
import InputField from "./forms/InputField";
import Th from "./Table/Th";
import Td from "./Table/Td";
import Button from "./Button";

const useModalCustSupp = () => {
	const [modalId] = useState(`modal-custsupp-` + Date.now());
	const [dataList, setDataList] = useState([]);
	const [search, setSearch] = useState("");
	const dispatch = useDispatch();

	const getCustSupp = async (params) => {
		try {
			// console.log(params);

			const response = await apiClient.get(`/get-custsupp`, {
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

	const { mutate: mutateData, isPending: isPendingM } = useMutation({
		mutationFn: getCustSupp,
		onSuccess: (data) => {
			if (data?.status === "success") {
				setDataList(data.data);
			}
		},
		onError: (error) => {
			console.error("Error fetching data:", error);
		},
	});

	const handleCloseModal = () => {
		dispatch(closeModal(modalId));
	};
	return ({ onChoose = (custsupp) => {} }) => {
        mutateData({ search: search });
		return new Promise((resolve) => {
			dispatch(
				showModal({
					id: modalId,
					title: "Pilih Supplier / Customer",
					size: "large",
					content: (
						<>
							<div className="px-4">
								<div>
									<div className="w-full">
										<InputField
											label="Cari Supplier / Customer"
											value={search}
											onChange={(e) => {
												setSearch(e.target.value);
												mutateData({ search: e.target.value });
											}}
											placeholder="Masukkan nama supplier atau customer"
											className="w-full mb-4"
											labelPosition="top"
										/>
									</div>
									<Table
										dataList={dataList}
										countCoulumn={5}
										isLoading={isPendingM}
										theadChildren={
											<>
												<tr>
													<Th hAlign="text-center">Kode</Th>
													<Th hAlign="text-center">Nama</Th>
													<Th hAlign="text-center">Alamat</Th>
													<Th hAlign="text-center">Telpon</Th>
													<Th hAlign="text-center"></Th>
												</tr>
											</>
										}
										rowCallback={(item, key) => {
											return (
												<>
													<tr>
														<Td>{item.KODECUSTSUPP}</Td>
														<Td>{item.NAMACUSTSUPP}</Td>
														<Td></Td>
														<Td></Td>
														<Td>
															<Button
																onClick={() => {
																	handleCloseModal();
																	onChoose(item);
																	resolve(item);
																}}>
																Pilih
															</Button>
														</Td>
													</tr>
												</>
											);
										}}></Table>
								</div>
								<div className={`flex justify-end pt-4`}>
									<Button
										color={"gray"}
										className={`px-8 py-2 mx-1}`}
										size="small"
										isOutline={true}
										onClick={() => {
											handleCloseModal();
											onChoose(null);
											resolve(null);
										}}>
										Tutup
									</Button>
								</div>
							</div>
						</>
					),
				})
			);
		});
	};
};

export default useModalCustSupp;
