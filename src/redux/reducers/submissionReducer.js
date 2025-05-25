const initialState = {
    isSubmitted: false,
    isLoading: false,
    isReset: false,
};

const submissionReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case "SUBMISSION/SUBMIT":
            return {
                ...state,
                isSubmitted: true,
                isLoading: true,
                isReset: false,
            };

        case "SUBMISSION/CANCEL":
            return {
                ...state,
                isSubmitted: false,
                isLoading: false,
                isReset: false,
            };
        case "SUBMISSION/RESET":
            return {
                ...state,
                isSubmitted: false,
                isLoading: false,
                isReset: true,
            };
        default:
            return state;
    }
};

export default submissionReducer;