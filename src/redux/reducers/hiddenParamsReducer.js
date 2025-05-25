const initialState = {
    path: "",
    hiddenParams: {},
    firstSet: true,
    countToReset: 1,
};

const hiddenParamsReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case "SET_HIDDEN_PARAMS": {
            const { path } = action.payload;
            return {
                ...state,
                path: path,
                hiddenParams: {
                    ...action.payload,
                },
                countToReset: 1,
            };
        }
        case "RESET_HIDDEN_PARAMS":
            if ( state.firstSet ) {
                return {
                    ...state,
                    firstSet: false,
                };
            } else if ( state.countToReset > 0 ) {
                return {
                    ...state,
                    countToReset: state.countToReset - 1,
                };
            }

            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default hiddenParamsReducer;