import React, { useState,useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import { Colors, Fonts, Images } from '../constants';
import { Display } from '../utils';
import { Separator } from '../components';
// import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {UserService,StudentProfileService } from "../services";


const ProfileScreen = ({ navigation }) => {

    const [studentProfile, setStudentProfile] = useState({});

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            UserService.getUserData().then(response => {
                if (response?.status) {
                    // console.log(response?.data)
                    setStudentProfile(response?.data?.data);
                }
            })
        })
        return unsubscribe;
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
                <Separator height={StatusBar.currentHeight} />
                <View style={styles.headerContainer}>
                    <Ionicons name="chevron-back-outline" size={30} onPress={() => navigation.goBack()} />
                    <Text style={styles.headerTitle}>Profile</Text>
                </View>
                <Separator height={15} />
                <View style={{ alignItems: 'center' }}>
                    <View
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ImageBackground
                            source={Images.XAVIER}
                            style={{ height: 100, width: 100 }}
                            imageStyle={{ borderRadius: 15 }}>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                            </View>
                        </ImageBackground>
                    </View>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
                        John Xavier
                    </Text>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Text style={{ marginTop:5, fontSize: 15, color: Colors.FABEBOOK_BLUE }}>
                            logout
                            <MaterialIcons color={Colors.FABEBOOK_BLUE} name="logout" size={16} />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('EditProfile',{studentProfile})}>
                        <View style={styles.profileAction}>
                            <Text style={styles.profileActionText}>Edit Profile</Text>

                            <FeatherIcon color="#fff" name="edit" size={16} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.headText}>First Name</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        editable={false}
                        placeholder={studentProfile.first_name}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={
                            styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Last Name</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        editable={false}
                        placeholder={studentProfile.last_name}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={
                            styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Phone</Text>
                <View style={styles.action}>
                    <Feather name="phone" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        editable={false}
                        placeholder={studentProfile.phone}
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        style={
                            styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome name="envelope-o" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        editable={false}
                        placeholder={studentProfile.email}
                        placeholderTextColor="#666666"
                        keyboardType="email-address"
                        autoCorrect={false}
                        style={
                            styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Gender</Text>
                <View style={styles.action}>
                    <FontAwesome name="intersex" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        placeholder={studentProfile.gender}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={
                            styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Date of birth</Text>
                <View style={styles.action}>
                    <MaterialIcons name="date-range" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        placeholder={studentProfile.dob}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={
                            styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Country</Text>
                <View style={styles.action}>
                    <FontAwesome name="globe" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        placeholder={studentProfile.country}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={
                            styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>City</Text>
                <View style={styles.action}>
                    <Icon name="map-marker-outline" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        placeholder={studentProfile.city}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.DetailsHead}>
                    Educational Details
                </Text>
                <Text style={styles.headText}>Institution Name</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.institution_name}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Register Number</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.register_number}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Course</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.course}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Stream</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.stream}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Active Backlog</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.active_backlog}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.DetailsHead}>
                    10th Details
                </Text>
                <Text style={styles.headText}>HSC Percentage</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.hsc_percentage}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>HSC CGPA</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.hsc_cgpa}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Year of passing</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.hsc_passing_year}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.DetailsHead}>
                    12th Details
                </Text>
                <Text style={styles.headText}>SSC Percentage</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.ssc_percentage}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>SSC CGPA</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.ssc_cgpa}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Year of passing</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.ssc_passing_year}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.DetailsHead}>
                    UG Details
                </Text>
                <Text style={styles.headText}>Degree Percentage</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.degree_percentage}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Degree CGPA</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.degree_cgpa}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Year of passing</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.degree_passing_year}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.DetailsHead}>
                    PG Details
                </Text>
                <Text style={styles.headText}>PG Percentage</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.pg_percentage}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>PG CGPA</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.pg_cgpa}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Year of passing</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder={studentProfile.pg_passing_year}
                        editable={false}
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                <Separator height={60} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
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
    action: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        // borderBottomColor: 'red',
        padding: 5,
        backgroundColor: Colors.LIGHT_GREY,
        borderRadius: 10,
        borderColor: Colors.LIGHT_GREY2,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 12,
        color: '#05375a',
        textAlignVertical: 'bottom'
    },
    profileAction: {
        margin: 12,
        paddingVertical: 5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.DEFAULT_GREEN,
        borderRadius: 12,
    },
    profileActionText: {
        marginRight: 8,
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    DetailsHead: {
        marginVertical: 10,
        fontSize: 16,
        color: Colors.DEFAULT_GREEN,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    headText: {
        color: Colors.DEFAULT_GREEN,
        fontFamily: Fonts.POPPINS_LIGHT,
    }
});

export default ProfileScreen;
