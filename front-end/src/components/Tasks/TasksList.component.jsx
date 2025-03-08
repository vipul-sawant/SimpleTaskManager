import { useSelector } from "react-redux";
import Task from "./Task.component.jsx";
import dayjs from "dayjs";

const TasksList = () => {

	const { tasks = [] } = useSelector(state=>state?.tasks || {});

	console.log("tasks:", tasks);

    const today = dayjs().startOf("day");

    // 🏷 Categorize tasks
    const pastTasks = [];
    const todayTasks = [];
    const futureTasks = [];

    tasks.forEach(task => {
        const dueDate = dayjs(task.dueDate);
        if (dueDate.isBefore(today, "day")) {
            pastTasks.push(task);
        } else if (dueDate.isSame(today, "day")) {
            todayTasks.push(task);
        } else if (dueDate.isAfter(today, "day")) {
            futureTasks.push(task);
        }
    });

    // 🔹 Sorting Logic
    pastTasks.sort((a, b) => dayjs(a.dueDate) - dayjs(b.dueDate) || a.status.localeCompare(b.status));
    todayTasks.sort((a, b) => dayjs(a.dueDate) - dayjs(b.dueDate));
    futureTasks.sort((a, b) => dayjs(a.dueDate) - dayjs(b.dueDate));

	console.log("tasks :",pastTasks, todayTasks, futureTasks);

	return (
		<>
            {/* Tasks Due Today */}
            {todayTasks.length > 0 && (
                <div>
                    <h2 style={{ textAlign: "center", color: "#2D6A4F" }}>Tasks Due Today</h2>
                    {todayTasks.map(task => <Task key={task._id} task={task} />)}
                </div>
            )}

            {/* Overdue Tasks */}
            {pastTasks.length > 0 && (
                <div>
                    <h2 style={{ textAlign: "center", color: "#D90429" }}>Overdue Tasks</h2>
                    {pastTasks.map(task => <Task key={task._id} task={task} />)}
                </div>
            )}

            {/* Future Tasks */}
            {futureTasks.length > 0 && (
                <div>
                    <h2 style={{ textAlign: "center", color: "#457B9D" }}>Upcoming Tasks</h2>
                    {futureTasks.map(task => <Task key={task._id} task={task} />)}
                </div>
            )}

            {/* No Tasks Message */}
            {tasks.length === 0 && (
                <h1 style={{ margin: "auto", color: "#FCA311" }}>No Tasks</h1>
            )}
        </>
	);
}

export default TasksList