import { UserMsg } from './UserMsg'
import { useSelector } from 'react-redux'


export function AppFooter() {
    const toysCount = useSelector(storeState => storeState.toyModule.toys.length)

    return (
        <>
            <footer className='flex justify-between align-center'>
                <p>
                    Currently <span className='toys-count'>{toysCount}</span> toys to show
                </p>
                <p>
                    Coffeerights to Buzz Lightyear
                </p>
            </footer>
            <UserMsg />
        </>
    )
}