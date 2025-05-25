import { closeModal, showModal } from "@src/redux/reducers/modalReducer";

import { Button } from "@src/components";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const useShowDialog = () => {
    const [modalId] = useState(`modal-dialog-` + Date.now());
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal(modalId));
    };

    const getIcon = (iconType) => {
        switch (iconType) {
            case "warning":
                return <span className="material-icons mr-2 text-warning">warning</span>;
            case "info":
                return <span className="material-icons mr-2 text-info">info</span>;
            case "success":
                return <span className="material-icons mr-2 text-success">check_circle</span>;
            case "error":
                return <span className="material-icons mr-2 text-danger">error</span>;
            default:
                return <span className="material-icons mr-2">help_outline</span>;
        }
    };

    return ({
        title = "",
        message = "",
        icon = "warning",
        showCancelButton = true,
        confirmButtonText = "Ok",
        cancelButtonText = "Cancel",
        isCancelOutline = false,
        isConfirmOutline = false,
        isReverseButton = false,
        confirmButtonColor = "primary",
        cancelButtonColor = "danger",
        confirmButtonClass = "primary",
        cancelButtonClass = "danger",
    }) => {
        return new Promise((resolve) => {
            dispatch(
                showModal({
                    id: modalId,
                    titleElement: (
                        <>
                            <div className="flex align-middle justify-start">
                                {getIcon(icon)}
                                {title}
                            </div>
                        </>
                    ),
                    size: "small",
                    content: (
                        <>
                            <div className="px-4">
                                <p className="leading-1 py-2 text-sm">{message}</p>
                                <div className={`flex justify-end pt-4`}>
                                    {showCancelButton && (
                                        <Button
                                            color={cancelButtonColor}
                                            className={`px-8 py-2 mx-1 ${cancelButtonClass} ${isReverseButton ? "order-2" : ""}`}
                                            size="small"
                                            isOutline={isCancelOutline}
                                            onClick={() => {
                                                handleCloseModal();
                                                resolve({ isConfirmed: false, isDissmissed: true });
                                            }}>
                                            {cancelButtonText}
                                        </Button>
                                    )}
                                    <Button
                                        color={confirmButtonColor}
                                        className={`px-8 py-2 mx-1 ${confirmButtonClass}`}
                                        size="small"
                                        isOutline={isConfirmOutline}
                                        onClick={() => {
                                            handleCloseModal();
                                            resolve({ isConfirmed: true, isDissmissed: false });
                                        }}>
                                        {confirmButtonText}
                                    </Button>
                                </div>
                            </div>
                        </>
                    ),
                    onClose: () => resolve({ isConfirmed: false, isDissmissed: true }),
                })
            );
        });
    };
};
