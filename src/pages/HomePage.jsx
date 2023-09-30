import Lottie from "lottie-react"
import animationData from '../assets/img/animation_lmyvqrtk.json'
import { useNavigate } from "react-router-dom"

export function HomePage() {
    const navigate = useNavigate();

    const onNavToIndex = () => {
        navigate(`/toy`)
    }

    return (
        <div className="home-page-container flex align-center justify-center">
            <div className="lottie-container">
                <Lottie animationData={animationData} />
            </div>
            <div className="hero-text">
                <h1>Welcome to Mister Toy</h1>
                <p>Where Imagination Begins</p>
                <button className="btn" onClick={onNavToIndex}>See More</button>
            </div>
        </div >
    )
}