import { showSuccessMsg } from "../services/event-bus.service"
import { utilService } from "../services/util.service"

import { useDispatch, useSelector } from "react-redux"

export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.toyModule.count)

    function changeCount(diff) {
        dispatch({ type: 'CHANGE_BY', diff })
        showSuccessMsg(`change count to ${count + diff}`)
    }

    return (
        <section>
            <h2>
                <span>Count {count}</span>
                <button onClick={() => { changeCount(1) }}>+</button>
                <button onClick={() => { changeCount(10) }}>+10</button>
            </h2 >
            <img src={utilService.getAssetSrc('logo.png')} />
        </section >
    )
}