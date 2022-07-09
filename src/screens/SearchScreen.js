import React, { useState, useEffect } from 'react';
import Styles from '../utils/Styles';
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
  TextInput,
  SafeAreaView,

  //Modal
} from 'react-native';
import axios from "axios";
import NetInfo from "@react-native-community/netinfo"
import Modal from "react-native-modal";
import { useTheme } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Feather';
// import Icon from 'react-native-vector-icons//Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, genImageUrl, width } from '../utils/Constants';
// import { colors, genImageUrl, width } from '../constants/utils';
import Axios from 'axios';
//const apiURL = `https://api.themoviedb.org/3/search/multi?api_key=53939b3da3d575c42c212fb77c52c5a5&query=${search}&page=1`;
import Loader from '../utils/Loader';
import { GET } from '../service/Api';
import admob, { BannerAd, InterstitialAd, AdEventType, RewardedAd, TestIds, MaxAdContentRating, BannerAdSize } from '@react-native-firebase/admob';
//1






const SearchScreen = props => {
 // ({ navigation })
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=53939b3da3d575c42c212fb77c52c5a5&page=${currentPage}`;
    Axios.get(url).then(response => {
      const movies = response.data.results;
      setMovies([...movies,...response.data.results]);
      //setMovies([...movies,...responseJson.results]);
  setMovies(movies);
      setIsLoading(false);
    });
  }, []);


  const searchMovies = text => {
    let url = `https://api.themoviedb.org/3/search/movie?query=${text}&api_key=53939b3da3d575c42c212fb77c52c5a5&page=${currentPage}&language=en-US&include_adult=false`;

    Axios.get(url).then(response => {
      let movies = response.data.results;
      //setMovies([...movies,...response.data.results]);
      //setMovies([...movies,...responseJson.results]);
      setMovies(movies);
      setIsLoading(false);
      //console.log(responseJson.results)
    });
  }; 



//   const searchMovies= text=>{
//     const apiURL =  //`https://api.themoviedb.org/3/movie/now_playing?api_key=53939b3da3d575c42c212fb77c52c5a5&page=${currentPage}`;
//     //let url = 
//     `https://api.themoviedb.org/3/search/movie?query=${text}&api_key=53939b3da3d575c42c212fb77c52c5a5&page=${currentPage}&language=en-US&include_adult=false`;
//     fetch(apiURL)
//      .then((response) => response.json())
//      .then((responseJson) => {
//         setMovies([...movies,...responseJson.results]);
//         //console.log(responseJson);
//         setIsLoading(false);
//      }).catch((error) => {
//          console.log(error);
//      })
// }






  // useEffect(() => {
  //   const url = `https://api.themoviedb.org/3/trending/all/day?api_key=53939b3da3d575c42c212fb77c52c5a5&page=${currentPage}`;    fetch(apiURL)
  //    .then((response) => response.json())
  //    .then((responseJson) => {
  //       setMovies([...movies,...responseJson.results]);
  //       //console.log(responseJson);
  //       setIsLoading(false);
  //    }).catch((error) => {
  //        console.log(error);
  //    })
  //   //console.log(data.results);
  //  // getMovies();
  // }, []);
//   const getMovies=()=>{
//     const url = `https://api.themoviedb.org/3/trending/all/day?api_key=53939b3da3d575c42c212fb77c52c5a5&page=${currentPage}`;    fetch(apiURL)
//      .then((response) => response.json())
//      .then((responseJson) => {
//         setMovies([...movies,...responseJson.results]);
//         //console.log(responseJson);
//         setIsLoading(false);
//      }).catch((error) => {
//          console.log(error);
//      })
// }




 

  const loadMoreItem = () => {

    setCurrentPage(currentPage + 1);
};

const renderLoader = () => {
  return (
      isLoading ?
          <View style={styles.loaderStyle}>
              <ActivityIndicator size="large" color="#aaa" />
          </View> : null
  );
};


  return (
    <SafeAreaView
    style={{marginBottom:170}}
    >
      {/* search */}
      <View
        style={{
          marginBottom: 20,
        }}>
        <TextInput
          placeholder="Search Movies"
          placeholderTextColor="black"
          onChangeText={text => searchMovies(text)}
          style={{
            height: 50,
            paddingLeft: 10,
            fontSize: 15,
            margin:8,
            borderRadius:9,
            backgroundColor: 'gray',
            color:colors.text
          }}
        />
      </View>

      {/* render movies */}
      {isLoading ? (
                <Loader />
            ) : (
      <FlatList
        key={'*'}
        keyExtractor={(item, index) => index + "_" + item.id.toString()}
        numColumns={2}
        data={movies}
        //keyExtractor={item => item.id}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        //onEndReached={() => console.log('load more movies')}
        onEndReachedThreshold={1}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }} 
        //renderItem={item => renderItem(item, props)}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              //onPress={() => navigation.navigate('MovieDetail', { ...item })}
              onPress={() => {props.navigation.push('MovieDetails', { movieId: item.id });}}
              >
              <View>
                <Image
                  source={{
                    uri: genImageUrl(item.poster_path),
                  }}
                  style={{
                    width: width * 0.5 - 20,
                    height: 250,
                    marginRight: 5,
                    borderRadius:10,
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      flex: 1,
                      flexWrap: 'wrap',
                      fontSize: 18,
                    }}>
                    {' '}
                    {item.title ? item.title : 'No title'}{' '}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
       
      />
      )}


