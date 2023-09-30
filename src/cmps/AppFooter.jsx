import { UserMsg } from './UserMsg'
import { useSelector } from 'react-redux'


export function AppFooter() {
    const toysCount = useSelector(storeState => storeState.toyModule.toys.length)

    return (
        <>
            <div className='footer-container flex justify-between'>
                <p>
                    Currently <span className='toys-count'>{toysCount}</span> toys to show
                </p>
                <p>
                    Coffeerights to Buzz Lightyear
                </p>
            </div>
            <UserMsg />
        </>
    )
}