import { ToyPreview } from "./ToyPreview.jsx"
import { utilService } from '../services/util.service.js';
import { useState } from "react";

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
                return 0;
        }
    }

    const sortedToys = [...toys].sort(compareToys);

    return (
        <section className="toy-list">
            {sortedToys.map(toy =>
                <article className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />
                </article>
            )}
        </section>
    )
}