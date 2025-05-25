import { useDispatch, useSelector } from "react-redux";

import { EachLoop } from "../utils/EachLoop";
import { closeModal } from "../redux/reducers/modalReducer";

const ModalComponent = () => {
	const modalStack = useSelector((state) => state.modal.modalStack);
	const dispatch = useDispatch();

	if (modalStack.length === 0) return null;

	const modalSize = {
		small: "lg:min-w-[400px] min-w-[8%]",
		medium: "lg:min-w-[600px] min-w-[20%]",
		large: "lg:min-w-[1000px] min-w-[90%]",
	};
	return (
		<div>
			<EachLoop
				of={modalStack}
				render={(modal) => (
					<div
						id={modal.id}
						className={`modal overflow-y-auto fixed inset-0 items-start justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out flex opacity-100 `}
						onClick={() =>
							!modal.isStaticBackdrop &&
							dispatch(closeModal(modal.id))
						}>
						<div
							className={`lg:my-20 md:my-20 my-10 bg-white rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-300 ease-out sm:max-w-lg sm:w-full ${
								modalSize[modal.size]
							}`}
							onClick={(event) => event.stopPropagation()}>
							<div className="bg-white">
								<div className="bg-grey flex justify-between items-center px-4 py-3 border-b">
									<div>
										{modal.titleElement ? (
											modal.titleElement
										) : modal.title ? (
											<h3
												className="text-lg leading-6 font-medium text-gray-900"
												id="modalTitle">
												{modal.title}
											</h3>
										) : (
											<>&nbsp;</>
										)}
									</div>
									<button
										onClick={() =>
											dispatch(closeModal(modal.id))
										}
										type="button"
										className="text-gray-500 hover:text-gray-700">
										<i className="material-icons">close</i>
									</button>
								</div>
								<div className="mt-2 px-4 pt-3 pb-4 sm:pb-4">
									{modal.content}
								</div>
							</div>
						</div>
					</div>
				)}
			/>
		</div>
	);
};

export default ModalComponent;
