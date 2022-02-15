import { useState } from 'react';

export const useForm = <T extends Object>( initState: T ) => {
    
    const [state, setState] = useState( initState );
    const [error, setError] = useState({});

    const onChange = ( value: string, field: keyof T, regexp:RegExp, errorMessage:string ) => {

        if(regexp) {
            
            if (!regexp.test(value)) {
                setError({
                    ...error,
                    [field]: errorMessage,
                });
            } else {
                setError({
                    ...error,
                    [field]: '',
                });
            }
        }

        setState({
            ...state,
            [field]: value
        });
        
    }

    return {
        ...state,
        form: state,
        error,
        onChange,
    }

}