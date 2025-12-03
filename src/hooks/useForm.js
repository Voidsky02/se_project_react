import { useState, useEffect } from "react";

function useForm(initialValues, prefillData = null) {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        if (prefillData) {
            setValues(prefillData);
        }
    }, [prefillData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    const resetForm = () => {
        setValues(initialValues);
    }

    return {
        values,
        setValues,
        handleChange,
        resetForm,
    };
}

export default useForm;