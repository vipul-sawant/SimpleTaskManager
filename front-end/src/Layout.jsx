import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import { Outlet, useNavigate, replace, useLocation } from "react-router-dom";

const Layout = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    const { user = {}, isLoggedIn = false } = useSelector(state=>state?.auth || {});

    useEffect(()=>{

        if (isLoggedIn) {
            
            console.log('isLoggedIn :', isLoggedIn);
            navigate(`/users/${user.username}/dashboard`, replace);
        } else if (!isLoggedIn)  {
            navigate(`/user/login`, replace);
        }
    }, [isLoggedIn])
  
    return (
        <>
            <Container fluid>
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;