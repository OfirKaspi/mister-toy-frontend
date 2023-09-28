import { toyService } from "../../services/toy.service";
import { ADD_TOY, REMOVE_TOY, SET_TOYS, SET_IS_LOADING, UPDATE_TOY } from "../reducers/toy.reducer";
import { store } from "../store";

export async function loadToys() {
    const { filterBy } = store.getState().toyModule

    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    try {
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.log('toy action -> Cannot load toys', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.log('toy action -> Cannot remove toy', err)
        throw err
    }
}

// export function removeCarOptimistic(carId) {
//     store.dispatch({ type: REMOVE_TOY, carId })
//     return toyService.remove(carId)
//         .catch(err => {
//             store.dispatch({ type: CAR_UNDO })
//             console.log('car action -> Cannot remove car', err)
//             throw err
//         })
// }

export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY

    try {
        const toyToSave = await toyService.save(toy)
        store.dispatch({ type, toy: toyToSave })
        return toyToSave
    } catch (err) {
        console.log('toy action -> Cannot save toy', err)
        throw err
    }
}