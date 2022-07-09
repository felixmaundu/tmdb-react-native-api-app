import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, Touchable, TouchableOpacity, ScrollView,
    SafeAreaView, Button
} from 'react-native';
import Styles from '../utils/Styles';
import TrendingMovies from '../components/TrendingMovies';
import { useTheme } from '@react-navigation/native';
import admob, { InterstitialAd, InterstitialAdManager, BannerAd, AdEventType, RewardedAd, TestIds, MaxAdContentRating, BannerAdSize, firebase } from '@react-native-firebase/admob';
//import { InterstitialAd,InterstitialAdManager,TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';


import { BannerView, NativeAdsManager } from 'react-native-fbads'
// import { InterstitialAdManager } from 'react-native-fbads';



const HomeScreen = props => {
    firebase.initializeApp();
    const { colors } = useTheme();

    // InterstitialAdManager.showAd("718030576074706_718061932738237")
    // .then(didClick => {})
    // .catch(error => {});

    // useEffect(() => {
    //     const eventListener = 
    // })

    //const adUnitId = __DEV__ ? TestIds.INTERSTITIAL  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
    const adUnitId = TestIds.INTERSTITIAL;


    const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
    });

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const eventListener = interstitial.onAdEvent(type => {
            if (type === AdEventType.LOADED) {
                setLoaded(true);
            }
        });

        // Start loading the interstitial straight away
        interstitial.load();

        // Unsubscribe from events on unmount
        return () => {
            eventListener();
        };
    }, []);

    // No advert ready to show yet
    if (!loaded) {
        return null;
    }

    showInterstitialAd = () => {
        const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
        //interstitial = ca-app-pub-5798513875764183/3476070727
        //bann = /5216527809
        interstitialAd.onAdEvent((type, error) => {
            if (type === AdEventType.LOADED) {
                interstitialAd.show();
                console.log("succ")
            }
        });

        firebase.interstitialAd.load();

    }

    return (
        <SafeAreaView>
            <ScrollView style={Styles.sectionBg}>


                {/* <StatusBar style="auto" translucent={true} backgroundColor={'#011f4b'} /> */}
                <StatusBar style="auto" />
                <View>
                    <Header
                        navigation={props.navigation}
                    />

                </View>


                {/* <View>
                    {showInterstitialAd.show()}
                </View> */}

                <View style={Styles.holdsection}>
                    <View >
                        <Text style={{ color: colors.text, fontSize: 22, }}>Trending</Text>
                    </View>

                    <TouchableOpacity>
                        <Text style={{ color: colors.text, fontSize: 18, }}
                            onPress={() => {
                                props.navigation.push('Trending');
                            }}
                        >see all</Text>
                    </TouchableOpacity>

                </View>


                {/* <Button
                    title="Show Interstitial"
                    onPress={() => {
                        interstitial.show();
                    }}
                /> */}


                <View>
                    <TrendingMovies
                        //title="Trending Movies"
                        url="trending/movie/week"
                        navigation={props.navigation}
                    />
                </View>

                <View>
                    {/* <NativeAdsManager
              placementId={bannerAdPlacementId}
              type='standard'
              onPress={() => console.log('press add')}
              onError={err => console.log(err)}
              onLoad={() => console.log('Loaded')}
            /> */}
                    {/* <BannerView
                        placementId={"718030576074706_719576762586754"}
                        type='standard'
                        onPress={() => console.log('press add')}
                        onError={err => console.log(err)}
                        onLoad={() => console.log('Loaded')}
                    /> */}
                </View>



                <BannerAd
                    unitId={TestIds.BANNER}
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



                <View style={Styles.holdsection}>
                    <View >
                        <Text style={{ color: colors.text, fontSize: 22, }}>Now Playing</Text>
                    </View>

                    <TouchableOpacity>
                        <Text style={{ color: colors.text, fontSize: 18, }}
                            onPress={() => {
                                props.navigation.push('Now Playing');
                            }}
                        >see all</Text>
                    </TouchableOpacity>

                </View>
                <View>

                    <TrendingMovies
                        //title="Trending Movies"
                        url="movie/now_playing"
                        navigation={props.navigation}
                    />
                </View>



                {/* <BannerAd
                unitId={TestIds.BANNER}
                size={BannerAdSize.ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
                onAdLoaded={() => {
                    console.log('Advert loaded');
                }}
                onAdFailedToLoad={(error) => {
                    console.error('Advert failed to load: ', error);
                }}
            /> */}

                {/* <BannerAd
                    unitId={"ca-app-pub-2031920793825769/6715398619"}
                    size={BannerAdSize.ADAPTIVE_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                    onAdLoaded={() => {
                        console.log('Advert loaded');
                    }}
                    onAdFailedToLoad={(error) => {
                        console.error('Advert failed to load: ', error);
                    }}
                /> */}

                <View style={Styles.holdsection}>
                    <View >
                        <Text style={{ color: colors.text, fontSize: 22, }}>Popular</Text>
                    </View>

                    <TouchableOpacity>
                        <Text style={{ color: colors.text, fontSize: 18, }}
                            onPress={() => {
                                props.navigation.push('Popular');
                            }}
                        >see all</Text>
                    </TouchableOpacity>

                </View>



                <View>
                    <TrendingMovies
                        //title="Trending Movies"
                        url="movie/popular"
                        navigation={props.navigation}
                    />
                </View>
                <View style={Styles.holdsection}>
                    <View >
                        <Text style={{ color: colors.text, fontSize: 22, }}>Top Rated</Text>
                    </View>

                    <TouchableOpacity>
                        <Text style={{ color: colors.text, fontSize: 18, }}
                            onPress={() => {
                                props.navigation.push('Top Rated');
                            }}
                        >see all</Text>
                    </TouchableOpacity>

                </View>
                <View>
                    <TrendingMovies
                        //title="Trending Movies"
                        url="movie/top_rated"
                        navigation={props.navigation}
                    />



                    {/* <BannerAd
                        unitId={"ca-app-pub-2031920793825769/8958418576"}
                        size={BannerAdSize.ADAPTIVE_BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                        onAdLoaded={() => {
                            console.log('Advert loaded');
                        }}
                        onAdFailedToLoad={(error) => {
                            console.error('Advert failed to load: ', error);
                        }}
                    /> */}




                    <View style={Styles.holdsection}>
                        <View >
                            <Text style={{ color: colors.text, fontSize: 22, }}>Upcoming</Text>
                        </View>

                        <TouchableOpacity>
                            <Text style={{ color: colors.text, fontSize: 18, }}
                                onPress={() => {
                                    props.navigation.push('Upcoming');
                                }}
                            >see all</Text>
                        </TouchableOpacity>

                    </View>
                    <View>
                        <TrendingMovies
                            //title="Trending Movies"
                            url="movie/upcoming"
                            navigation={props.navigation}
                        />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
