import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, View, SafeAreaView, FlatList, Dimensions } from 'react-native'
import { getCar, getList } from '../../services/api'
import CardListItem from '../../components/CardListItem'
import BackButton from '../../components/BackButton';
import { Space, Title, MainContainer, TitleContainer } from './styles'
import { useSelector, RootStateOrAny } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const CarDetails = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const car: any = useSelector<RootStateOrAny>((state) => {
    return state.car.car;
  });
  const star = useSelector<RootStateOrAny>((state) => {
    return state.star.starred[car.id]
  });  

  const showCarInfo = () => {
    return (
     <View>
        <CardListItem
              id={car.id}
              model={car.model}
              maker={car.maker}
              year={car.year}
              starred={car.starred}
              coverURL={car.coverURL == null ? undefined : car.coverURL}
            />
            <Space />       
     </View>
    )
  }  

  useEffect(() => {
    const updateData = async () => {
      if (car.car !== undefined) {
        const res = await getCar(car.car.id)
        setData(res.data[0])
      }
    }
    updateData()
  }, [])

  return (
    <MainContainer>
      <TitleContainer>
        <BackButton onPress={() => navigation.goBack()}/>
        <Title>Car Details</Title>
      </TitleContainer>
      {showCarInfo()}
    </MainContainer>
  )
}

export default CarDetails