<View>
            {/* <BannerAd
              unitId={"ca-app-pub-2031920793825769/2449421365"}
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
            /> */}
          </View>
    </SafeAreaView>
  );
};



const Style = StyleSheet.create({
searchSafeArea:{
  marginTop:0,
},
})
export default SearchScreen;
















































































// const SearchScreen = () => {
//   const [filteredData, setFilteredData] = useState([]);
//   const [masterData, setmasterData] = useState([]);
//   const [search, setSearch] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const { colors } = useTheme();

//   const fetchMovies = () => {
//     //const apiURL = 'https://jsonplaceholder.typicode.com/posts';
//     const apiURL = `https://api.themoviedb.org/3/search/multi?api_key=53939b3da3d575c42c212fb77c52c5a5&query=${search}&page=1`;
//     fetch(apiURL)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         setFilteredData(responseJson);
//         setmasterData(responseJson);
//         setIsLoading(false);
//         console.log(responseJson);
//       }).catch((error) => {
//         console.log(error);
//       })
//   }






//   useEffect(() => {
//     fetchMovies(search);
//     return () => {

//     }
//   }, []);

//   const searchFilter = (text) => {
//     if(text) {
//         const newData = masterData.filter((item) => {
//             const itemData = item.original_title ? item.original_title : ''
//             const original_titleData = text
//             return itemData.indexOf(original_titleData) > -1;
//         });
//         setFilteredData(newData);
//         setSearch(original_title);
//     } else {
//         setFilteredData(masterData);
//         setSearch(text)
//     }
// }


// const ItemView = ({item})=> {
//   return(
//       <View>
//           <Text>{item.original_title}</Text>
//       </View>
//   )
// }
//   return (
//     <SafeAreaView>
//       {/* <TextInput
         
//           placeholder='search...'
//           style={{ borderColor: 'purple', 
//           fontSize: 18,
//           height:40,
//           //width:"95%",
//           margin:6,
//           borderWidth:2,
//           borderRadius:8,
//           color:colors.text,

//          }}
         

//           /> */}


//       <View style={styles.container}>
//         <View
//           style={
//             clicked
//               ? styles.searchBar__clicked
//               : styles.searchBar__unclicked
//           }
//         >
//           <Text style={{ color: colors.text, }} >
//             <Icon
//               name="search"
//               size={20}

//               style={{ marginLeft: 1 }}
//             />
//           </Text>

//           <TextInput

//             style={{
//               color: colors.text,
//               borderColor: 'purple',
//               fontSize: 20,
//               borderWidth: 2,
//               borderRadius: 5,
//               marginLeft: 10,
//               width: "90%",
//             }}
//             placeholder="Search"
//             //value={searchPhrase}
//             value={search}
//             //onChangeText={setSearchPhrase}
//             onChangeText={(text) => searchFilter(text)}
//           //   onFocus={() => {
//           //     setClicked(true);
//           //   }}
//           />

//           {clicked && (
//             <Icon name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
//               setSearchPhrase("")
//             }} />
//           )
//           }
//         </View>

//         {clicked && (
//           <View>
//             <Button
//               title="Cancel"
//               onPress={() => {
//                 Keyboard.dismiss();
//                 setClicked(false);
//               }}
//             ></Button>
//           </View>
//         )}
//       </View>
//       <FlatList
//                 data={filteredData}
//                 //ItemSeparatorView={ItemSeparatorView}
//                 keyExtractor={(item,index) => index.toString()}
//                 renderItem = {ItemView}
//                 />




//       <Text>hello search</Text>
//     </SafeAreaView>
//   );




// };



// // styles
// const styles = StyleSheet.create({
//   container: {
//     margin: 15,
//     justifyContent: "flex-start",
//     alignItems: "center",
//     flexDirection: "row",
//     width: "98%",

//   },
//   searchBar__unclicked: {
//     padding: 3,
//     flexDirection: "row",
//     width: "95%",
//     // backgroundColor: "#d9dbda",
//     borderRadius: 15,
//     alignItems: "center",
//     borderColor: 'purple'
//   },
//   searchBar__clicked: {
//     padding: 5,
//     flexDirection: "row",
//     width: "90%",
//     //backgroundColor: "#d9dbda",
//     borderRadius: 15,
//     alignItems: "center",
//     justifyContent: "space-evenly",
//     color: 'black'
//   },
//   input: {
//     fontSize: 20,
//     marginLeft: 10,
//     width: "90%",
//   },
// });

// export default SearchScreen;


