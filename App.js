import React,{useState,useEffect} from 'react';
import {useColorScheme} from 'react-native';
import { NavigationContainer ,DefaultTheme,DarkTheme} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import TrendingMore from './src/subscreen/TrendingMore'
import Upcoming from './src/subscreen/Upcoming';
import NowPlaying from './src/subscreen/NowPlaying';
import Popular from './src/subscreen/Popular';
import TopRated from './src/subscreen/TopRated';
import SubScreenDetail from './src/screens/SubScreenDetail';
import SearchScreen from './src/screens/SearchScreen';
import SplashScreen from 'react-native-splash-screen';
//import {firebase} from '@react-native-firebase/app'



const Stack = createStackNavigator();
//"ios_app_id": "ca-app-pub-xxxxxxxx~xxxxxxxx"
//banner 1= ca-app-pub-2031920793825769/2761284693
//test banner = ca-app-pub-3940256099942544/6300978111
// ,
//   "react-native-google-mobile-ads": {
//     "android_app_id": "ca-app-pub-2031920793825769~1256631330"
//   }


const MyTheme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary: 'dogderblue',
    background:'white',
    text:'green'
  },
};


function App() {
  
  const scheme = useColorScheme();
  console.log(scheme);
  useEffect(() => {
    SplashScreen.hide();
  }, [])

  
  return (
    <NavigationContainer theme={scheme === 'dark'? DarkTheme : MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: true }}/>
        <Stack.Screen name='MovieDetails' component={DetailScreen} />
        <Stack.Screen name='Trending' component={TrendingMore} />
        <Stack.Screen name='Upcoming' component={Upcoming} />
        <Stack.Screen name='Now Playing' component={NowPlaying} />
        <Stack.Screen name='Popular' component={Popular} />
        <Stack.Screen name='SubDetail' component={SubScreenDetail} />
        <Stack.Screen name='Top Rated' component={TopRated} />
    
        {/* <Stack.Screen name='WebView' component={WebViewComponent} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;







































































// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
