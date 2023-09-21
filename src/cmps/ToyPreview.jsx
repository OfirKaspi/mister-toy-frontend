import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (
        <article>
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>In Stock : <span>{toy.inStock.toLocaleString()}</span></p>
            <p>{toy.labels.map((label, idx) => (
                <span key={idx}>| {label} |</span>
            ))}</p>
            <hr />
            <Link to={`/toy/${toy._id}`}>Details</Link>
        </article>
    )
}