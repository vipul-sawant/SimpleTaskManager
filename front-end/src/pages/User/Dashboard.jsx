import TasksList from "../../components/Tasks/TasksList.component.jsx";
import "./Dashboard.css";
const Dashboard = () => {
    return (
        <>
            {/* <div className="component-container"> */}
            <div className="dashboard-container">
                <TasksList />
            </div>
        </>
    );
};

export default Dashboard