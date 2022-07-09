import React, { useState, useEffect } from 'react';
import Styles from '../utils/Styles';
import admob, { BannerAd, InterstitialAd, AdEventType, RewardedAd, TestIds, MaxAdContentRating, BannerAdSize } from '@react-native-firebase/admob';
//1
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Button,
    StatusBar,
    FlatList,
    //Modal
} from 'react-native';
import axios from "axios";
import NetInfo from "@react-native-community/netinfo"
import Modal from "react-native-modal";
import { useTheme } from '@react-navigation/native';


const TrendingMore = props => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isOffline, setOfflineStatus] = useState(false);
    const { colors } = useTheme();


    apiKey = "53939b3da3d575c42c212fb77c52c5a5";

    // const getMovies = (url) => {
    //     setIsLoading(true);
    //     axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=53939b3da3d575c42c212fb77c52c5a5&language=en-US&page=${currentPage}`)
    //         .then(res => {

    //             setMovies([...movies, ...res?.data.results]);
    //             setIsLoading(false);
    //         });
    // };

    const getMovies = () => {
        const apiURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=53939b3da3d575c42c212fb77c52c5a5&page=${currentPage}`;
        fetch(apiURL)
            .then((response) => response.json())
            .then((responseJson) => {
                setMovies([...movies, ...responseJson.results]);
                //console.log(responseJson);
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setOfflineStatus(offline);
        });

        getMovies();
        return () => removeNetInfoSubscription();
    }, [currentPage]);






    const renderItem = ({ item }, props) => {
        return (
            <TouchableOpacity style={styles.itemWrapperStyle}

            >
                <Image style={styles.itemImageStyle}
                    source={{ uri: `https://image.tmdb.org/t/p/original${item.poster_path}` }}
                />
                <TouchableOpacity style={styles.contentWrapperStyle}
                    onPress={() =>
                        props.navigation.navigate('SubDetail', { movie: item.id })}
                >
                    <Text style={{ color: colors.text }}>{item.title}</Text>
                    <Text style={{ color: colors.text }}>Vote Count: {item.vote_count} </Text>
                    <Text style={{ color: colors.text }}>vote average: {item.vote_average} </Text>
                    <Text style={{ color: colors.text }}>Release Date: {item.release_date} </Text>
                    <Text style={{ color: colors.text, }}>Language: {item.original_language}</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    const renderLoader = () => {
        return (
            isLoading ?
                <View style={styles.loaderStyle}>
                    <ActivityIndicator size="large" color="#aaa" />
                </View> : null
        );
    };

    const loadMoreItem = () => {

        setCurrentPage(currentPage + 1);
    };

    const okThanks = ({ }) => (
        setModalVisible(!isModalVisible)
    );


    const Button = ({ children, ...props }) => (
        <TouchableOpacity style={styles.button} {...props}>
            <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
    );

    const clear = ({ }) => {
        //() => setModalVisible(false) 
        <TouchableOpacity style={styles.button} {...props}>
            <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
    }

    const NoInternetModal = ({ show, onRetry, isRetrying, clear, noRetring }) => (
        <Modal isVisible={show} style={styles.modal} animationInTiming={600}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Connection Error</Text>
                <Text style={styles.modalText}>
                    Oops! No connected to the Internet.
                </Text>
                <View style={styles.modalButtonContainer}>
                    <Button onPress={onRetry} disabled={isRetrying}>
                        Try Again
                    </Button>
                    <Button onPress={clear} disabled={noRetring}>
                        Ok, No thanks.
                    </Button>
                </View>
            </View>
        </Modal>
    );





    return (
        <View>

            {/* <View>
                <BannerAd
                    unitId={"ca-app-pub-2031920793825769/3479980741"}
                    size={BannerAdSize.FULL_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                    onAdLoaded={() => {
                        console.log('Advert loaded');
                    }}
                    onAdFailedToLoad={(error) => {
                        console.error('Advert failed to load: ', error);
                    }}
                />
            </View> */}







            <FlatList
                data={movies}
                renderItem={item => renderItem(item, props)}
                key={'*'}
                //key={item.id}
                keyExtractor={(item, index) => index + "_" + item.id.toString()}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItem}
                onEndReachedThreshold={0.5}

            />
            <NoInternetModal
                show={isOffline}
                onRetry={getMovies}
                clear={okThanks}
                isRetrying={isLoading}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    itemWrapperStyle: {
        flexDirection: "row",
        paddingHorizontal: 6,
        paddingVertical: 6,
        //borderBottomWidth: 1,
        //borderColor: "#ddd",
    },
    itemImageStyle: {
        width: 120,
        height: 180,
        marginRight: 16,
    },
    // contentWrapperStyle: {
    // justifyContent: "space-around",
    //  },
    txtNameStyle: {
        fontSize: 16,
        // color: "white",
    },
    txtEmailStyle: {

    },
    loaderStyle: {
        margin: 20,
        alignItems: "center",

    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalButtonContainer: {
        //flexDirection:'Horizontal'
    },
    modalContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 40,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '600',
    },
    modalText: {
        fontSize: 18,
        color: '#555',
        marginTop: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
});

export default TrendingMore;
