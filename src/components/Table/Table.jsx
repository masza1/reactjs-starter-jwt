import { EachLoop } from "@src/utils/EachLoop";
import Td from "./Td";

const Table = ({
	wrapperClass = "",
	tableClass = "",
	countCoulumn = 0,
	dataList = [],
	isLoading = false,
	theadChildren,
	emptyMessage = "No data available",
	rowCallback = null,
	children = null,
}) => {
	const showLoading = () => {
		return (
			<>
				<EachLoop
					of={Array.from({ length: 5 })}
					render={(_, index) => {
						return (
							<tr>
								<EachLoop
									of={Array.from({ length: countCoulumn })}
									render={(_, _index) => {
										return (
											<Td>
												<div className="h-4 w-32 bg-gray-300 rounded-sm animate-pulse"></div>
											</Td>
										);
									}}
								/>
							</tr>
						);
					}}
				/>
			</>
		);
	};

	const tbodySection = () => {
		if (isLoading) {
			return showLoading();
		} else if (dataList.length === 0) {
			return (
				<tr>
					<Td colSpan={countCoulumn} hAlign="text-center">
						{emptyMessage}
					</Td>
				</tr>
			);
		} else if (rowCallback && !children) {
			return (
				<EachLoop
					of={dataList}
					render={(item, index) => {
						return rowCallback(item, index);
					}}
				/>
			);
		} else if (children) {
			return children;
		}
		return null;
	};

	return (
		<div className={`overflow-x-auto ${wrapperClass}`}>
			<table className={`min-w-full bg-white overflow-x-auto text-nowrap ${tableClass}`}>
				<thead>{theadChildren}</thead>
				<tbody>{tbodySection()}</tbody>
			</table>
		</div>
	);
};

export default Table;
