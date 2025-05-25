import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalStack: [],
};

const modalSlice = createSlice( {
    name: "modal",
    initialState,
    reducers: {
        /**
         * 
         * @description Adds a modal to the modal stack and displays it.
        * @param {Object} state - The current state of the modal slice.
        * @param {Object} action - The action object containing the payload.
        * @param {Object} action.payload - The payload for the modal.
        * @param {string} action.payload.id - The unique identifier for the modal (required).
        * @param {string} action.payload.title - The title of the modal.
        * @param {string} action.payload.titleElement - The title of the modal.
        * @param {string} action.payload.content - The content of the modal (required).
        * @param {boolean} [action.payload.isStaticBackdrop=false] - Whether the modal has a static backdrop.
        * @param {Function} [action.payload.onClose] - Callback function to execute when the modal is closed.
        * @param {string} [action.payload.size="large"] - The size of the modal.
         */
        showModal: ( state, action ) => {
            const { id, title, titleElement, content, isStaticBackdrop = false, onClose, size = "large" } = action.payload;

            if ( !id || !content ) {
                console.error( "Modal ID, title, and content are required." );
                return;
            }

            if ( state.modalStack.some( ( modal ) => modal.id === id ) ) {
                return;
            }

            state.modalStack.push( { id, title, titleElement, content, isStaticBackdrop/* , isOpen: true */, onClose, size } );

        },
        closeModal: ( state, action ) => {
            const id = action.payload;

            const closedModal = state.modalStack.find( ( modal ) => {
                console.log( modal.id, id );
                return modal.id === id;
            } );

            if ( closedModal ) {
                closedModal.isOpen = false;

                if ( closedModal.onClose ) {
                    closedModal.onClose();
                }
            }


            state.modalStack = state.modalStack.filter( ( modal ) => modal.id !== id );
        },
        clearAllModals: ( state ) => {
            state.modalStack = [];
        },
    },
} );

export const { showModal, closeModal, clearAllModals } = modalSlice.actions;

export default modalSlice.reducer;