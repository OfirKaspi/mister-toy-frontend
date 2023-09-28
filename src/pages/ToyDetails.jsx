import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"
import { HoverRating } from "../cmps/Rating.jsx"

export function ToyDetails() {
    const [toy, setCar] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function onGoBack() {
        navigate('/toy')
    }

    async function loadToy() {
        try {
            const toy = toyService.getById(toyId)
            setCar(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy name : {toy.name}</h1>
            <h3>Price: {`$${toy.price.toLocaleString()}`}</h3>
            {
                toy.labels && <p>
                    <span>Labels:</span>
                    {toy.labels.map((label, idx) => (
                        <span key={idx}> ✔{label}</span>
                    ))}
                </p>
            }
            <p>
                <span>Added to the store at: </span>
                <span>{utilService.formatDateFromTimestamp(toy.createdAt)}</span>
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <div className="flex justify-center">
                <HoverRating />
            </div>
            <br />
            <button className="btn" onClick={onGoBack}>Back</button>
        </section>
    )
}