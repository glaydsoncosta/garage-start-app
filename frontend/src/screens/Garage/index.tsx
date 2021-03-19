import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, View, SafeAreaView, FlatList, Dimensions } from 'react-native'
import { getList } from '../../services/api'
import CardListItem from '../../components/CardListItem'
import { Space, Title, MainContainer } from './styles'

const Garage = () => {
  const [data, setData] = useState([]);
  const renderItemCall = useCallback(({ item, index }) => renderItem({ item, index }));

  const renderItem = ({ item, index }) => {
    return (
     <View>
        <CardListItem
              id={item.id}
              model={item.model}
              maker={item.maker}
              year={item.year}
              starred={true}
              coverURL={item.image_url == null ? undefined : item.image_url}
            />
            <Space />       
     </View>
    )
  }  

  useEffect(() => {
    const updateData = async () => {
      const res = await getList()
      setData(res.data)
    }
    updateData()
  }, [])

  return (
    <MainContainer>
      <Title>Garage</Title>
      <FlatList
        data={data}
        renderItem={renderItemCall}>
      </FlatList>
    </MainContainer>
  )
}

export default Garage
