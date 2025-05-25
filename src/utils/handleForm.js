export const handleFormChange = ( keyPath, value, callback ) => {
    if ( value?.target ) {
        value = value.target.value;
    }

    callback( ( prevForm ) => {
        // Split the keyPath into an array of keys
        const keys = keyPath.split( "." );

        // Create a shallow copy of the previous state
        const updatedForm = { ...prevForm };

        // Traverse the object to find the target property
        let current = updatedForm;
        for ( let i = 0; i < keys.length - 1; i++ ) {
            const key = keys[ i ];
            // Ensure the current level exists and is an object
            if ( !current[ key ] || typeof current[ key ] !== "object" ) {
                current[ key ] = {};
            }
            // Move deeper into the object
            current = current[ key ];
        }

        // Update the final property with the new value
        const lastKey = keys[ keys.length - 1 ];
        current[ lastKey ] = value;

        return updatedForm;
    } );
};

export const convertToFormData = ( data ) => {
    const formData = new FormData();
    for ( const key in data ) {
        if ( data[ key ] instanceof File ) {
            formData.append( key, data[ key ] );
        } else if ( typeof data[ key ] === "object" && data[ key ] !== null ) {
            formData.append( key, JSON.stringify( data[ key ] ) );
        } else {
            formData.append( key, data[ key ] );
        }
    }
    return formData;
}