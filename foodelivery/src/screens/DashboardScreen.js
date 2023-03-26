import React,{useState,useEffect} from "react";
import { View, Text, StyleSheet,ScrollView,StatusBar, SliderComponent } from "react-native";
import { Colors,Fonts } from "../constants";
import { Separator } from "../components";
import { Display } from "../utils";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RestaurantService,JobService,UserService } from "../services";
import {RestaurantMediumCard} from "../components";


const DashboardScreen = ({navigation}) => {

    const [jobs, setJobs] = useState(null);
    const [appliedJobCount, setAppliedJobCount] = useState(0);
    const [allJobCount, setAllJobCount] = useState(0);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            UserService.getUserData().then(response => {
                if (response?.status) {
                    // console.log(response?.data)
                    setUserData(response?.data?.data);
                }
            })
            JobService.getAppliedJob("TVE21MCA-2028").then(response => {
                if (response?.status) {
                    // console.log(response?.data)
                    setJobs(response?.data);
                    setAppliedJobCount(response?.count?.appliedJobs)
                    setAllJobCount(response?.count?.allJobs)
                    // console.log(jobs)
                }
            })
        })
        return unsubscribe;
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
                <Separator height={StatusBar.currentHeight + 10} />
                <View style={styles.headerContainer}>
                    <Ionicons name="chevron-back-outline" size={30} onPress={() => navigation.goBack()} />
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
                            <Text style={styles.secondBoxText}>Jobs listed for you</Text>
                        </View>
                        <View style={styles.secondBox}>
                            <Text style={styles.secondBoxText}></Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.applicationsHead}>Your Applications</Text>
                {jobs?.map(item => (
                        <RestaurantMediumCard {...item} key={item?.id} navigate={(id)=>navigation.navigate("Details",{id})}/>
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
        backgroundColor:Colors.DEFAULT_WHITE,

    },
    headerContainer: {
        flexDirection: "row",
        justifyContent:"center",
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
    boxContainer:{
        flexDirection:"row",
        width:Display.setWidth(100),
        justifyContent:"space-evenly",
        alignItems:"center"
    },
    firstBox:{
        backgroundColor:Colors.DEFAULT_GREEN,
        width:Display.setWidth(45),
        height:Display.setHeight(26),
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center"
    },
    secondBox:{
        backgroundColor:Colors.DEFAULT_GREEN,
        width:Display.setWidth(45),
        height:Display.setHeight(12),
        borderRadius:20,
        margin:5,
        justifyContent:"center",
        alignItems:"center"
    },
    firstBoxText:{
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color:Colors.DEFAULT_WHITE,
    },
    secondBoxText:{
        fontSize: 15,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color:Colors.DEFAULT_WHITE,

    },
    firstBoxTextNumber:{
        fontSize: 70,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color:Colors.DEFAULT_WHITE,

        },
    secondBoxTextNumber:{
        fontSize: 40,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color:Colors.DEFAULT_WHITE,

    },
    applicationsHead:{
        fontSize: 18,
        fontFamily: Fonts.POPPINS_BOLD,
        padding:20,
    }

});

export default DashboardScreen;