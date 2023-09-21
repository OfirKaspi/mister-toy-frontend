import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy, sortBy }) {

    function compareToys(a, b) {
        switch (sortBy) {
            case "name":
                return a.name.localeCompare(b.name);
            case "price":
                return a.price - b.price;
            case "createdAt":
                return a.createdAt - b.createdAt;
            default:
                return 0; // No sorting (default order)
        }
    }

    const sortedToys = [...toys].sort(compareToys);

    return (
        <ul className="car-list">
            {sortedToys.map(toy =>
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