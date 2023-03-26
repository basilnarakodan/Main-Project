import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TextInput, StatusBar, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Display } from "../utils";
import { Separator } from "../components";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors, Fonts, Images } from "../constants"
import { RestaurantService, JobService, UserService, StorageService } from "../services";
import { RestaurantCard, RestaurantMediumCard } from "../components";
import AnnouncementService from "../services/AnnouncementService";


const HomeScreen = ({ navigation }) => {

    const [restaurants, setRestaurants] = useState(null);
    const [jobs, setJobs] = useState(null);
    const [oldjobs, setOldJobs] = useState(null);
    const [search, setSearch] = useState("");
    const searchRef = useRef();
    const [announcements, setAnnouncements] = useState(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            RestaurantService.getRestaurants().then(response => {
                if (response?.status) {
                    // console.log(response?.data)
                    setRestaurants(response?.data);
                    // console.log(restaurants)
                }
            })
            JobService.getJobs().then(response => {
                if (response?.status) {
                    // console.log(response?.data)
                    setJobs(response?.data);
                    setOldJobs(response?.data);
                    // console.log(jobs)
                }
            })
            AnnouncementService.getAnnouncements().then(response => {
                if (response?.status) {
                    // console.log(response?.data)
                    setAnnouncements(response?.data);
                    // console.log(announcements)
                }
            })
        })
        return unsubscribe;
    }, [])

    const onSearch = (searchText) => {
        if (searchText == "") {
            setJobs(oldjobs)
        } else {
            let tempList = jobs.filter(item => {
                return item.company.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
            });
            setJobs(tempList);
        }

    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
            <Separator height={StatusBar.currentHeight} />
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
                    {search==""?null:(
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

            <ScrollView
                style={styles.listContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.horizontalListContainer}>
                    <FlatList
                        data={announcements}
                        keyExtractor={item => item?.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ListHeaderComponent={() => <Separator width={20} />}
                        ListFooterComponent={() => <Separator width={20} />}
                        ItemSeparatorComponent={() => <Separator width={10} />}
                        renderItem={({ item }) => (
                            <RestaurantCard
                                {...item}
                                // navigate={restaurantId =>
                                //     navigation.navigate('Profile', { restaurantId })
                                // }
                            />
                        )}
                    />
                </View>
                <View style={styles.listHeader}>
                    <Text style={styles.listHeaderTitle}>Recent Jobs</Text>
                </View>
                {jobs?.map(item => (
                    <RestaurantMediumCard {...item} key={item?.id} navigate={(id) => navigation.navigate("Details", { id })} />
                ))}
                <Separator height={Display.setHeight(5)} />
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    inputContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 20,
        marginVertical: 15,
        marginHorizontal: 20,
        height: 45,
        borderRadius: 8,
        borderWidth: 0.5,
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
    listContainer: {
        paddingVertical: 0,
        zIndex: -5,
    },
    horizontalListContainer: {
        marginTop: 0,
    },
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 5,
    },
    listHeaderTitle: {
        color: Colors.DEFAULT_BLACK,
        fontSize: 16,
        lineHeight: 16 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginTop: 15,
    },
});

export default HomeScreen;