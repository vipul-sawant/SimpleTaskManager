import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout';
import UserRegister from './pages/User/UserRegister.jsx';
import UserLogin from './pages/User/UserLogin.jsx';
import Dashboard from './pages/User/Dashboard.jsx';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.jsx';
import AddTask from './pages/Tasks/AddTask.jsx';
import UpdateTask from './pages/Tasks/UpdateTask.jsx';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import NavbarComponent from './components/Navbar/Navbar.jsx';
const App = () => {

    const tasks = useSelector(state=>state.task || {});
	const auth = useSelector(state=>state?.auth || {});

    const router = createBrowserRouter([{

		path: "/",
		element: <Layout />,
		children: [
			{
				path: "user/register",
				element: <UserRegister />
			},
			{
				path: "user/login",
				element: <UserLogin />
			},
			{
				path: "users/:username/dashboard",
				element: <ProtectedRoutes> <NavbarComponent/> <Dashboard /> </ProtectedRoutes>
			},
			{
				path: "tasks/new",
				element: <ProtectedRoutes> <NavbarComponent /> <AddTask /> </ProtectedRoutes>
			},
			{
				path: "tasks/:taskID/edit",
				element: <ProtectedRoutes> <NavbarComponent /> <UpdateTask /> </ProtectedRoutes>
			}
		]
	}]);

    
	useEffect(()=>{

		console.log("auth :", auth);
		console.log("tasks :", tasks);
	}, [tasks, auth]);

  return (
    <>
            <RouterProvider router={router}></RouterProvider>
    </>
  )
};

export default App;