import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { POSTER_IMAGE } from '../utils/Config';
import { GET } from '../service/Api';
import Styles from '../utils/Styles';
import Loader from '../utils/Loader';
import { useTheme } from '@react-navigation/native';


const Images = props => {
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState();
    const { colors } = useTheme();

    useEffect(() => {
        const getImages = async () => {
            const data = await GET(props.url);
            setImages(data.results.images.backdrops);
            setLoading(false);
            console.log(data.results.images.backdrops);
        };

        getImages();
    }, []);



    const displayImages = ({ item }, props) => {
        return (
            <TouchableOpacity
                // onPress={() => {
                //     props.navigation.push('MovieDetails', { movieId: item.id });
                // }}
                style={{ marginHorizontal: 10 }}>
                <Image
                    source={{ uri: `${POSTER_IMAGE}${item.file_path}` }}
                    style={{
                        height: 150,
                        width: 150,
                        marginTop: 5,

                    }}
                />
                <Text style={{
                    color: colors.text,
                    width: 150,
                    textAlign: 'center',
                    marginTop: 5,
                    fontSize: 16,
                }}      >{item.vote_count}hello</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            {loading ? (
                <Loader />
            ) : (
                <View>

                    <FlatList
                        keyExtractor={(item, index) => index + "_" + item.id.toString()}
                        data={images}
                        horizontal
                        renderItem={item => displayImages(item, props)}
                    />
                </View>
            )}
        </View>
    );
};







export default Images;