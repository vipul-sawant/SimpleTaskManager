import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../redux/slices/authSlice.js';

const NavbarComponent = () => {

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
						<Nav className="me-auto flex-grow-1">

							{/* New div added here */}
							<div className="d-flex align-items-center ms-3 flex-grow-1 justify-spce-between">
								<div className='flex-grow-1 d-flex align-items-center'>
									<Nav.Link as={NavLink} to={"/tasks/new"}>Create Task</Nav.Link>
									<Nav.Link as={NavLink} to={`/users/${user?.username}/dashboard`}>Tasks List</Nav.Link>
								</div>
								<div className='flex-grow-1 d-flex align-items-center justify-content-end'>
									<span className="me-2 font-bold"> {user?.username} </span>
									<button className="btn btn-danger" onClick={()=>{handleLogout()}}>Logout</button>
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