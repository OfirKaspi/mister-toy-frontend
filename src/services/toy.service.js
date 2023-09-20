import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {

    if (!filterBy.name) filterBy.name = ''
    if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    const regExp = new RegExp(filterBy.name, 'i')

    return storageService.query(STORAGE_KEY)
        .then(toys => {
            return toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice
            )
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Oh no!')
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        // need to add a promt or modal to add name
        name: 'Talking Doll',
        price: utilService.getRandomIntInclusive(100, 1000),
        // need to make a function to make it random labels
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: Date.now(),
        inStock: true,
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            {
                _id: utilService.makeId(),
                name: 'Buzz Lightyear',
                price: utilService.getRandomIntInclusive(100, 1000),
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: Date.now(),
                inStock: false,
            },
            {
                _id: utilService.makeId(),
                name: 'Kobi Kobi',
                price: utilService.getRandomIntInclusive(100, 1000),
                labels: ['Outdoor', 'Art', 'Baby'],
                createdAt: Date.now(),
                inStock: true,
            },
            {
                _id: utilService.makeId(),
                name: 'Luka Doncic',
                price: utilService.getRandomIntInclusive(100, 1000),
                labels: ['Doll', 'Puzzle', 'Baby'],
                createdAt: Date.now(),
                inStock: true,
            },
            {
                _id: utilService.makeId(),
                name: 'Cristiano Ronaldo',
                price: utilService.getRandomIntInclusive(100, 1000),
                labels: ['Box game', 'Battery Powered', 'Art'],
                createdAt: Date.now(),
                inStock: false,
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}


function getDefaultFilter() {
    return { name: '', maxPrice: '' }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


