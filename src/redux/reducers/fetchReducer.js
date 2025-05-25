const initialState = {
    dataList: [],
    isLoading: false,
    error: null,
    paginationMeta: {
        currentPage: 1,
        limitPerPage: 10,
        totalData: 0,
    },
};
const fetchReducer = ( state = initialState, action = {} ) => {
    // console.log("trigger change ", action.type, action.payload);

    switch ( action.type ) {
        case "FETCH_SET_PAGINATION":
            return { ...state, paginationMeta: { ...state.paginationMeta, ...action.payload } };
        case "FETCH_DATA_REQUEST":
            return { ...state, isLoading: true, error: null };
        case "FETCH_DATA_SUCCESS":
            return { ...state, isLoading: false, error: null, ...action.payload };
        case "FETCH_DATA_FAILURE":
            return { ...state, isLoading: false, error: action.error, ...action.payload };
        case "RESET_FETCH_STATE":
            return initialState;
        case "FETCH_DATA_RESET":
            return { ...state, dataList: [] };
        default:
            return state;
    }
};

export default fetchReducer;