import React from 'react'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { toggleStar, selectCar } from '../../store/actions'

import Cover from '../Cover'

import {
  Card,
  Header,
  Details,
  Line,
  Model,
  MakeYear,
  StarIcon,
} from './styles'

export interface CarProps {
  id: number
  model: string
  maker: string
  year: string
  coverURL: string
  starred?: boolean
}

const CardListItem: React.FC<CarProps> = (car: CarProps) => {
  const star = useSelector<RootStateOrAny>((state) => {
    return state.star.starred[car.id]
  });
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const _toggleStar = () => {
    dispatch(toggleStar(car.id))
  }

  const _selectCar = () => {
    dispatch(selectCar(car.id));
    _showCarDetails();
  }

  const _showCarDetails = () => {
    navigation.navigate('CarDetails');
  }

  return (
    <TouchableNativeFeedback onPress={() => _selectCar()}>
      <Card>
        <Cover source={car.coverURL} />
        <Details>
          <Header>
            <Model>{car.model}</Model>
            <TouchableOpacity onPress={() => _toggleStar()}>
              <StarIcon star={star} />
            </TouchableOpacity>
          </Header>
          <Line />
          <MakeYear>
            {car.maker} | {car.year}
          </MakeYear>
        </Details>
      </Card>      
    </TouchableNativeFeedback>
  )
}

export default CardListItem
