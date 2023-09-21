// TODO : add a dropdown multiselection

import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter, onSetSort }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? (+value || '') : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleSortChange(event) {
        const selectedSort = event.target.value;
        onSetSort(selectedSort)
    }

    return (
        <section className="car-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By name"
                    value={filterByToEdit.title}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="inStock">In Stock:</label>
                <select
                    id="inStock"
                    name="inStock"
                    value={filterByToEdit.inStock}
                    onChange={handleChange}
                >
                    <option value="">All</option>
                    <option value={"true"}>In Stock</option>
                    <option value={"false"}>Out of Stock</option>
                </select>
                <br />
                <label htmlFor="sortBy">Sort By:</label>
                <select
                    id="sortBy"
                    name="sortBy"
                    onChange={handleSortChange}
                >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Created At</option>
                </select>
            </form>
        </section>
    )
}