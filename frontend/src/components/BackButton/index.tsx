import React from 'react'
// import { Spacing } from '../../styles'
import { useScreenDimensions } from '../../hooks/useScreenDimensions'

import { Image, TouchableOpacityContainer } from './styles'

interface Props {
  onPress: any
}

// Cover has to fill the whole card area.
const BackButton = (({ onPress }: Props) => {
  return (
    <TouchableOpacityContainer onPress={onPress}>
      <Image
        source={require('../../media/images/back_button.png')}
        resizeMode='contain'
        style={{
          width: 32,
          height: 32,
        }}
      />
    </TouchableOpacityContainer>
  )
}
)

export default BackButton
