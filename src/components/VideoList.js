import React, { useEffect, useState } from 'react';
import { View, Text, Image, Linking, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import YouTube from 'react-native-youtube';
import { GET } from '../service/Api';

const VideoList = props => {
    const [loading, setLoading] = useState(true);
    const [trailer, setTrailer] = useState();
    const { colors } = useTheme();
    const deviceHeight = Dimensions.get('window').height;
    const deviceWidth = Dimensions.get('window').width;



    useEffect(() => {
        const getMovies = async () => {
            const data = await GET(props.url);
            setTrailer(data.results);
            setLoading(false);

        };

        getMovies();
    }, []);

    const displayVideos = ({ item }) => {
        return (
            <View style={{ height: 300, width: deviceWidth, margin: 20 }}>

                <View >
                    <YoutubePlayer
                        height={250}
                        play={true}
                        videoId={item.key}
                    //https://youtube.be/6JnN1DmbqoU
                    //https://www.youtube.com/watch?v=6JnN1DmbqoU
                    //style={{      width: deviceWidth - 10, }}
                    //const YOUTUBE_BASE_URL = "https://www.youtube.com/watch";
                    //const getVideo = (key) => `${YOUTUBE_BASE_URL}?v=${key}`;
                    />
                    {/* <YouTube
                    videoId='6JnN1DmbqoU'
                    play
                    fullscreen
                    style={{height:300,alignSelf:'stretch'}}
                    /> */}

                </View>

                <View>
                    <Text style={{
                        // width: 300,
                        fontSize: 12, textAlign: 'center', color: colors.text,
                    }}>{item.name}</Text>
                    <Text style={{
                        // width: 300,
                        fontSize: 12, textAlign: 'center', color: colors.text,
                    }}>published at: {item.published_at} </Text>
                </View>

            </View>
        );
    };
    return (

        <View>
            <Text style={{
                width: 300,
                fontSize: 20,
                textAlign: 'center',
                marginTop: 10,
                color: colors.text,
            }}>
                Trailers
            </Text>
            <FlatList
                key={'*'}
                //key={item.id}
                keyExtractor={(item, index) => index + "_" + item.id.toString()}
                //keyExtractor={item => item.id}
                data={trailer}
                // renderItem={displayVideos}
                horizontal
                renderItem={item => displayVideos(item, props)}
            />
        </View>
    )
}
export default VideoList;