import Lottie from "lottie-react"
import animationData from '../assets/img/animation_lmyvqrtk.json'

export function HomePage() {
    return (
        <div className="home-page">
            <h1 className="flex align-center justify-center">Come Play with us</h1>
            <Lottie animationData={animationData} />
        </div>
    )
}