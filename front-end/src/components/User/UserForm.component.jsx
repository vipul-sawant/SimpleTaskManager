import { useState, useEffect } from "react";

import { replace, useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";

import buildSchema from "../../utils/yup/buildSchema.js";

import { loginUser, registerUser } from "../../redux/slices/authSlice.js";
import { fetchTasks } from "../../redux/slices/tasksSlice.js";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

import "./UserForm.component.css";

const UserForm = ({fieldsArray, operation}) => {

	const [ formfields, setFormFields ] = useState(fieldsArray);
    const schema = buildSchema(formfields, 'user');
	
	const tasks = useSelector(state=>state?.tasks || {});
	const auth = useSelector(state=>state?.auth || {});

    const { isLoggedIn = false, user={}, error:authError = null } = useSelector(state=>state?.auth || {});
	const { error:tasksError = null } = useSelector(state=>state?.tasks || {});
    const setDefaultValues = (fields) => {

        const reducedObj = fields.reduce((acc, field)=>{

            acc[field.name] = field.default;
            return acc;
        }, {});

        return reducedObj;
    };

    const [ fieldsDefaults, setFieldDefaults ] = useState(setDefaultValues(formfields));

	const { control ,handleSubmit, formState:{errors}, reset } = useForm(
        {
            resolver:yupResolver(schema),
            defaultValues:fieldsDefaults
        });
		
    const navigate = useNavigate();
    const dispatch = useDispatch();

	const [ redirect, setRedirect ] = useState(false);

	const formSubmit = async (data, e) => {

		console.log('data :', data);

		try {
			let userAction;
			if (operation === "register") {
				
				userAction = await dispatch(registerUser(data));
			} else if (operation === "login") {
				
				userAction = await dispatch(loginUser(data));
			}
			
			// ✅ If user exists, fetch chats & contacts
			if (userAction?.error) {

				alert(userAction.payload);
			} else {

				const tasksAction = await dispatch(fetchTasks());

				if (tasksAction?.error) {
					
					alert(tasksAction.payload);
				}
			}

			setRedirect(true);
		} catch (error) {
			
			console.log('Error :', error);
			// alert(error?.response?.data?.message)
		}
	};

	const formErrors = (errors, e) => {
		console.error("errors :", errors);
	}

	useEffect(() => {

		console.log('user :', user);
		if (isLoggedIn && redirect) {
			
			// alert("Logged In as ", user);
			navigate(`/users/${user.username}/dashboard`, replace);
		}
	}, [isLoggedIn, redirect]);

	useEffect(()=>{

		console.log('tasks :', tasks);
		console.log('auth :', auth);
	}, [auth, tasks]);

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
													<Form.Control {...controllerField}
														type={field.type}
														placeholder={field.placeholder}
														className="form-input">
													</Form.Control>)
										}></Controller>
								</Col>									
							</Row>	
						</Form.Group>
					))}

					<Button type="submit" className="btn">{ operation} </Button>
				</Form>
			</>
	)
}

export default UserForm;