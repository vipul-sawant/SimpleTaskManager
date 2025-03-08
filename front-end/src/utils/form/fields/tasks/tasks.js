import * as Yup from 'yup';

export const fields = [
    {
        name: "title",
        default:'',
        type: "text",
        label: "Title",
        placeholder: "Create a Title",
        validation: Yup.string()
        .required()
    },
    {
        name: "description",
        default:'',
        type: "textarea",
        label: "Description",
        placeholder: "Describe The Task",
        validation: Yup.string()
        .required()
    },
    {
        name: "dueDate",
        default:'',
        type: "datetime-local",
        label: "Due Date",
        placeholder: "Task Date and Time",
        validation: Yup.string()
        .required("Date and Time are required")
        .test("is-future", "Date and time cannot be in the past", (value) => {
          return new Date(value) > new Date();
        })
    }
];