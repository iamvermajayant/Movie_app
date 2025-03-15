import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import home from '@/assets/icons/home.png';
import { icons } from '@/constants/icons';
import Profile from './profile';


const TabIcon = ({ focused, icon, title }: any) => {
    
    if (focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className='flex flex-row w-full flex-1 min-w-[112px] min-h-[51px] mt-4 justify-center items-center rounded-full overflow-hidden'
            >
                <Image source={icon} tintColor="#151312" className='size-5' />
                <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
            </ImageBackground>
        )
    }

    return (
        <View className='size-full justify-center flex-row items-center mt-4 rounded-full'>
            <Image source={icon} tintColor="#fff" className='size-5' />
            {/*  */}
        </View>
    )
}

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarItemStyle: {
                    width: '100%',
                    height : "100%",
                    justifyContent : 'center',
                    alignItems : "center"
                },
                tabBarStyle: {
                    backgroundColor: '#0f0D23',
                    borderRadius : 50,
                    marginHorizontal : 20,
                    marginBottom : 36,
                    height : 52,
                    overflow : 'hidden',
                    position : 'absolute',
                    borderColor : '#0f0D23',
                    borderWidth : 1

                },
                tabBarShowLabel: false,
                
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: '',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.home}
                            title='Home'
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='search'
                options={{
                    title: '',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.search}
                            title='Search'
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='saved'
                options={{
                    title: 'Saved',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.save}
                            title='Saved'
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: '',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.person}
                            title='Profile'
                        />
                    )
                }}
            />
        </Tabs>
    )
}

export default _layout