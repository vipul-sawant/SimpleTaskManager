import { Link } from "react-router-dom";
import UserForm from "../../components/User/UserForm.component.jsx";
import { fields } from "../../utils/form/fields/user/login.js";
import { Button } from "react-bootstrap";

const UserLogin = () => {
    return (
        <>
            <div  className="component-container">
                <h1> User Login </h1>
                <div className="form-container w-100">
                    <UserForm fieldsArray={fields} operation={'login'}/>
                </div>
                <Button className="btn back-btn" as={Link} to={'/user/register'}> Register </Button>
            </div>
        </>
    )
}

export default UserLogin;