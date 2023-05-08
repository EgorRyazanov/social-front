import { ChangeEvent, useState } from "react";

export const useForm = <T extends object>(inputValues: T) => {
    const [values, setValues] = useState<T>(inputValues);
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
};
