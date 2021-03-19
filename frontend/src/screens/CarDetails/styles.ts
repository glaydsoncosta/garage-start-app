import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import { Colors, Spacing } from '../../styles'

export const Title = styled.Text`
  color: ${Colors.textColor};
  marginTop: 5px;
  fontSize: 36px;
  fontFamily: Arial;
  fontWeight: bold;
  paddingHorizontal: ${Spacing.padding}px;
  paddingVertical: ${3 * Spacing.padding}px;
`

export const Space = styled.View`
  height: ${Spacing.padding + Spacing.extraMargin}px;
`
export const MainContainer = styled.SafeAreaView`
  width: ${ Dimensions.get('window').width}px;
  paddingHorizontal: ${Spacing.padding}px;
`
export const TitleContainer = styled.View`
  flexDirection: row;
`

export const List = styled.FlatList``
