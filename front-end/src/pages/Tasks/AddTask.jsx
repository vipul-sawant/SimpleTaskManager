import { useNavigate } from "react-router-dom";
import TaskForm from "../../components/Tasks/TaskForm.component.jsx";
import { fields } from "../../utils/form/fields/tasks/tasks.js";
import "./TaskPage.css";
import { Button } from "react-bootstrap";
const AddTask = () => {

    const navigate = useNavigate();
    return (
        <>
            <div  className="component-container">
                <h1> Add Task </h1>
                <div className="form-container w-100">
                    <TaskForm operation={'add'} fieldsArray={fields} />
                </div>
                <Button className="btn back-btn"  onClick={() => navigate(-1)}> Back </Button>
            </div>
        </>
    )
}

export default AddTask;