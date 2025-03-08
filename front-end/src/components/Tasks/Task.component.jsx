import Card  from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col  from "react-bootstrap/Col";
import Button  from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import CardBody from "react-bootstrap/CardBody";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteTask } from "../../redux/slices/tasksSlice.js";
import { updateTask } from "../../redux/slices/tasksSlice.js";

const formattedTime = (utcDate) => {
  const dateObj = new Date(utcDate);
  const now = new Date();

  // Convert to local date values
  const dateYear = dateObj.getFullYear();
  const dateMonth = dateObj.getMonth();
  const dateDay = dateObj.getDate();

  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const nowDay = now.getDate();

  // Check if the date is today
  const isToday = dateYear === nowYear && dateMonth === nowMonth && dateDay === nowDay;

  if (isToday) {
      // Show only time for today's timestamps
      return `Today at ${dateObj.toLocaleString(undefined, {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
      })}`;
  } else {
      // Show full date and time for past and future dates
      return dateObj.toLocaleString(undefined, {
          year: "numeric",
          month: "short", // "Mar" instead of "03"
          day: "2-digit",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
      });
  }
};

const Task = ({ task }) => {

  const taskID = task?._id;
  // const [status, setStatus] = useState(task.status);
  const dispatch = useDispatch();

  const handleCheckboxChange =  async () => {
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";
    // setStatus(newStatus);
    // updateTaskStatus(task._id, newStatus); // Call function to update status in DB
    const taskData = {status:newStatus};
    const statusAction = await dispatch(updateTask({ taskData, taskID }));

    if (statusAction?.error) {
      
      alert(statusAction.payload);
    }
  };

  const removeTask = async (id) => {

    const isConfirm = confirm("are your sure you want to delete this task");
    console.log(isConfirm);

    if (isConfirm) {

      const taskAction = await dispatch(deleteTask(id));

      if (taskAction?.error) {
        
        alert(taskAction.payload);
      }
    }
  };

  console.log('task :', task);
  const navigate = useNavigate();
  return (
    <Card className="m-3 shadow-sm p-3">
            <CardBody>
                {/* Title, Status, and Due Date */}
                <Row className="align-items-center">
                    <Col>
                        <h4 className="mb-0">{task.title}</h4>
                    </Col>
                    <Col className="text-center">
                        <span className={`badge ${task.status === "Completed" ? "bg-success" : "bg-warning"}`}>
                            {task.status}
                        </span>
                    </Col>
                    <Col className="text-end">
                        <h6 className="text-muted">{formattedTime(task.dueDate)}</h6>
                    </Col>
                </Row>

                {/* Description */}
                <Row className="mt-2">
                    <Col>
                        <p className="text-secondary">{task.description}</p>
                    </Col>
                </Row>

                {/* Checkbox: Mark as Complete */}
                <Row className="mt-3">
                    <Col>
                        <Form.Check
                            type="checkbox"
                            label="Mark as Completed?"
                            checked={task.status === "Completed"}
                            onChange={handleCheckboxChange}
                        />
                    </Col>
                </Row>

                {/* Action Buttons */}
                <Row className="mt-3">
                    <Col className="d-flex justify-content-start">
                        <Button
                            variant="primary"
                            className="me-2"
                            onClick={() => navigate(`/tasks/${task._id}/edit`, { state: { task } })}
                        >
                            Edit
                        </Button>
                        <Button variant="danger" onClick={() => removeTask(task._id)}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
  );
};

export default Task;
