export const toggleStar = (id : number) => ({ id, type: 'TOGGLE_STAR' });
export const setStar = (id : number) => ({ id, type: 'SET_STARRED' });
export const selectCar = (car : any) => ({ car, type: 'SELECT_CAR' });

