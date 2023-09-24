// TODO : add a dropdown multiselection
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material'


import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter, onSetSort }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [sortBy, setSortBy] = useState('')

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
        onSetSort(event.target.value)
        setSortBy(event.target.value)
    }

    return (
        <section className="toy-filter">
            <h2 className="flex justify-center">Filtering</h2>

            <div className="filter-container">
                <TextField id="outlined-basic"
                    label="Search"
                    name="name"
                    variant="outlined"
                    value={filterByToEdit.title}
                    onChange={handleChange}
                    helperText="What are you looking for?"
                />
            </div>

            <div className="filter-container">
                <TextField
                    label="Max Price"
                    name="maxPrice"
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
            </div>

            <div className="filter-container flex flex-column">
                <FormControl>
                    <InputLabel >In Stock</InputLabel>
                    <Select
                        labelId="inStock"
                        name="inStock"
                        value={filterByToEdit.inStock}
                        onChange={handleChange}
                        autoWidth
                        label="In Stock"
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        <MenuItem value={"true"}>In Stock</MenuItem>
                        <MenuItem value={"false"}>Out of Stock</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="filter-container flex flex-column">
                <FormControl>
                    <InputLabel id="sortBy">Sort By</InputLabel>
                    <Select
                        labelId="sortBy"
                        value={sortBy}
                        onChange={handleSortChange}
                        autoWidth
                        label="Sort By"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                        <MenuItem value="createdAt">Created At</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </section>
    )
}