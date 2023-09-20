import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy }) {

    return (
        <ul className="car-list">
            {toys.map(toy =>
                <li className="car-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        <button onClick={() => onEditToy(toy)}>Edit</button>
                    </div>
                    {/* <button className="buy" onClick={() => addToCart(car)}>Add to Cart</button> */}
                </li>
            )}
        </ul>
    )
}