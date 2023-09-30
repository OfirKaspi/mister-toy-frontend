
import { useDispatch, useSelector } from 'react-redux'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy } from '../store/actions/toy.actions.js'
import { CHANGE_PAGE, SET_FILTER_BY, SET_SORT_BY } from '../store/reducers/toy.reducer.js'
import { useEffect, } from 'react'
import { useNavigate } from 'react-router-dom'

export function ToyIndex() {
    const PAGE_SIZE = 12
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)


    // something causing many re-rendering 
    console.log('Outside');

    useEffect(() => {
        console.log('from the use effect');
        loadToys()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy, sortBy])


    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            console.log('Cannot remove toy', err)
            showErrorMsg('Cannot remove toy')
        }
    }

    async function onEditToy(toy) {
        const price = +prompt('New price?', toy.price)
        const toyToSave = { ...toy, price }

        try {
            const savedToy = saveToy(toyToSave)
            showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
        } catch (err) {
            console.log('Cannot update toy', err)
            showErrorMsg('Cannot update toy')
        }
    }

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function onSetSort(sortBy) {
        dispatch({ type: SET_SORT_BY, sortBy })
    }

    function handlePageChange(diff) {
        if (filterBy.pageIdx === 0 && diff === -1) return
        if (toys.length < PAGE_SIZE && diff === 1) return
        onSetFilter({ ...filterBy, pageIdx: filterBy.pageIdx + diff })
    }

    function onNavToEdit() {
        navigate('/toy/edit')
    }

    return (
        <div className='index-page flex flex-column'>
            <div className='index-container flex'>
                <aside>
                    <button className='btn full-btn' onClick={onNavToEdit}>Add Toy</button>
                    <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} onSetSort={onSetSort} />
                </aside>
                <section>
                    {!isLoading &&
                        <ToyList
                            toys={toys}
                            onRemoveToy={onRemoveToy}
                            onEditToy={onEditToy}
                            sortBy={sortBy}
                        />
                    }

                    {isLoading && <div>Loading...</div>}

                </section>
            </div>
            {!isLoading && <div className='pagination-container flex align-center justify-center'>
                <span className='btn' onClick={() => handlePageChange(-1)}>-</span>
                <span className='pages'>{filterBy.pageIdx + 1}</span>
                <span className='btn' onClick={() => handlePageChange(1)}>+</span>
            </div>}
        </div>
    )

}