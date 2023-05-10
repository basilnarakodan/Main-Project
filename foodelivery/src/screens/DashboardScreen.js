import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image } from "react-native";
import { Colors, Fonts } from "../constants";
import { Separator } from "../components";
import { Display } from "../utils";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RestaurantService, JobService, UserService } from "../services";
import { RestaurantMediumCard } from "../components";
import { getUserData } from '../Store'
import Entypo from "react-native-vector-icons/Entypo";

const DashboardScreen = ({ navigation }) => {

    const [jobs, setJobs] = useState(null);
    const [appliedJobCount, setAppliedJobCount] = useState(0);
    const [allJobCount, setAllJobCount] = useState(0);
    // const [userData, setUserData] = useState(getUserData());

    useEffect(() => {

        const fetchData = async () => {
            const userData = await getUserData();
            if (userData && userData.data && userData.data.register_number) {
                JobService.getAppliedJob(userData?.data?.register_number).then(response => {
                    if (response?.status) {
                        // console.log(response?.data)
                        setJobs(response?.data);
                        setAppliedJobCount(response?.count?.appliedJobs)
                        setAllJobCount(response?.count?.allJobs)
                        // console.log(jobs)
                    }
                })
            }
        };
        const unsubscribe = navigation.addListener('focus', fetchData);
        return unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
                <Separator height={StatusBar.currentHeight} />
                <View style={styles.headerContainer}>
                    {/* <Ionicons name="chevron-back-outline" size={30} onPress={() => navigation.goBack()} /> */}
                    <TouchableOpacity onPress={() => navigation.openDrawer()} activeOpacity={0.8}>
                        {/* <Entypo
                            name="menu"
                            size={32}
                            color={Colors.DEFAULT_GREEN}
                            style={{ marginRight: 10 }}
                        /> */}
                        <Image source={require('../assets/images/menu.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Dashboard</Text>
                </View>
                <Separator height={15} />
                <View style={styles.boxContainer}>
                    <View style={styles.firstBox}>
                        <Text style={styles.firstBoxTextNumber}>{appliedJobCount}</Text>
                        <Text style={styles.firstBoxText}>Applies</Text>
                    </View>
                    <View>
                        <View style={styles.secondBox}>
                            <Text style={styles.secondBoxTextNumber}>{allJobCount}</Text>
                            <Text style={styles.secondBoxText}>Jobs listed</Text>
                        </View>
                        {/* <View style={styles.secondBox}>
                            <Text style={styles.secondBoxText}></Text>
                        </View> */}
                    </View>
                </View>
                <Text style={styles.applicationsHead}>Your Applications</Text>
                {jobs?.map(item => (
                    <RestaurantMediumCard {...item} key={item?.id} navigate={(id, company) => navigation.navigate("Details", { id, company })} />
                ))}
                <Separator height={Display.setHeight(5)} />
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
        justifyContent: "center",
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
    boxContainer: {
        flexDirection: "row",
        width: Display.setWidth(100),
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    firstBox: {
        backgroundColor: Colors.DEFAULT_GREEN,
        width: Display.setWidth(45),
        height: Display.setHeight(20),
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    secondBox: {
        backgroundColor: Colors.DEFAULT_GREEN,
        width: Display.setWidth(45),
        height: Display.setHeight(20),
        borderRadius: 20,
        margin: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    firstBoxText: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_WHITE,
    },
    secondBoxText: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_WHITE,

    },
    firstBoxTextNumber: {
        fontSize: 55,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_WHITE,

    },
    secondBoxTextNumber: {
        fontSize: 55,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_WHITE,

    },
    applicationsHead: {
        fontSize: 18,
        fontFamily: Fonts.POPPINS_BOLD,
        padding: 20,
    }

});

export default DashboardScreen;