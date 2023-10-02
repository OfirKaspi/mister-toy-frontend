import { AiOutlinePhone } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../store/actions/user.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export function AppHeader() {
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)
    const navigate = useNavigate()

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Logout successfully')
            navigate('/')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot logout')
        }
    }
    return (
        <>
            <div className="secondary-header-container flex align-center justify-between">
                <span>Welcome to Mister Toy Store!</span>
                <div className="flex">
                    <div className="phone-container flex align-center">
                        <span><AiOutlinePhone /></span>
                        <span>052-6855999</span>
                    </div>
                    {user && (
                        <div className="login-container flex align-center">
                            <span>
                                {user.fullname}
                            </span>
                            <button className="btn" onClick={onLogout}>Logout</button>
                        </div>
                    )}
                    {!user && (
                        <Link to='/auth/login' className="login-container flex align-center">
                            <span><BsPerson /></span>
                            <span>Sign in or Register</span>
                        </Link>
                    )}

                </div>

            </div>
            <div className="main-header-container flex justify-center">
                <h1 className="app-name flex justify-center">Mister Toy</h1>
                <nav className="header-nav flex">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/about">About</NavLink>
                </nav>
            </div>
        </>
    )
}

