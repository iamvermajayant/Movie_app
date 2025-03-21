import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props {
  placeholder: string;  
  onPress?: () => void;
}

const SearchBar = ({placeholder, onPress}: Props) => {
  return (
    <View className='flex-row items-center justify-start bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bff" />
      <TextInput 
        className='text-white ml-2 flex-1'
        placeholder={placeholder}
        onPress={onPress}  
        value=''
        onChangeText={() => {}}
        placeholderTextColor={'#ab8bff'}
      />
    </View>
  )
}

export default SearchBar;