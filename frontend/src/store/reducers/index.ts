import { combineReducers } from 'redux'

export interface Stars {
  starred: {
    [key: number]: boolean
  }
}

export interface Cars {
  car: {}
}

const initState = {
  starred: {},
  car: {}
}

const star = (state : Stars = initState, action : any) => {
  switch (action.type) {
    case 'TOGGLE_STAR':
      return {
        ...state,
        starred: {
          ...state.starred,
          [action.id]: !state.starred[action.id]
        }
      }
    default:
      return state
  }
}

const car = (state : Cars = initState, action : any) => {
  switch (action.type) {
    case 'SELECT_CAR':
      return {
        ...state,
        id: action.id
      }
    default:
      return state
  }
}

export default combineReducers({ star, car })
