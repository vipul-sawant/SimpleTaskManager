import { Link, useNavigate } from "react-router-dom";
import UserForm from "../../components/User/UserForm.component.jsx";
import { fields } from "../../utils/form/fields/user/login.js";
import { Button } from "react-bootstrap";
// import "./UserForm.css";

const UserLogin = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* <div  className="component-container"> */}
            <div  className="input-form-container">
                <h1> User Login </h1>
                {/* <div className="form-container w-100"> */}
                    <UserForm fieldsArray={fields} operation={'login'}/>
                {/* </div> */}
                {/* <Button className="my-btn btn-back" as={Link} to={'/user/register'}> Register </Button> */}
                <Button className="my-btn btn-back" onClick={() => navigate('/user/register')}> Register </Button>
            </div>
        </>
    )
}

export default UserLogin;