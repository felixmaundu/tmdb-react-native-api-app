import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
// import Icon,{FontAwesomeIcon} from "react-native-vector-icons/FontAwesome";
import Icon from 'react-native-vector-icons/MaterialIcons'

const Header = (props) => {
    const { colors } = useTheme();
 
    return (
        <SafeAreaView style={{
            flex: 2, alignItems: "center", marginTop: 40, flexDirection: 'row',
            justifyContent: 'space-between', height: 60
        }}>
            <View>
                <Text style={{ color: colors.text, fontSize: 22, }}>Discover</Text>
            </View>
            <View style={{
                marginEnd: 20
            }}>
                {/* <Text style={{ color: colors.text, fontSize: 22, }}>Discover</Text> */}
                <Text>

                    {/* <FontAwesomeIcon icon="fa-solid fa-arrow-up-long" /> */}
                </Text>

            </View>

            <TouchableOpacity>
                <Text style={{ color: colors.text, fontSize: 18, marginEnd: 20 }}
                    onPress={() => {
                        props.navigation.push('Search');
                    }}
                ><Icon
                        // name={Platform.OS === "android" ? "android-add" : "md-add"}
                        name="search"
                        // color="#000"
                        size={30}
                    /></Text>
            </TouchableOpacity>

        </SafeAreaView>
    )

}
export default Header;