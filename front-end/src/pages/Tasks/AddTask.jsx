import { useLocation, useNavigate } from "react-router-dom";
import TaskForm from "../../components/Tasks/TaskForm.component.jsx";
import { fields } from "../../utils/form/fields/tasks/tasks.js";
// import "./TaskPage.css";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
const AddTask = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(()=>{

        console.log("inside Add Task :", pathname);
    }, []);
    return (
        <>
            {/* <div  className="component-container"> */}
            <div  className="input-form-container">
                <h1> Add Task </h1>
                {/* <div className="form-container w-100"> */}
                    <TaskForm operation={'add'} fieldsArray={fields} />
                {/* </div> */}
                <Button className="my-btn btn-back" onClick={() => navigate(-1)}> Back </Button>
            </div>
        </>
    )
}

export default AddTask;