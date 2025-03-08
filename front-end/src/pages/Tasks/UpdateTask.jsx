import { useLocation, useNavigate } from "react-router-dom";
import TaskForm from "../../components/Tasks/TaskForm.component.jsx";
import { fields } from "../../utils/form/fields/tasks/tasks.js";
import { useEffect } from "react";
import "./TaskPage.css";
import { Button } from "react-bootstrap";
const UpdateTask = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { task = {} } = location?.state;

    useEffect(() => {

        if (Object.keys(task).length === 0) {
            
            // alert('edit object not fetched properly');
            navigate(-1);
        }
    }, []);
    return (
        <>
            <div  className="component-container">
                <h1> Update Task </h1>
                <div className="form-container w-100">
                    <TaskForm operation={'edit'} data={task} fieldsArray={fields} />
                </div>
                <Button className="btn back-btn"  onClick={() => navigate(-1)}> Back </Button>
            </div>
        </>
    )
}

export default UpdateTask