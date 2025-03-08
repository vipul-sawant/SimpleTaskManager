import * as Yup from 'yup';

export const fields = [
    {
        name: "username",
        default:'',
        type: "text",
        label: "Username",
        placeholder: "Create an Username",
        validation: Yup.string()
        .required()
    },
    {
        name: "email",
        default:'',
        type: "email",
        label: "E-Mail",
        placeholder: "Enter Your E-Mail",
        validation: Yup.string()
        .email()
        .required()
    },
    {
        name: "password",
        default:'',
        type: "text",
        label: "Password",
        placeholder: "Create a Strong Pasword",
        validation: Yup.string()
        .required()
    },
    {
        name: "c_password",
        default:'',
        type: "text",
        label: "Confirm Password",
        placeholder: "Enter Above Password",
        validation: Yup.string().when('password', {
            is: (password) => Boolean(password),
            then:(schema)=>schema.oneOf([Yup.ref('password'), null], 'Confirm Password is In-correct!').required()
        })
        
    }
];