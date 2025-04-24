import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink, useLocation } from 'react-router-dom';
import { logoutUser } from '../../redux/slices/authSlice.js';

const NavbarComponent = () => {

	
const location = useLocation();
console.log("Current path:", location.pathname);
    const dispatch = useDispatch();
    const handleLogout = async () => {

        const userAction = await dispatch(logoutUser());

        const errors = Object.keys(userAction?.error || {});

        if (errors.length === 0) {
            
            // alert("logged out");
        }
    };
    const { user = {} } = useSelector(state=>state?.auth || {});
    return (
        <>
		<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" id="navbar">
		  <Container>
			<NavbarBrand as={NavLink} to={`/users/${user?.username}/dashboard`} id="navbar-brand">
			  Simple Tasks App
			</NavbarBrand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
			  {/* Main Nav Container */}
			  <Nav className="w-100 d-flex flex-column align-items-center text-center text-lg-start">
				<div className="d-flex flex-column flex-lg-row align-items-center w-100">
				  <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center w-100">
					<Nav.Link
					  as={NavLink}
					  to={"/tasks/new"}
					  className={({ isActive }) => {
						console.log("NavLink active state:", isActive);
						return `fw-bold text-dark px-2 ${isActive ? "text-success border-bottom border-success" : ""}`;
					  }}					  
					>
					  Create Task
					</Nav.Link>
					<Nav.Link
					  as={NavLink}
					  to={`/users/${user?.username}/dashboard`}
					  className={({ isActive }) => {
						console.log("NavLink active state:", isActive);
						return `fw-bold text-dark px-2 ${isActive ? "text-success border-bottom border-success" : ""}`;
					  }}					  
					>
					  Tasks List
					</Nav.Link>
					<Nav.Link
  as={"div"}>
  <NavLink
  to="/tasks/new"
  className={({ isActive }) => {
    console.log("NavLink active state:", isActive); // Should log now
    return isActive ? "text-success border-bottom border-success" : "text-dark px-2";
  }}
>
  Test Link
  </NavLink>
  
</Nav.Link>

				  </div>
				  {/* Logout Section - Always Right on Large Screens */}
				  <div className="d-flex align-items-center justify-content-center justify-content-lg-end w-100 mt-2 mt-lg-0">
					<span className="me-2 fw-bold">{user?.username}</span>
					<button className="btn btn-danger" onClick={handleLogout}>
					  Logout
					</button>
				  </div>
				</div>
			  </Nav>
			</Navbar.Collapse>
		  </Container>
		</Navbar>

        </>
    );
};

export default NavbarComponent