import { InputField, MuiIcon, SpinnerComponent, Td } from "@src/components";
import Table from "@src/components/Table/Table";
import Th from "@src/components/Table/Th";
import { route } from "@src/routes/routeHelper";
import { useMutation } from "@tanstack/react-query";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getBukuBesar } from "./BukuBesar.service";
import { useState } from "react";
import Pagination from "@src/components/Pagination";
import { useShowDialog } from "@src/utils/dialog";
import { EachLoop } from "@src/utils/EachLoop";
import { formatCurrency } from "@src/utils/formatCurrency";
import useModalCustSupp from "@src/components/ModalCustSupp";

const BukuBesar = () => {
	const showDialog = useShowDialog();
	const navigate = useNavigate();
	const [dataList, setDataList] = useState([]);
	const [totalData, setTotalData] = useState(0);
	const showModalCustSupp = useModalCustSupp();

	const [filter, setFilter] = useState({
		startDate: `${new Date().getFullYear()}-01-01`,
		endDate: `${new Date().getFullYear()}-03-31`,
		CUSTSUPP: {},
		search: "",
	});

	const { mutate: mutateData, isPending } = useMutation({
		mutationFn: getBukuBesar,
		onSuccess: (data) => {
			if (data?.status === "success") {
				// console.log("Data fetched successfully:", data.data);

				setDataList(data.data);
				setTotalData(data.total || 0);
				// setDataList(Object.entries(data.data));
			}
		},
		onError: (error) => {
			console.error("Error fetching data:", error);
		},
	});

	const handleApplyFilter = () => {
		if (!filter.startDate || !filter.endDate) {
			showDialog({
				title: "Peringatan",
				message: "Pilih tanggal mulai dan tanggal selesai terlebih dahulu.",
				icon: "warning",
				confirmButtonText: "Ok",
				showCancelButton: false,
			});
			return;
		}
		if (!filter.CUSTSUPP?.KODECUSTSUPP) {
			showDialog({
				title: "Peringatan",
				message: "Pilih Customer atau Supplier terlebih dahulu.",
				icon: "warning",
				confirmButtonText: "Ok",
				showCancelButton: false,
			});
			return;
		}

		const params = {
			tanggal_mulai: filter.startDate,
			tanggal_selesai: filter.endDate,
			kodecustsupp: filter.CUSTSUPP?.KODECUSTSUPP || "",
			search: filter.search,
		};
		mutateData(params);
	};

	const handleArrowBackClick = () => {
		return navigate(route("dashboard"), { replace: true });
	};

	return (
		<>
			<div className="bg-light-surface dark:bg-dark-surface p-6 shadow-md">
				<div className="">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 ">
						<div>
							<h1 className="text-3xl font-semibold">Biaya Perawatan</h1>
						</div>
						<div className="flex items-center gap-6">
							<MuiIcon iconName="arrow_circle_left" className="!text-5xl" onClick={handleArrowBackClick} />
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-x-4 mb-6 basis-1-4-gap-2 bg-asu">
						<InputField
							wrapperClassName="w-full md:basis-gap-4-1/4"
							labelPosition="left"
							label="Cari"
							labelColor="text-gray-700"
							labelClassName="text-md font-normal"
							type="text"
							value={filter.search || ""}
							onChange={(e) => setFilter({ ...filter, search: e.target.value })}
							placeholder="Cari berdasarkan No. Bukti, Customer, atau Perawatan"
						/>

						<InputField
							wrapperClassName="w-full md:basis-gap-4-1/4"
							labelPosition="left"
							label="Tanggal Mulai"
							labelColor="text-gray-700"
							labelClassName="text-md font-normal"
							type="date"
							value={filter.startDate || ""}
							onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
						/>
						<InputField
							wrapperClassName="w-full md:basis-gap-4-1/4"
							labelPosition="left"
							label="Tanggal Selesai"
							labelColor="text-gray-700"
							labelClassName="text-md font-normal"
							type="date"
							value={filter.endDate || ""}
							onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
						/>

						<div className="flex justify-end w-full md:basis-gap-4-1/4">
							<button className="bg-brand-brown text-white px-4 py-2 rounded hover:bg-brand-brown/80" onClick={handleApplyFilter}>
								{isPending ? <SpinnerComponent color="white" /> : "Terapkan Filter"}
							</button>
						</div>

						<div className="w-full md:basis-gap-4-1/4">
							<InputField
								labelPosition="left"
								label="Pilih Customer / Supplier"
								labelColor="text-gray-700"
								labelClassName="text-md font-normal"
								wrapperClassName="mt-4"
								type="text"
								value={filter.CUSTSUPP?.NAMACUSTSUPP || ""}
								append={
									<MuiIcon
										iconName="switch_account"
										onClick={() =>
											showModalCustSupp({
												onChoose: (custSupp) => {
													setFilter({ ...filter, CUSTSUPP: custSupp });
												},
											})
										}
									/>
								}
								readOnly={true}
							/>
						</div>
					</div>
				</div>

				{/* Table Section */}
				<div className="mb-4">
					<p className="text-sm text-gray-500">Total Data: {totalData}</p>
				</div>

				<Table
					wrapperClass="w-6xl h-max-screen"
					countCoulumn={12}
					dataList={dataList}
					isLoading={isPending}
					theadChildren={
						<>
							<tr>
								<Th rowSpan="2" hAlign="text-center">
									No. Pensiunan
								</Th>
								<Th rowSpan="2" hAlign="text-center">
									Nama Pensiunan
								</Th>
								<Th rowSpan="2" hAlign="text-center">
									Periode Lalu
								</Th>
								<Th rowSpan="2" hAlign="text-center">
									Rawat Jalan
								</Th>
								<Th rowSpan="2" hAlign="text-center">
									Rawat Gigi
								</Th>
								<Th rowSpan="2" hAlign="text-center">
									Kacamata
								</Th>
								<Th rowSpan="2" hAlign="text-center">
									Jumlah Periode Ini
								</Th>
								<Th rowSpan="2" hAlign="text-center">
									Sampai Dengan Periode Ini
								</Th>
								<Th rowSpan="2" hAlign="text-center">
									Plafon
								</Th>
								<Th rowSpan="2" hAlign="text-center">
									Sisa Plafon
								</Th>
								<Th colSpan="2" hAlign="text-center">
									Rawat Inap
								</Th>
							</tr>
							<tr>
								<Th hAlign="text-center">Sebelumnya</Th>
								<Th hAlign="text-center">Periode Ini</Th>
							</tr>
						</>
					}
					rowCallback={(item, key) => {
						return (
							<>
								<tr>
									<Td>{item.nopeserta}</Td>
									<Td>{item.namacustsupp}</Td>
									<Td hAlign="text-end">{formatCurrency(item.rjbulanlalu)}</Td>
									<Td hAlign="text-end">{formatCurrency(item.RJ)}</Td>
									<Td hAlign="text-end">{formatCurrency(item.RG)}</Td>
									<Td hAlign="text-end">{formatCurrency(item.KC)}</Td>
									<Td hAlign="text-end">{formatCurrency(item.RJBulanIni)}</Td>
									<Td hAlign="text-end">{formatCurrency(item.RjSdBulanIni)}</Td>
									<Td hAlign="text-end">{formatCurrency(item.nilaiplafon)}</Td>
									<Td hAlign="text-end">{formatCurrency(item.SisaPlafon)}</Td>
									<Td hAlign="text-end">{formatCurrency(item.saldoawalri)}</Td>
									<Td hAlign="text-end">{formatCurrency(item.ribulanini)}</Td>
								</tr>
							</>
						);
					}}></Table>

				{/* <Pagination
					position="end"
					countData={totalData}
					limitPerPage={10}
					onChangePage={(page) => {
						console.log("Current Page:", page);
						// Implement pagination logic here if needed
					}}
				/> */}
			</div>
		</>
	);
};

export default BukuBesar;
