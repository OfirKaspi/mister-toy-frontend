import { HoverRating } from "../cmps/Rating.jsx"

export function AboutPage() {
    return (
        <section className="about-page flex flex-column">
            <h1>About Us - Mister Toy</h1>
            <h3>Where Joy Meets Sustainability</h3>
            <p>
                Welcome to Mister Toy, your one-stop shop for eco-friendly toys
                that bring joy to kids and the world. I'm Ofir Kaspi, and I'm excited
                to introduce you to our store, where the magic of play meets
                environmental responsibility.
            </p>

            <h2>Our Mission</h2>
            <h3>Joy and Sustainability in Harmony</h3>
            <p>
                At Mister Toy, we believe toys are more than just playthings;
                they're sources of happiness, creativity, and cherished memories.
                We're dedicated to offering top-quality
                toys that ignite imaginations while protecting our planet.
            </p>

            <h2>A <span className="green">Greener</span> Tomorrow</h2>
            <h3>100% Recycled Plastic Toys</h3>
            <p>
                We're proud to offer toys made from 100% recycled plastic,
                reducing waste and conserving resources. Each purchase from
                Mister Toy brings joy into your home and
                supports a cleaner, brighter future for our children.
            </p>

            <h2>Our Promise to You</h2>
            <p>
                Shop with us at Mister Toy to experience the joy
                of play while making a positive impact on the environment.
                Join us in creating a greener world for the next generation.
                Thank you for choosing Mister Toy,
                where joy and sustainability go hand in hand.
            </p>

            <h2>
                Thank you for visiting our site
            </h2>
            <p>
                We're dedicated to improving our services and would greatly appreciate your feedback. Please consider leaving a review to help us serve you better. Thank you for choosing us!
            </p>
            <div className="flex justify-center">
                <HoverRating />
            </div>
        </section>
    )
}