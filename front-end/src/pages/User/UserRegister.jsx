import { Link, useNavigate } from "react-router-dom";
import UserForm from "../../components/User/UserForm.component.jsx";
import { fields } from "../../utils/form/fields/user/register.js";
import { Button } from "react-bootstrap";
// import "./UserForm.css";

const UserRegister = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* <div  className="component-container"> */}
            <div  className="input-form-container">
                <h1> User Register</h1>
                {/* <div className="form-container w-100"> */}
                    <UserForm fieldsArray={fields} operation={'register'} />
                {/* </div> */}
                {/* <Button className="btn btn-back" as={Link} to={'/user/login'}> login </Button> */}
                <Button className="my-btn btn-back" onClick={() => navigate('/user/login')}> login </Button>
            </div>
        </>
    )
}

export default UserRegister;