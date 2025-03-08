import * as Yup from 'yup';

export const fields = [
    {
        name: "credential",
        default:'',
        type: "text",
        label: "Credential",
        placeholder: "Enter your Username or E-mail", 
        validation: Yup.string()
        .required()
    },
    {
        name: "password",
        default:'',
        type: "text",
        label: "Password",
        placeholder: "Enter your Password",
        validation: Yup.string()
        .required()
    }
];