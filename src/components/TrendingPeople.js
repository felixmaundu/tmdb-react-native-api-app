import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, Text } from 'react-native';
import { IMAGE_POSTER_URL } from '../utils/Config';
import { GET } from '../service/Api';
import Styles from '../utils/Styles';
import Loader from '../utils/Loader';
import { useTheme } from '@react-navigation/native';

const TrendingPeople = props => {
    const [loading, setLoading] = useState(true);
    const [people, setPeople] = useState();
    const { colors } = useTheme();

    useEffect(() => {
        const getPeople = async () => {
            const data = await GET(props.url);
            setPeople(props.isForPage === 'details' ? data.cast : data.results);
            setLoading(false);
        };

        getPeople();
    }, []);



    const displayPeople = ({ item }) => {
        return (
            <View style={Styles.trendingPeopleContainer}>
                <Image
                    source={{ uri: `${IMAGE_POSTER_URL}${item.profile_path}` }}
                    style={Styles.trendingPeopleImage}
                />
                <Text style={{
                    width: 60,
                    fontSize: 12,
                    textAlign: 'center',
                    marginTop: 10,
                    color: colors.text,
                }}>{item.name}</Text>
            </View>
        );
    };

    return (
        <View>
            {loading ? (
                <Loader />
            ) : (
                <View>
                    <Text
                        style={{
                            fontSize: 19,
                            margin: 10,
                            color: colors.text,
                        }}>{props.title}</Text>
                    <FlatList
                        key={'*'}
                        //key={item.id}
                        keyExtractor={(item, index) => index + "_" + item.id.toString()}
                        //keyExtractor={item => item.id}
                        data={people}
                        renderItem={displayPeople}
                        horizontal
                    />
                </View>
            )}
        </View>
    );
};


export default TrendingPeople;
