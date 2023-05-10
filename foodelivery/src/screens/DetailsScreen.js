import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, TouchableOpacity, ToastAndroid } from "react-native";
import { Fonts, Colors, Images } from "../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Separator, ReviewCard, RestaurantMediumCard } from "../components";
import { Display } from "../utils";
import { JobService, UserService, StaticImageService, ReviewService } from "../services";
import * as Animatable from 'react-native-animatable';

// const applyButtonStyle = (appliedJob, showApplyButton) => {
//     if (appliedJob || !showApplyButton) {
//         return {
//             ...styles.applyButton,
//             backgroundColor: Colors.DEFAULT_WHITE,
//             height: 52,
//             width: Display.setWidth(14),
//             borderRadius: 25,
//         }
//     }
//     else {
//         return { ...styles.applyButton }
//     }
// }

const DetailsScreen = ({ navigation, route: { params: { id, company } } }) => {

    const [userApply, setUserApply] = useState(null);
    const [job, setJob] = useState(null);
    const [appliedJob, setAppliedJob] = useState(false)
    const [showApplyButton, setShowApplyButton] = useState(true)
    const [reviews, setReviews] = useState();

    const getJob = async () => {
        await JobService.getOneJobById(id).then(response => {
            // console.log(response?.data)
            setJob(response?.data)
        })
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            getJob()
            JobService.getAppliedJobById(id).then(response => {
                // console.log(response?.data)
                setAppliedJob(response?.data?.status)
            })

            UserService.getUserData().then(response => {
                if (response?.status) {
                    // console.log(response?.data)
                    setUserApply(response?.data?.data);
                }
            })

            ReviewService.getReviewByCompany(company).then(response => {
                // console.log(response?.data?.data)
                setReviews(response?.data?.data)
            })
        })
        return unsubscribe;
    }, [id])
    // console.log('1',new Date(new Date('2022-12-04')) > (new Date()));
    // console.log('2',new Date(new Date('2022-12-04')) < (new Date()));
    // console.log('3',new Date(new Date('2022-12-04')) > (new Date()));
    // console.log('4',new Date(new Date('2024-12-04')) < (new Date()));

    const applyJob = () => {
        let user = {
            id: job?.id,
            company: job?.company,
            role: job?.role,
            ctc: job?.ctc,
            location: job?.location,
            branch: job?.branch,
            images: job?.images,
            username: userApply?.username,
            register_number: userApply?.register_number
        };
        JobService.applyJob(user).then(response => {
            if (response?.status && response?.data?.insertedId) {
                // console.log(response)
                setShowApplyButton(false)
            }
            else {
                console.log("response", response)
            }
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
                <Separator height={StatusBar.currentHeight + 10} />
                <View style={styles.headerContainer}>
                    <Ionicons name="chevron-back-outline" size={30} onPress={() => navigation.goBack()} />
                    <Text style={styles.headerTitle}>{job?.company}</Text>
                </View>
                <View style={styles.mainDetailsContainer}>
                    <Animatable.View style={styles.imageContainer} animation={"slideInUp"}>
                        <Image source={job?.images?.logo ? { uri: StaticImageService.getLogo(job?.images?.logo) } : Images.NO_IMAGE
                        } style={{
                            width: Display.setWidth(18),
                            height: Display.setWidth(18),
                            borderRadius: 10,
                            margin: 5,
                        }} />

                    </Animatable.View>
                    <View style={styles.mainTextContainer}>
                        <Animatable.View style={styles.mainTextSubContainer} animation={'slideInUp'}>
                            <Text>Role</Text>
                            <Text>Type</Text>
                        </Animatable.View>
                        <Animatable.View style={styles.mainTextSubContainer} animation={'slideInUp'}>
                            <Text style={styles.mainBoldText}>{job?.role}</Text>
                            <Text style={styles.mainBoldText}>{job?.type}</Text>
                        </Animatable.View >
                        <Image source={{ uri: "https://cdn.logo.com/hotlink-ok/logo-social.png" }} resizeMode={"contain"} />

                        <Animatable.View style={styles.mainTextSubContainer} animation={'slideInUp'}>
                            <Text>Package</Text>
                            <Text>Experience</Text>
                        </Animatable.View>
                        <Animatable.View style={styles.mainTextSubContainer} animation={'slideInUp'}>
                            <Text style={styles.mainBoldText}>{job?.ctc}</Text>
                            <Text style={styles.mainBoldText}>{job?.experiance}</Text>
                        </Animatable.View>
                        <Animatable.View style={styles.mainTextSubContainer} animation={'slideInUp'}>
                            <Text>Percentage Criteria</Text>
                            <Text>Backlog</Text>
                        </Animatable.View>
                        <Animatable.View style={styles.mainTextSubContainer} animation={'slideInUp'}>
                            <Text style={styles.mainBoldText}>{job?.percentage}</Text>
                            <Text style={styles.mainBoldText}>{job?.backlog}</Text>
                        </Animatable.View>
                        <Animatable.View style={styles.mainTextSubContainer} animation={'slideInUp'}>
                            <Text>Location</Text>
                        </Animatable.View>
                        <Animatable.View style={styles.mainTextSubContainer} animation={'slideInUp'}>
                            <Text style={styles.mainBoldText}>{job?.location}</Text>
                        </Animatable.View>
                        <Animatable.View style={styles.mainTextSubContainer} animation={'slideInUp'}>
                            <Text>Branches</Text>
                        </Animatable.View>
                        <Animatable.View style={styles.mainTextSubContainer} animation={'slideInUp'}>
                            <Text style={styles.mainBoldText}>{job?.branch?.join(' • ')}</Text>
                        </Animatable.View>
                    </View>
                </View>
                <View style={styles.descriptionContainer}>
                    <Animatable.Text style={styles.descriptionHead} animation={'slideInUp'}>Note</Animatable.Text>
                    <Animatable.Text style={styles.noteDescriptionText} animation={'slideInUp'}>
                        {job?.note}
                    </Animatable.Text>
                    <Animatable.Text style={styles.descriptionHead} animation={'slideInUp'}>About this Job</Animatable.Text>
                    <Animatable.Text style={styles.descriptionText} animation={'slideInUp'}>
                        {job?.about_job}
                    </Animatable.Text>
                    <Animatable.Text style={styles.descriptionHead} animation={'slideInUp'}>Roles</Animatable.Text>
                    <Animatable.Text style={styles.descriptionText} animation={'slideInUp'}>
                        {job?.role}
                    </Animatable.Text>
                    <Animatable.Text style={styles.descriptionHead} animation={'slideInUp'}>About the company</Animatable.Text>
                    <Animatable.Text style={styles.descriptionText} animation={'slideInUp'}>
                        {job?.about_company}
                    </Animatable.Text>
                    <Text style={styles.descriptionHead}>Requirements</Text>
                    <Text style={styles.descriptionText}>
                        {job?.requirments}
                    </Text>
                    <Text style={styles.descriptionHead}>Attachments</Text>
                    <Text style={styles.descriptionText}>{job?.attachments}</Text>
                    <Separator height={50} />
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionHead}>Student Reviews</Text>
                    {reviews?.map(item => (
                        <ReviewCard {...item} key={item?.id} />
                    ))}
                    <Separator height={50} />
                </View>
            </ScrollView >

            {
                appliedJob || !showApplyButton ?
                    <TouchableOpacity 
                        style={styles.disableApplyButton} 
                        activeOpacity={0.8}
                        onPress={()=>ToastAndroid.show("Already Applied", ToastAndroid.SHORT)}
                        >
                        <FontAwesome5 name="check-circle" size={45} color={Colors.DEFAULT_GREEN} />
                    </TouchableOpacity>
                    :
                    (new Date("2021-02-02")) < (new Date()) ?
                        <TouchableOpacity
                            style={styles.disableApplyButton}
                            activeOpacity={0.8}
                            onPress={() => ToastAndroid.show("Application Closed", ToastAndroid.SHORT)}
                        >
                            <Ionicons name="close-circle-outline" size={45} color={Colors.DEFAULT_RED} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={styles.applyButton}
                            activeOpacity={0.8}
                            onPress={() => applyJob()}
                        >
                            <Text style={styles.applyText}>Apply</Text>
                        </TouchableOpacity>
            }
        </View >

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.LIGHT_GREEN,
        justifyContent: "center",
        alignItems: "center",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        lineHeight: 20 * 1.4,
        width: Display.setWidth(80),
        textAlign: "center",
    },
    mainDetailsContainer: {
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 30,
        padding: 20,
        alignSelf: "center",
        justifyContent: "center",
        alignContent: "center",
        width: Display.setWidth(95),
    },
    imageContainer: {
        alignItems: "center",

        paddingVertical: 20
    },
    mainTextContainer: {
        paddingTop: 15,
    },
    mainTextSubContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    mainBoldText: {
        fontFamily: Fonts.POPPINS_BOLD,
    },
    descriptionContainer: {
        marginTop: 7,
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 20,
        padding: 20,
        width: Display.setWidth(100)
    },
    descriptionHead: {
        fontFamily: Fonts.POPPINS_BOLD,
        fontSize: 15,
        marginVertical: 8,
    },
    descriptionText: {

    },
    noteDescriptionText: {
        fontFamily: Fonts.POPPINS_BOLD
    },
    applyButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.DEFAULT_GREEN,
        height: 35,
        width: Display.setWidth(35),
        borderRadius: 25,
        position: 'absolute',
        bottom: 10,
        elevation: 3
    },
    disableApplyButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.DEFAULT_WHITE,
        height: 52,
        width: Display.setWidth(14),
        borderRadius: 25,
        position: 'absolute',
        bottom: 10,
        elevation: 3
    },
    applyText: {
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_WHITE
    },
    closedText: {
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_RED
    }
});

export default DetailsScreen;