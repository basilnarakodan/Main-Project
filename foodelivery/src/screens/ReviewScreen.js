import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { ReviewCard, CourseCard, Separator } from "../components";
import { Colors, Fonts } from "../constants";
import { Display } from "../utils";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ReviewService } from "../services";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";

const ReviewScreen = ({ navigation }) => {

    const searchRef = useRef();

    const [reviews, setReviews] = useState(null);
    const [oldReviews, setOldReviews] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            ReviewService.getReview().then(response => {
                if (response?.status) {
                    // console.log(response?.data)
                    setReviews(response?.data);
                    setOldReviews(response?.data);
                    // console.log(alumnis)
                }
            })
        })
        return unsubscribe;
    }, [])

    const onSearch = (searchText) => {
        if (searchText == "") {
            setReviews(oldReviews)
        } else {
            let tempList = reviews.filter(item => {
                return item.company.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
            });
            setReviews(tempList);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
                <Separator height={StatusBar.currentHeight } />
                <View style={styles.headerContainer}>
                    <Ionicons name="chevron-back-outline" size={30} onPress={() => navigation.goBack()} />
                    {/* <TouchableOpacity onPress={() => navigation.openDrawer()} activeOpacity={0.8}>
                        <Entypo
                            name="menu"
                            size={32}
                            color={Colors.DEFAULT_GREEN}
                            style={{ marginRight: 10 }}
                        />
                    </TouchableOpacity> */}
                    <Text style={styles.headerTitle}>Reviews</Text>
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
                <Separator height={15} />

                {/* <TouchableOpacity
                    style={styles.add}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('AddReview')}
                >
                    <Text>Share youre Experiance </Text>
                    <AntDesign name="plus" size={20} color={Colors.DEFAULT_GREEN} />

                </TouchableOpacity> */}

                {reviews?.map((item, index) => (
                    <ReviewCard {...item} key={index} />
                ))}
                <Separator height={50} />

            </ScrollView>

            <TouchableOpacity
                style={styles.share}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('AddReview')}
            >
                <View style={styles.inputSubContainer}>
                    <Text style={styles.inputTextBottom}>Share your Experiance here</Text>
                        <Ionicons
                            name="send"
                            size={22}
                            color={Colors.DEFAULT_GREEN}
                            style={{ marginRight: 10 }}
                        />
                </View>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.LIGHT_GREY
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        lineHeight: 20 * 1.4,
        width: Display.setWidth(80),
        textAlign: "center",
    },
    add: {
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        paddingTop: 10,
        height: 35,
        width: Display.setWidth(90),
    },
    inputContainer: {
        backgroundColor: Colors.DEFAULT_WHITE,
        paddingHorizontal: 20,
        marginTop: 15,
        marginHorizontal: 10,
        height: 45,
        borderRadius: 8,
        borderWidth: 0.5,
        width: Display.setWidth(90),
        borderColor: Colors.LIGHT_GREY2,
        justifyContent: "center",
        alignItems: "center"
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
    share: {
        // position:"absolute",
        bottom: 15,
        backgroundColor: Colors.DEFAULT_WHITE,
        paddingHorizontal: 20,
        marginTop: 15,
        marginHorizontal: 10,
        height: 45,
        borderRadius: 15,
        borderWidth: 1.5,
        width: Display.setWidth(95),
        borderColor: Colors.DEFAULT_GREEN,
        justifyContent: "center",
        alignItems: "center"
    },
    inputTextBottom: {
        fontSize: 18,
        textAlignVertical: "center",
        padding: 0,
        height: Display.setHeight(6),
        color: Colors.DEFAULT_GREY,
        flex: 1,
    },
});

export default ReviewScreen;