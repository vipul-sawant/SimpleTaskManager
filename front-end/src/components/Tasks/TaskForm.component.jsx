import { useState, useEffect } from "react";

import { replace, useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";

import buildSchema from "../../utils/yup/buildSchema.js";

import { addTask, updateTask } from "../../redux/slices/tasksSlice.js";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import validateTask from "../../utils/form/validate/taskData.js";

const TaskForm = ({fieldsArray, operation, data={}}) => {

	console.log("operation :", operation);
	const { user = {} } = useSelector(state=>state?.auth || {});

	const [ formfields, setFormFields ] = useState(fieldsArray);
    const schema = buildSchema(formfields, 'task');

    const setDefaultValues = (fields, data) => {

        const reducedObj = fields.reduce((acc, field)=>{

            acc[field.name] = data[field.name] || field.default;
            return acc;
        }, {});

        return reducedObj;
    };

    const [ fieldsDefaults, setFieldDefaults ] = useState(setDefaultValues(formfields, data));

	const { control ,handleSubmit, formState:{errors}, reset } = useForm(
        {
            resolver:yupResolver(schema),
            defaultValues:fieldsDefaults
        });
		
    const navigate = useNavigate();
    const dispatch = useDispatch();

	const [ redirect, setRedirect ] = useState(false);
    const [ taskID, setTaskID ] = useState(null);

	const formSubmit = async (formValueObj, e) => {

		console.log('formValuesObj :', formValueObj);

		try {
			let taskAction;
			if (operation === "add") {
				
				taskAction = await dispatch(addTask(formValueObj));
			} else if (operation === "edit") {
                const taskData = await validateTask(formValueObj, data);

				console.log('taskDate length :', Object.keys(taskData).length, !Object.keys(taskData).length);
				if (!Object.keys(taskData).length) {
					
					alert("nothing to Update")
				} else {
					console.log('taskID :', taskID);
					taskAction = await dispatch(updateTask({taskData, taskID}));
				}
			}

			console.log('taskAction :', taskAction);
			if (taskAction?.error) {
				// if (error && typeof error === "string" && error.trim().length > 0) {
					
					alert(taskAction.payload);
				// }
				// return;
			} else{

				// await dispatch(reArrange({}));
				reset();
                setRedirect(true);
			}


		} catch (error) {
			
			console.log('Error :', error);
			// alert(error?.response?.data?.message)
		}
	};

	const formErrors = (errors, e) => {
		console.error("errors :", errors);
	}

    useEffect(() => {


        if (operation === "edit") {

            setTaskID(data._id);
        } 
    }, []);

	useEffect(()=>{

		if (redirect) {
			
			navigate(`/users/${user?.username}/dashboard`);
		}
	}, [redirect, user]);

	return (
		<>
			<Form onSubmit={handleSubmit(formSubmit, formErrors)} noValidate>
					{formfields.map(field=>(

						<Form.Group key={field.name} controlId={field.name}  className="form-group-wrapper">
							<Row>	
								<Col sm={12} className="col-wrapper">
									<Form.Label className="form-label"> {field.label} </Form.Label>
								</Col>

								<Col sm={12}>
									<Controller name={field.name}
											control={control}
											render={
												({field:controllerField})=>(
													field.type === "textarea" ? (
														<Form.Control
															as="textarea"
															{...controllerField}
															placeholder={field.placeholder}
															className="form-input"
															rows={5} // 👈 Ensures at least 5 rows for textarea
														/>
													) : (
														<Form.Control
															{...controllerField}
															type={field.type}
															placeholder={field.placeholder}
															className="form-input"
														/>
													))
										}></Controller>
								</Col>									
							</Row>	
						</Form.Group>
					))}

					<Button type="submit">{ operation} </Button>
				</Form>
			</>
	)
}

export default TaskForm;