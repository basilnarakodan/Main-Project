import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
    ScrollView,
    StatusBar,
    ToastAndroid,
    Pressable,
    Platform,
    RefreshControl
} from 'react-native';
import { ApiConstants, Colors, Fonts, Images } from '../constants';
import { Display } from '../utils';
import { Separator } from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StudentProfileService, StaticImageService } from '../services';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { authHeader } from '../utils/Generator';
import DateTimePicker from '@react-native-community/datetimepicker'
import RadioForm from 'react-native-simple-radio-button';
import { SelectList } from 'react-native-dropdown-select-list'

const EditProfileScreen = ({ navigation, route: { params: { studentProfile } } }) => {

    const genderValues = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
    ]
    const dropDownCourseData = [
        { key: 'BTech', value: 'BTech' },
        { key: 'BArch', value: 'BArch' },
        { key: 'MTech', value: 'MTech' },
        { key: 'MCA', value: 'MCA' },
        { key: 'MBA', value: 'MBA' },
        { key: 'MArch', value: 'MArch' },
        { key: 'MPlan', value: 'MPlan' }
    ]
    const dropDownStreamData = [
        { key: 1, value: 'Civil Engineering' },
        { key: 2, value: 'Electrical and Electronics Engineering' },
        { key: 3, value: 'Mechanical Engineering' },
        { key: 4, value: 'Industrial Engineering' },
        { key: 5, value: 'Electronics and Communication Engg' },
        { key: 6, value: 'Applied Electronics and Instrumentation' },
        { key: 7, value: 'B.Tech in Computer  Science and Engineering' },
        { key: 8, value: 'Architecture' },
        { key: 9, value: 'Environmental Engineering' },
        { key: 10, value: 'Geoinformatics' },
        { key: 11, value: 'Geotechnical Engineering' },
        { key: 12, value: 'Hydraulics Engineering' },
        { key: 13, value: 'Structural Engineering' },
        { key: 14, value: 'Traffic and Transportation Engineering' },
        { key: 15, value: 'Electrical Machines' },
        { key: 16, value: 'Power Systems' },
        { key: 17, value: 'Control Systems' },
        { key: 18, value: 'Guidance and Navigational Control' },
        { key: 19, value: 'Power Electronics' },
        { key: 20, value: 'Thermal Science ' },
        { key: 21, value: 'Machine Design' },
        { key: 22, value: 'Propulsion Engineering ' },
        { key: 23, value: 'Industrial Engineering' },
        { key: 24, value: 'Financial Engineering' },
        { key: 25, value: 'Manufacturing & Automation' },
        { key: 26, value: 'Applied Electronics and Instrumentation' },
        { key: 27, value: 'Microwave and TV Engg' },
        { key: 28, value: 'Signal Processing' },
        { key: 29, value: 'Micro and Nano Electronics' },
        { key: 30, value: 'Robotics & Automation' },
        { key: 31, value: 'Computer Science & Engineering' },
        { key: 32, value: 'Information Security' },
        { key: 33, value: 'Urban Design (M. Arch.)' },
        { key: 34, value: 'Planning (M.Plan)' },
        { key: 35, value: 'Computer Applications' },
        { key: 36, value: 'Business Administration' },
        { key: 37, value: 'Artificial Intelligence' },
        { key: 38, value: 'Environmental Design' },
    ]

    // const Btech = [
    //     { key: 1, value: 'Civil Engineering' },
    //     { key: 2, value: 'Electrical and Electronics Engineering' },
    //     { key: 3, value: 'Mechanical Engineering' },
    //     { key: 4, value: 'Industrial Engineering' },
    //     { key: 5, value: 'Electronics and Communication Engg' },
    //     { key: 6, value: 'Applied Electronics and Instrumentation' },
    //     { key: 7, value: 'B.Tech in Computer  Science and Engineering' },

    // ];
    // const Mtech = [
    //     { key: 9, value: 'Environmental Engineering' },
    //     { key: 10, value: 'Geoinformatics' },
    //     { key: 11, value: 'Geotechnical Engineering' },
    //     { key: 12, value: 'Hydraulics Engineering' },
    //     { key: 13, value: 'Structural Engineering' },
    //     { key: 14, value: 'Traffic and Transportation Engineering' },
    //     { key: 15, value: 'Electrical Machines' },
    //     { key: 16, value: 'Power Systems' },
    //     { key: 17, value: 'Control Systems' },
    //     { key: 18, value: 'Guidance and Navigational Control' },
    //     { key: 19, value: 'Power Electronics' },
    //     { key: 20, value: 'Thermal Science ' },
    //     { key: 21, value: 'Machine Design' },
    //     { key: 22, value: 'Propulsion Engineering ' },
    //     { key: 23, value: 'Industrial Engineering' },
    //     { key: 24, value: 'Financial Engineering' },
    //     { key: 25, value: 'Manufacturing & Automation' },
    //     { key: 26, value: 'Applied Electronics and Instrumentation' },
    //     { key: 27, value: 'Microwave and TV Engg' },
    //     { key: 28, value: 'Signal Processing' },
    //     { key: 29, value: 'Micro and Nano Electronics' },
    //     { key: 30, value: 'Robotics & Automation' },
    //     { key: 31, value: 'Computer Science & Engineering' },
    //     { key: 32, value: 'Information Security' },
    //     { key: 37, value: 'Artificial Intelligence' },
    //     { key: 38, value: 'Environmental Design' },
    // ];
    // let data;
    // switch (course) {
    //     case "BTech": data = Btech;
    //         break;
    //     case "MTech": data=Mtech 
    //         break;
    // }

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

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

    const [error, setError] = useState({ field: "", msg: "" });

    const first_name = useRef();
    const last_name = useRef();
    const phoneref = useRef();
    const emailref = useRef();
    const genderref = useRef();
    const dobref = useRef();
    const regref = useRef();
    const courseref = useRef();
    const streamref = useRef();
    const active_backlog = useRef();
    const ssc = useRef();
    const hsc = useRef();
    const degree = useRef();

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const formateDate = (rawData) => {
        let date = new Date(rawData);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month < 10 ? `0${month}` : month;

        return `${day}/${month}/${year}`;
    }

    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate)
            if (Platform.OS === "android") {
                toggleDatePicker();
                setDob(formateDate(currentDate))
            }
        } else {
            toggleDatePicker()
        }
    }

    const validation = () => {
        let loginError = { field: "", msg: "required" };

        if (firstName === "") {
            loginError.field = "first_name";
            first_name.current.focus();
            setError(loginError)
        }
        else if (lastName === "") {
            loginError.field = "last_name";
            last_name.current.focus();
            setError(loginError)
        }
        else if (phone === "") {
            loginError.field = "phone";
            phoneref.current.focus();
            setError(loginError)
        }
        else if (email === "") {
            loginError.field = "email";
            emailref.current.focus();
            setError(loginError)
        }
        else if (gender === "") {
            loginError.field = "gender";
            genderref.current.focus();
            setError(loginError)
        }
        else if (dob === "") {
            loginError.field = "dob";
            dobref.current.focus();
            setError(loginError)
        }
        else if (registerNumber === "") {
            loginError.field = "register_number";
            regref.current.focus();
            setError(loginError)
        }
        else if (course === "") {
            loginError.field = "course";
            courseref.current.focus();
            setError(loginError)
        }
        else if (stream === "") {
            loginError.field = "stream";
            streamref.current.focus();
            setError(loginError)
        }
        else if (activeBacklog === "") {
            loginError.field = "activeBacklog";
            active_backlog.current.focus();
            setError(loginError)
        }
        else if (sscCgpa === "" || sscPercentage === "" || sscPassingYear === "") {
            loginError.field = "ssc";
            loginError.msg = "required all fields"
            ssc.current.focus();
            setError(loginError)
        }
        else if (hscPercentage === "" || hscPercentage === "" || hscPassingYear === "") {
            loginError.field = "hsc";
            loginError.msg = "required all fields"
            hsc.current.focus();
            setError(loginError)
        }
        else if (degreeCgpa === "" || degreePercentage === "" || degreePassingYear === "") {
            loginError.field = "degree";
            loginError.msg = "required all fields"
            degree.current.focus();
            setError(loginError)
        }
        else {
            loginError.field = "";
            loginError.msg = ""
            setError(loginError);
            return true
        }
    }

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

        if (validation()) {
            StudentProfileService.editStudentProfile(user).then(response => {
                // console.log(response)
                if (response?.status) {
                    console.log(response)
                    ToastAndroid.show("Profile Updated", ToastAndroid.SHORT)
                }
            })
        }

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
        formdata.append("image", {
            uri: images.assets[0].uri,
            type: images.assets[0].type,
            name: images.assets[0].fileName
        })



        StudentProfileService.editStudentProfileImg(formdata).then(response => {
            console.log(response)
            if (!response?.status) {
                console.log(response)
            }
        })
    }

    return (
        <View style={styles.container} >
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={refreshing}
                    onRefresh={onRefresh} />
            }>
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
                        activeOpacity={0.8}
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
                                source={{ uri: StaticImageService.getProfile(username) }}
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
                        {studentProfile.first_name}{" "}{studentProfile.last_name}
                    </Text>
                </View>
                <Text style={styles.headText}>First Name</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        ref={first_name}
                        placeholder="First Name"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setFirstName}
                        value={firstName}
                        style={
                            styles.textInput}
                    />
                </View>
                {error.field === "first_name" && (<Text style={styles.errorText}>{error.msg}</Text>)}

                <Text style={styles.headText}>Last Name</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        ref={last_name}
                        placeholder="Last Name"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setLastName}
                        value={lastName}
                        style={
                            styles.textInput}
                    />
                </View>
                {error.field === "last_name" && (<Text style={styles.errorText}>{error.msg}</Text>)}

                <Text style={styles.headText}>Phone</Text>
                <View style={styles.action}>
                    <Feather name="phone" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        ref={phoneref}
                        placeholder="Phone"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        maxLength={10}
                        autoCorrect={false}
                        onChangeText={setPhone}
                        value={phone}
                        style={
                            styles.textInput}
                    />
                </View>
                {error.field === "phone" && (<Text style={styles.errorText}>{error.msg}</Text>)}

                <Text style={styles.headText}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome name="envelope-o" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        ref={emailref}
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
                {error.field === "email" && (<Text style={styles.errorText}>{error.msg}</Text>)}

                <Text style={styles.headText}>Gender</Text>
                <View style={styles.action}>
                    <FontAwesome name="intersex" color={Colors.DEFAULT_GREEN} size={20} style={{ marginRight: 15 }} />
                    <RadioForm
                        radio_props={genderValues} initial={"Male"}
                        onPress={(value) => { setGender(value) }}
                        selectedButtonColor={Colors.DEFAULT_GREEN}
                        formHorizontal={true}
                        borderWidth={2}
                        buttonColor="red"
                        buttonSize={12}
                        animation={true}
                        style={styles.radioButton}
                    />
                    {/* <TextInput
                        ref={genderref}
                        placeholder="Gender"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setGender}
                        value={gender}
                        style={
                            styles.textInput}
                    /> */}
                </View>
                {error.field === "gender" && (<Text style={styles.errorText}>{error.msg}</Text>)}

                <Text style={styles.headText}>Date of Birth</Text>
                <View style={styles.action}>
                    <MaterialIcons name="date-range" color={Colors.DEFAULT_GREEN} size={20} />
                    {showPicker && (<DateTimePicker
                        mode='date'
                        display='spinner'
                        value={date}
                        onChange={onChange}
                        maximumDate={new Date()}
                    />
                    )}
                    {!showPicker && (
                        <Pressable onPress={toggleDatePicker}>
                            <TextInput
                                ref={dobref}
                                placeholder="Date of birth"
                                placeholderTextColor="#666666"
                                autoCorrect={false}
                                onChangeText={setDob}
                                editable={false}
                                value={dob}
                                style={
                                    styles.textInput}
                            />
                        </Pressable>
                    )}
                </View>
                {error.field === "dob" && (<Text style={styles.errorText}>{error.msg}</Text>)}

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
                        ref={regref}
                        placeholder="Register number"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setRegisterNumber}
                        value={registerNumber}
                        style={styles.textInput}
                    />
                </View>
                {error.field === "register_number" && (<Text style={styles.errorText}>{error.msg}</Text>)}
                <Text style={styles.headText}>Course</Text>
                <View style={styles.action}>
                    <SelectList
                        setSelected={(val) => setCourse(val)}
                        data={dropDownCourseData}
                        save="value"
                        boxStyles={{ width: Display.setWidth(87) }}
                        placeholder='Select Course'
                        maxHeight={300}
                    />
                    {/* <TextInput
                        ref={courseref}
                        placeholder="Course"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setCourse}
                        value={course}
                        style={styles.textInput}
                    /> */}
                </View>
                {error.field === "course" && (<Text style={styles.errorText}>{error.msg}</Text>)}
                <Text style={styles.headText}>Stream</Text>
                <View style={styles.action}>
                    <SelectList
                        setSelected={(val) => setStream(val)}
                        data={dropDownStreamData}
                        save="value"
                        boxStyles={{ width: Display.setWidth(87) }}
                        placeholder='Select Course'
                        maxHeight={300}
                    />
                    {/* <TextInput
                        ref={streamref}
                        placeholder="Stream"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setStream}
                        value={stream}
                        style={styles.textInput}
                    /> */}
                </View>
                {error.field === "stream" && (<Text style={styles.errorText}>{error.msg}</Text>)}
                <Text style={styles.headText}>Active backlog</Text>
                <View style={styles.action}>
                    <TextInput
                        ref={active_backlog}
                        placeholder="Active backlogs"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        maxLength={2}
                        onChangeText={setActiveBacklog}
                        value={activeBacklog}
                        style={styles.textInput}
                    />
                </View>
                {error.field === "activeBacklog" && (<Text style={styles.errorText}>{error.msg}</Text>)}
                <Text style={styles.DetailsHead} ref={ssc}>
                    10th Details
                </Text>
                {error.field === "hsc" && (<Text style={styles.errorText}>{error.msg}</Text>)}
                <Text style={styles.headText}>percentage</Text>
                <View style={styles.action}>
                    <TextInput
                        ref={hsc}
                        placeholder="HSC percentage"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        onChangeText={setHscPercentage}
                        value={hscPercentage}
                        style={styles.textInput}
                        maxLength={2}
                    />
                </View>
                <Text style={styles.headText}>CGPA</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="HSC CGPA"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        maxLength={1}
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
                        maxLength={4}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.DetailsHead} >
                    12th Details
                </Text>
                {error.field === "ssc" && (<Text style={styles.errorText}>{error.msg}</Text>)}
                <Text style={styles.headText}>percentage</Text>
                <View style={styles.action}>
                    <TextInput
                        ref={ssc}
                        placeholder="SSC percentage"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        maxLength={2}
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
                        maxLength={1}
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
                        maxLength={4}
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.DetailsHead} >
                    UG Details
                </Text>
                {error.field === "degree" && (<Text style={styles.errorText}>{error.msg}</Text>)}
                <Text style={styles.headText}>percentage</Text>
                <View style={styles.action}>
                    <TextInput
                        ref={degree}
                        placeholder="Degree percentage"
                        keyboardType="number-pad"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={setDegreePercentage}
                        value={degreePercentage}
                        maxLength={2}
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
                        maxLength={1}
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
                        maxLength={4}
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
                        maxLength={2}
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
                        maxLength={1}
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
                        maxLength={4}
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
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        // marginBottom: 10,
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
    radioButton: {
        paddingLeft: 12,
        marginVertical: 4,
        gap: 10,
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
    },
    errorText: {
        fontSize: 13,
        textAlign: 'right',
        color: Colors.DEFAULT_RED,
        fontFamily: Fonts.POPPINS_LIGHT,
    }
});

export default EditProfileScreen;
