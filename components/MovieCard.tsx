import { Link } from 'expo-router'
import { View, Text, Touchable, TouchableOpacity, Image } from 'react-native'


const MovieCard = ({ id, poster_path, title, vote_average, release_date }) => {
    return (
        <Link href={`/movie/${id}`} className='w-1/3' asChild>
            <TouchableOpacity className='w-[30%]'>
                <Image source={{ uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://placehold.co/600x400/1a1a1a/ffffff.png'}} 
                className='w-full h-32 rounded-lg'
                resizeMode='cover'
                />
                <Text className='text-sm font-bold text-white mt-2'>{title}</Text>
            </TouchableOpacity>
        </Link>
    )
}

export default MovieCard