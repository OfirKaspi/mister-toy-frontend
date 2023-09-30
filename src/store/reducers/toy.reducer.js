import { toyService } from "../../services/toy.service.js"

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

export const CHANGE_PAGE = 'CHANGE_PAGE'

export const SET_SORT_BY = 'SET_SORT_BY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'


const initialState = {
    toys: [],
    filterBy: toyService.getDefaultFilter(),
    isLoading: false,
    sortBy: '',
    // pageIdx: 0
}

export function toyReducer(state = initialState, action = {}) {
    let toys
    switch (action.type) {

        // Toys
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case REMOVE_TOY:
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }

        // case CHANGE_PAGE:
        //     return { ...state, currPage: action.currPage }

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...action.filterBy } }

        case SET_SORT_BY:
            return { ...state, sortBy: action.sortBy }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }


        default:
            return state;
    }
}