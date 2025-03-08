import { Link } from "react-router-dom";
import UserForm from "../../components/User/UserForm.component.jsx";
import { fields } from "../../utils/form/fields/user/register.js";
import { Button } from "react-bootstrap";
const UserRegister = () => {
    return (
        <>
            <div  className="component-container">
                <h1> User Register</h1>
                <div className="form-container w-100">
                    <UserForm fieldsArray={fields} operation={'register'} />
                </div>
                <Button className="btn back-btn" as={Link} to={'/user/login'}> login </Button>
            </div>
        </>
    )
}

export default UserRegister;