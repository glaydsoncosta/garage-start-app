export const getList = async () => {
  const response = await fetch('http://localhost:3000/cars')
  return response.json()
}

export const getCar = async (id: number) => {
  const response = await fetch('http://localhost:3000/car/{car_id}'.replace('{car_id}', id.toString()))
  return response.json()
}
