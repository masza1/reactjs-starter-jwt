import { toast } from "react-toastify";

export const validateForm = ( schema, data ) => {
    // console.log( "Form data:", data );

    const validatedForm = schema.safeParse( data );

    if ( !validatedForm.success ) {
        console.log( "Validation errors:", validatedForm.error.errors );

        const firstError = validatedForm.error.errors[ 0 ]?.message || "Validation failed";
        toast.error( firstError ); // Assuming you have a toast library like react-toastify
        return null;
    }

    return validatedForm.success ? validatedForm.data : null;
};