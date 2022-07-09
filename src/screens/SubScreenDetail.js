import React, { useEffect, useState } from 'react';
import Styles from '../utils/Styles';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { IMAGE_POSTER_URL } from '../utils/Config';
import { GET } from '../service/Api';
import Loader from '../utils/Loader';
// import Icon from 'react-native-vector-icons/Entypo';
import Constants from '../utils/Constants';
import { useTheme } from '@react-navigation/native';
import TrendingPeople from '../components/TrendingPeople';
import VideoList from '../components/VideoList';
import TrendingMovies from '../components/TrendingMovies';
import admob, { BannerAd, InterstitialAd, AdEventType, RewardedAd, TestIds, MaxAdContentRating, BannerAdSize } from '@react-native-firebase/admob';
//3


const SubScreenDetail = (props, { navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();
  const { colors } = useTheme();
  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;

  const { movie } = props.route.params; 



  useEffect(() => {
    const getDetails = async () => {
      const data = await GET(`/movie/${movie}`,);//props.route.params.
      setDetails(data);
      setLoading(false);
    };
    getDetails();
  }, []);



  const getGenre = () => {
    return details.genres.map(genre => (
      <View style={{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.text,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
      }}>
        <Text style={{ display: 'flex', flexDirection: 'row', color: colors.text, fontSize: 16, }}>{genre.name}</Text>
      </View>
    ));
  };


  return (
    <ScrollView style={Styles.sectionBg}>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <View>
            <Image
              source={{ uri: `${IMAGE_POSTER_URL}${details.backdrop_path}` }}
              style={Styles.imageBg}
            />
          </View>
          <Text style={Styles.detailsMovieTitle}>{details.original_title}</Text>

          {details.homepage ? (
            <View style={Styles.linkContainer}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(details.homepage);
                }}>
                {/* <Icon name="link" color={Constants.textColor} size={22} /> 
                   for genre up there style={Styles.genre} 
                  react-native-vector-icons  {/* style={Styles.heading}*/}
              </TouchableOpacity>
            </View>
          ) : null}

          <Text style={{ color: colors.text, margin: 10, fontSize: 20 }}>GENRE</Text>
          <ScrollView
            horizontal={true}>
            <View>

              <View style={{ display: 'flex', flexDirection: 'row', color: colors.text,margin:20 }}>
                {getGenre()}
              </View>
            </View>
          </ScrollView>

          {/* <View>
            <BannerAd
              unitId={"ca-app-pub-2031920793825769/5339857322"}
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

          <ScrollView
            horizontal={true}>

            <View style={Styles.detailsContainer}>
              <View>
                <Text style={Styles.heading}>BUDGET</Text>
                <Text style={Styles.details}>$ {details.budget}</Text>
              </View>

              <View>
                <Text style={Styles.heading}>DURATION</Text>
                <Text style={Styles.details}>{details.runtime} min.</Text>
              </View>

              <View>
                <Text style={Styles.heading}>RELEASE DATE</Text>
                <Text style={Styles.details}>{details.release_date}</Text>
              </View>
            </View>
          </ScrollView>

          <View style={{
            fontSize: 19,
            margin: 10,
            color: colors.text,
          }}>
            <Text style={Styles.heading}>overview</Text>
            <Text style={Styles.details}>{details.overview}</Text>
          </View>
          <TrendingPeople
            title="CAST"
            url={`/movie/${movie}/credits`}
            isForPage="details"
          />

          {/* <View>
            <BannerAd
              unitId={"ca-app-pub-2031920793825769/1627843021"}
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

          <View>
            <VideoList
              title="TRAILER"
              url={`/movie/${movie}/videos`}
            //isForPage="details"
            // style={{ height: 450, width: deviceWidth }}
            />
          </View>
          <View>
            <Text style={{
              fontSize: 19,
              margin: 10,
              color: colors.text,
            }}>Similar</Text>
            <TrendingMovies
              title="Similar Movies"
              url={`/movie/${movie}/similar`}
              navigation={props.navigation}
            //isForPage="details"
            />
          </View>

          {/* <View>
            <BannerAd
              unitId={"ca-app-pub-2031920793825769/1400612313"}
              size={BannerAdSize.MEDIUM_RECTANGLE}
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


          {/* <View>
          <Text style={{
              fontSize: 19,
              margin: 10,
              color: colors.text,
            }}>Movie Gallery</Text>
          <Images
                title="Movie Gallery"
                url={`/movie/${props.route.params.movieId}/images`}
                navigation={props.navigation}
                //isForPage="details"
              />
          </View> */}




          <View>
            <Text style={{
              fontSize: 19,
              margin: 10,
              color: colors.text,
            }}>Recommendations</Text>
            <TrendingMovies
              title="Recommendations"
              url={`/movie/${movie}/recommendations`}
              navigation={props.navigation}
            //isForPage="details"
            />
          </View>

        </View>)}
    </ScrollView>
  );
};
export default SubScreenDetail;
