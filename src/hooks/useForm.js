import { useState } from "react";

function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    const handleReset = () => {
        setValues(initialValues);
    }

    return {
        values,
        setValues,
        handleChange,
        handleReset,
    };
}

export default useForm;