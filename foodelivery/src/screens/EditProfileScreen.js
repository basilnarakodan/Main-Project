import React, { useState } from 'react';
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
import { StudentProfileService } from '../services';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';


const EditProfileScreen = ({ navigation, route: { params: { studentProfile } } }) => {

    const [username, setUsername] = useState(studentProfile.username);
    const [firstName, setFirstName] = useState(studentProfile.first_name);
    const [lastName, setLastName] = useState(studentProfile.last_name);
    const [phone, setPhone] = useState(studentProfile.phone);
    const [email, setEmail] = useState(studentProfile.email);
    const [gender, setGender] = useState(studentProfile.gender);
    const [dob, setDob] = useState(studentProfile.dob);
    const [country, setCountry] = useState(studentProfile.country);
    const [city, setCity] = useState(studentProfile.city);
    const [college, setCollege] = useState(studentProfile.institution_name);
    const [registerNumber, setRegisterNumber] = useState(studentProfile.register_number);
    const [course, setCourse] = useState(studentProfile.course);
    const [stream, setStream] = useState(studentProfile.stream);
    const [activeBacklog, setActiveBacklog] = useState(studentProfile.active_backlog);
    const [hscPercentage, setHscPercentage] = useState(studentProfile.hsc_percentage);
    const [hscCgpa, setHscCgpa] = useState(studentProfile.hsc_cgpa);
    const [hscPassingYear, setHscPassingYear] = useState(studentProfile.hsc_passing_year);
    const [sscPercentage, setSscPercentage] = useState(studentProfile.ssc_percentage);
    const [sscCgpa, setSscCgpa] = useState(studentProfile.ssc_cgpa);
    const [sscPassingYear, setSscPassingYear] = useState(studentProfile.ssc_passing_year);
    const [degreePercentage, setDegreePercentage] = useState(studentProfile.degree_percentage);
    const [degreeCgpa, setDegreeCgpa] = useState(studentProfile.degree_cgpa);
    const [degreePassingYear, setDegreePassingYear] = useState(studentProfile.degree_passing_year);
    const [pgPercentage, setPgPercentage] = useState(studentProfile.pg_percentage);
    const [pgCgpa, setPgCgpa] = useState(studentProfile.pg_cgpa);
    const [pgPassingYear, setPgPassingYear] = useState(studentProfile.pg_passing_year);

    const editProfile = () => {
        let user = {
            username,
            firstName,
            lastName,
            phone,
            email,
            gender,
            dob,
            country,
            city,
            college,
            registerNumber,
            course,
            stream,
            activeBacklog,
            hscPercentage,
            hscCgpa,
            hscPassingYear,
            sscPercentage,
            sscCgpa,
            sscPassingYear,
            degreePercentage,
            degreeCgpa,
            degreePassingYear,
            pgPercentage,
            pgCgpa,
            pgPassingYear
        };
        StudentProfileService.editStudentProfile(user).then(response => {
            console.log(response)
            if (!response?.status) {
                console.log(response)
            }
        })
    }

    const options = {
        title: 'Select Image',
        type: 'library',
        options: {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
        }
    }
    const openGallery = async () => {
        const images = await launchImageLibrary(options);
        console.log(images.assets[0])
        const formdata = new FormData()
        formdata.append("file", {
            uri: images.assets[0].uri,
            type: images.assets[0].type,
            name: images.assets[0].fileName
        })
        let uploadResponse = await axios.post(
            `${ApiConstants.BACKEND_API.BASE_API_URL}/upload`, formdata,
            {
                headers: {
                    "Content-Type":'multipart/form-data'
                }
            })
        let responseJson = await res.json();
        console.log(responseJson, "responseJson")
    }

    return (
        <View style={styles.container} >
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
                <Separator height={StatusBar.currentHeight} />
                <View style={styles.headerContainer}>
                    <Ionicons name="chevron-back-outline" size={30} onPress={() => navigation.goBack()} />
                    <Text style={styles.headerTitle}>Edit Profile</Text>
                </View>
                <Separator height={15} />
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={openGallery}
                    >
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
                                    <Icon
                                        name="camera"
                                        size={35}
                                        color={Colors.DEFAULT_GREY}
                                        style={{
                                            opacity: 0.7,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 10,
                                        }}
                                    />
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
                        John Doe
                    </Text>
                </View>
                <Text style={styles.headText}>First Name</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        placeholder="First Name"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setFirstName}
                        value={firstName}
                        style={
                            styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Last Name</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        placeholder="Last Name"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setLastName}
                        value={lastName}
                        style={
                            styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Phone</Text>
                <View style={styles.action}>
                    <Feather name="phone" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        placeholder="Phone"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        onChangeText={setPhone}
                        value={phone}
                        style={
                            styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome name="envelope-o" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#666666"
                        keyboardType="email-address"
                        autoCorrect={false}
                        onChangeText={setEmail}
                        value={email}
                        style={
                            styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Gender</Text>
                <View style={styles.action}>
                    <FontAwesome name="intersex" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        placeholder="Gender"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setGender}
                        value={gender}
                        style={
                            styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Date of Birth</Text>
                <View style={styles.action}>
                    <MaterialIcons name="date-range" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        placeholder="Date of birth"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setDob}
                        value={dob}
                        style={
                            styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Country</Text>
                <View style={styles.action}>
                    <FontAwesome name="globe" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        placeholder="Country"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setCountry}
                        value={country}
                        style={
                            styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>City</Text>
                <View style={styles.action}>
                    <Icon name="map-marker-outline" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        placeholder="City"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setCity}
                        value={city}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.DetailsHead}>
                    Educational Details
                </Text>
                <Text style={styles.headText}>Institution name</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="College"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setCollege}
                        value={college}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Register number</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Register number"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setRegisterNumber}
                        value={registerNumber}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Course</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Course"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setCourse}
                        value={course}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Stream</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Stream"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setStream}
                        value={stream}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Active backlog</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Active backlogs"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setActiveBacklog}
                        value={activeBacklog}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.DetailsHead}>
                    10th Details
                </Text>
                <Text style={styles.headText}>percentage</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="HSC percentage"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        onChangeText={setHscPercentage}
                        value={hscPercentage}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>CGPA</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="HSC CGPA"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        onChangeText={setHscCgpa}
                        value={hscCgpa}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Year of passing</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Year of passing"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        onChangeText={setHscPassingYear}
                        value={hscPassingYear}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.DetailsHead}>
                    12th Details
                </Text>
                <Text style={styles.headText}>percentage</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="SSC percentage"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        onChangeText={setSscPercentage}
                        value={sscPercentage}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>CGPA</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="SSC CGPA"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        onChangeText={setSscCgpa}
                        value={sscCgpa}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Year of passing</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Year of passing"
                        keyboardType="number-pad"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setSscPassingYear}
                        value={sscPassingYear}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.DetailsHead}>
                    UG Details
                </Text>
                <Text style={styles.headText}>percentage</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Degree percentage"
                        keyboardType="number-pad"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setDegreePercentage}
                        value={degreePercentage}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>CGPA</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Degree CGPA"
                        keyboardType="number-pad"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setDegreeCgpa}
                        value={degreeCgpa}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Year of passing</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Year of passing"
                        keyboardType="number-pad"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setDegreePassingYear}
                        value={degreePassingYear}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.DetailsHead}>
                    PG Details
                </Text>
                <Text style={styles.headText}>percentage</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="PG percentage (if any)"
                        keyboardType="number-pad"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setPgPercentage}
                        value={pgPercentage}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>CGPA</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="PG CGPA"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        onChangeText={setPgCgpa}
                        value={pgCgpa}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Year of passing</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="Year of passing"
                        keyboardType="number-pad"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setPgPassingYear}
                        value={pgPassingYear}
                        style={styles.textInput}
                    />
                </View>

                <TouchableOpacity style={styles.commandButton} activeOpacity={0.8} onPress={() => editProfile()}>
                    <Text style={styles.panelButtonTitle}>Submit</Text>
                </TouchableOpacity>
                <Separator height={10} />
            </ScrollView>
        </View >
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
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: Colors.DEFAULT_GREEN,
        alignItems: 'center',
        marginVertical: 10,
    },
    panelButtonTitle: {
        fontSize: 17,
        // fontWeight: 'bold',
        color: 'white',
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        // borderBottomColor: '#f2f2f2',
        padding: 5,
        borderColor: Colors.LIGHT_GREY2,
        backgroundColor: Colors.LIGHT_GREY,
        borderRadius: 10,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 12,
        color: '#05375a',
        textAlignVertical: 'bottom'
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

export default EditProfileScreen;
