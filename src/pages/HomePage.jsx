import Lottie from "lottie-react"
import animationData from '../assets/img/animation_lmyvqrtk.json'

export function HomePage() {
    return (
        <div className="home-page flex flex-column align-center justify-center">
            <h1>Come and Play with us</h1>
            <div className="lottie-container">
                <Lottie animationData={animationData} />
            </div>
        </div >
    )
}