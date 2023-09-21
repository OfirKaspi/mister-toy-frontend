import { NavLink } from "react-router-dom";

export function AppHeader() {
    return (
        <header className="app-header flex justify-center">
            <h1 className="app-name">Mister Toy</h1>
            <nav className="header-nav flex">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
        </header>
    )
}

