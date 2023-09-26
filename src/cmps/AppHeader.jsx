import { AiOutlinePhone } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

export function AppHeader() {
    return (
        <header className="app-header">
            <div className="secondary-header-container flex align-center justify-between">
                <span>Welcome to Mister Toy Store!</span>
                <div className="flex">
                    <div className="phone-container flex align-center">
                        <span><AiOutlinePhone /></span>
                        <span>052-6855999</span>
                    </div>
                    <Link to='/login' className="login-container flex align-center">
                        <span><BsPerson /></span>
                        <span>Sign in or Register</span>
                    </Link>
                </div>

            </div>
            <div className="main-header-container flex justify-center">
                <h1 className="app-name flex justify-center">Mister Toy</h1>
                <nav className="header-nav flex">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/about">About</NavLink>
                </nav>
            </div>
        </header>
    )
}

