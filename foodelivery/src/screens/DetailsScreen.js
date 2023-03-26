import React,{useState,useEffect} from "react";
import { View, Text, StyleSheet, StatusBar, Image, ScrollView, TouchableOpacity } from "react-native";
import { Fonts, Colors, Images } from "../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Separator } from "../components";
import { Display } from "../utils";
import { JobService, UserService,StaticImageService } from "../services";

const applyButtonStyle=(appliedJob,showApplyButton)=>{
    if(appliedJob || !showApplyButton){
        return{...styles.applyButton,
            backgroundColor:Colors.DEFAULT_WHITE,
            height: 52,
            width: Display.setWidth(14),
            borderRadius: 25,
        }
    }
    else{
        return{...styles.applyButton}
    }
}

const DetailsScreen = ({ navigation,route:{params:{id}} }) => {

    const [userApply, setUserApply] = useState(null);
    const [job, setJob] = useState(null);
    const[appliedJob,setAppliedJob]=useState(false)
    const[showApplyButton,setShowApplyButton]=useState(true)

    useEffect(()=>{
        JobService.getOneJobById(id).then(response=>{
            // console.log(response?.data)
            setJob(response?.data)
        })
        JobService.getAppliedJobById(id).then(response=>{
            // console.log(response?.data)
            setAppliedJob(response?.data?.status)
        })
        UserService.getUserData().then(response => {
            if (response?.status) {
                // console.log(response?.data)
                setUserApply(response?.data?.data);
            }
        })
    },[])

    const applyJob = () => {
        let user = {
            id:job?.id,
            company:job?.company,
            role:job?.role,
            ctc:job?.ctc,
            location:job?.location,
            branch:job?.branch,
            images:job?.images,
            username:userApply?.username,
            register_number:userApply?.register_number
        };
        JobService.applyJob(user).then(response => {
            if(response?.status && response?.data?.insertedId){
                console.log(response)
                setShowApplyButton(false)
            }
            else{
                console.log(response)
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
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: StaticImageService.getLogo(job?.images?.logo) }} />
                    </View>
                    <View style={styles.mainTextContainer}>
                        <View style={styles.mainTextSubContainer}>
                            <Text>Role</Text>
                            <Text>Type</Text>
                        </View>
                        <View style={styles.mainTextSubContainer}>
                            <Text style={styles.mainBoldText}>{job?.role}</Text>
                            <Text style={styles.mainBoldText}>{job?.type}</Text>
                        </View>
                        <View style={styles.mainTextSubContainer}>
                            <Text>Package</Text>
                            <Text>Experience</Text>
                        </View>
                        <View style={styles.mainTextSubContainer}>
                            <Text style={styles.mainBoldText}>{job?.ctc}</Text>
                            <Text style={styles.mainBoldText}>{job?.experiance}</Text>
                        </View>
                        <View style={styles.mainTextSubContainer}>
                            <Text>Percentage Criteria</Text>
                            <Text>Backlog</Text>
                        </View>
                        <View style={styles.mainTextSubContainer}>
                            <Text style={styles.mainBoldText}>{job?.percentage}</Text>
                            <Text style={styles.mainBoldText}>{job?.backlog}</Text>
                        </View>
                        <View style={styles.mainTextSubContainer}>
                            <Text>Location</Text>
                        </View>
                        <View style={styles.mainTextSubContainer}>
                            <Text style={styles.mainBoldText}>{job?.location}</Text>
                        </View>
                        <View style={styles.mainTextSubContainer}>
                            <Text>Branches</Text>
                        </View>
                        <View style={styles.mainTextSubContainer}>
                            <Text style={styles.mainBoldText}>{job?.branch?.join(' • ')}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionHead}>Note</Text>
                    <Text style={styles.noteDescriptionText}>
                        {job?.note}
                    </Text>
                    <Text style={styles.descriptionHead}>About this Job</Text>
                    <Text style={styles.descriptionText}>
                        {job?.about_job}
                    </Text>
                    <Text style={styles.descriptionHead}>Roles</Text>
                    <Text style={styles.descriptionText}>
                        {job?.role}
                    </Text>
                    <Text style={styles.descriptionHead}>About the company</Text>
                    <Text style={styles.descriptionText}>
                        {job?.about_company}
                    </Text>
                    <Text style={styles.descriptionHead}>Requirements</Text>
                    <Text style={styles.descriptionText}>
                        {job?.requirments}
                    </Text>
                    <Text style={styles.descriptionHead}>Attachments</Text>
                    <Text style={styles.descriptionText}>{job?.attachments}</Text>
                    <Separator height={50}/>
                </View>
            </ScrollView >
            
            <TouchableOpacity 
                style={applyButtonStyle(appliedJob,showApplyButton)} 
                activeOpacity={0.8} 
                onPress={() =>applyJob()}
                disabled={appliedJob||!showApplyButton}
            >
                {appliedJob||!showApplyButton?<FontAwesome5 name="check-circle" size={45} color={Colors.DEFAULT_GREEN}/>
            :  <Text style={styles.applyText}>Apply</Text>
            }
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.LIGHT_GREEN,
        justifyContent: "center",
        alignItems: "center"
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"center",
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
        borderRadius: 35,
        padding: 20,
        justifyContent: "center",
        alignContent: "center",
        width: Display.setWidth(97)
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
        borderRadius: 35,
        padding: 20,
        width: Display.setWidth(97)
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
    applyText: {
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_WHITE
    }
});

export default DetailsScreen;