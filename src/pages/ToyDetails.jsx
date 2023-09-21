import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

export function ToyDetails() {
    const [toy, setCar] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setCar(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="car-details">
            <h1>Car vendor : {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <h5>
                <span>Labels:</span>
                {toy.labels.map((label, idx) => (
                    <span key={idx}>| {label} |</span>
                ))}
            </h5>
            <h5>
                <span>Added to the store at: </span>
                <span>{utilService.formatDateFromTimestamp(toy.createdAt)}</span>
            </h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <Link to="/toy">Back</Link>
        </section>
    )
}