import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, TextInput,TouchableOpacity } from "react-native";
import { Colors, Fonts } from "../constants";
import { Display } from "../utils";
import { Separator, ConnectCard } from "../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { RestaurantService, AlumniService } from "../services";


const ConnectScreen = ({ navigation }) => {

    const [restaurants, setRestaurants] = useState(null);
    const [alumnis, setAlumnis] = useState(null);
    const [oldAlumnis, setOldAlumnis] = useState(null);
    const [search, setSearch] = useState("");
    const searchRef = useRef();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            RestaurantService.getRestaurants().then(response => {
                if (response?.status) {
                    // console.log(response?.data)
                    setRestaurants(response?.data);
                    // console.log(restaurants)
                }
            })
            AlumniService.getAlumnis().then(response => {
                if (response?.status) {
                    // console.log(response?.data)
                    setAlumnis(response?.data);
                    setOldAlumnis(response?.data);
                    // console.log(alumnis)
                }
            })
        })
        return unsubscribe;
    }, [])

    const onSearch = (searchText) => {
        if (searchText == "") {
            setAlumnis(oldAlumnis)
        } else {
            let tempList = alumnis.filter(item => {
                return item.joined_company.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
            });
            setAlumnis(tempList);
        }

    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
                <Separator height={StatusBar.currentHeight + 10} />
                <View style={styles.headerContainer}>
                    <Ionicons name="chevron-back-outline" size={30} onPress={() => navigation.goBack()} />
                    <Text style={styles.headerTitle}>Connect</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputSubContainer}>
                        <Feather
                            name="search"
                            size={22}
                            color={Colors.DEFAULT_GREY}
                            style={{ marginRight: 10 }}
                        />
                        <TextInput
                            ref={searchRef}
                            placeholder="Search"
                            placeholderTextColor={Colors.DEFAULT_GREY}
                            selectionColor={Colors.DEFAULT_GREY}
                            style={styles.inputText}
                            value={search}
                            onChangeText={(searchText) => {
                                setSearch(searchText)
                                onSearch(searchText)
                            }}
                        />
                        {search == "" ? null : (
                            <TouchableOpacity
                                onPress={() => {
                                    searchRef.current.clear();
                                    setSearch("");
                                }}>
                                <Ionicons
                                    name="close"
                                    size={22}
                                    color={Colors.DEFAULT_GREY}
                                    style={{ marginRight: 10 }}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <Separator height={10} />
                <Text style={styles.applicationsHead}>People you may know</Text>
                <Separator height={10} />
                {alumnis?.map(item => (
                    <ConnectCard {...item} key={item?.id} />
                ))}
                <Separator height={60} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.DEFAULT_WHITE,

    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        lineHeight: 20 * 1.4,
        width: Display.setWidth(80),
        textAlign: "center",
    },
    inputContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 20,
        marginVertical: 15,
        marginHorizontal: 0,
        height: 45,
        borderRadius: 8,
        borderWidth: 0.5,
        width: Display.setWidth(90),
        borderColor: Colors.LIGHT_GREY2,
        justifyContent: "center",
    },
    inputSubContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputText: {
        fontSize: 18,
        textAlignVertical: "center",
        padding: 0,
        height: Display.setHeight(6),
        color: Colors.DEFAULT_BLACK,
        flex: 1,
    },
    applicationsHead: {
        fontSize: 18,
        fontFamily: Fonts.POPPINS_BOLD,
    }
});

export default ConnectScreen;