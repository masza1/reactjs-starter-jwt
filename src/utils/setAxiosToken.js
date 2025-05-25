import axios from "axios";

// Function to set the token globally
const setAuthToken = ( token ) => {
    if ( token ) {
        // Set the Authorization header with the token
        axios.defaults.headers.common[ "Authorization" ] = `Bearer ${ token }`;
    } else {
        // Remove the Authorization header if no token exists
        delete axios.defaults.headers.common[ "Authorization" ];
    }
};

export default setAuthToken;