import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

// _createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getDefaultToy,
    getDefaultFilter,
    getLabels,
    getEmptyToy
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getDefaultToy() {
    return {
        // need to add a promt or modal to add name
        name: 'Talking Doll-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(100, 1000),
        // need to make a function to make it random labels
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: Date.now(),
        inStock: true,
    }
}

function getEmptyToy() {
    return {
        // need to add a promt or modal to add name
        name: '',
        price: '',
        // labels: [],
        createdAt: Date.now(),
        inStock: true,
        description: ''
    }
}

function getDefaultFilter() {
    return { name: '', maxPrice: '', inStock: '', labels: [], pageIdx: 0 }
}

function getLabels() {
    return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
}