import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, StatusBar, TouchableOpacity } from "react-native";
import { ApiConstants, Colors, Fonts, Images } from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import { Display } from '../utils';
import { Separator } from '../components';
import Ionicons from "react-native-vector-icons/Ionicons";
import { ReviewService } from "../services";

const AddReviewScreen = ({ navigation }) => {

    const mainRef = useRef();

    const share = () => {
        let data = {
            name,
            company,
            review,
        };
        ReviewService.addReview(data).then(response => {
            console.log(response)
            if (response?.status) {
                console.log((response?.message));
                setShareButton(false)
            }
        })
    }

    const [name, setName] = useState("");
    const [review, setReview] = useState("");
    const [company, setCompany] = useState("")
    const [shareButton, setShareButton] = useState(true)

    useEffect(() => {
        mainRef.current.focus();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
                <Separator height={StatusBar.currentHeight} />
                <View style={styles.headerContainer}>
                    <Ionicons name="chevron-back-outline" size={30} onPress={() => navigation.goBack()} />
                    <Text style={styles.headerTitle}>Add Review</Text>
                </View>
                <Separator height={25} />
                <Text style={styles.mainHeader}>Share Your Experiance</Text>
                <Text style={styles.headText}>Company Name</Text>
                <View style={styles.action}>
                    <Octicons name="organization" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        placeholder="Company Name"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={(text) => setCompany(text)}
                        ref={mainRef}
                        // value={firstName}
                        style={
                            styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Name</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={Colors.DEFAULT_GREEN} size={20} />
                    <TextInput
                        placeholder="Your Name"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        onChangeText={(text) => setName(text)}
                        // value={firstName}
                        style={
                            styles.textInput}
                    />
                </View>
                <Text style={styles.headText}>Share your experiance or review</Text>
                <View style={styles.action}>
                    {/* <FontAwesome name="user-o" color={Colors.DEFAULT_GREEN} size={20} /> */}
                    <TextInput
                        placeholder="Start typing here..."
                        // placeholderTextColor="#666666"
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={18}
                        onChangeText={(text) => setReview(text)}
                        // value={firstName}
                        style={
                            styles.textInput}
                    />
                </View>
                <Separator height={15} />
                <TouchableOpacity
                    style={styles.commandButton}
                    activeOpacity={0.8}
                    onPress={() => share()}
                    disabled={!shareButton}
                >
                    {shareButton ?
                        <Text style={styles.panelButtonTitle}>Share</Text>
                        : <Text style={styles.panelButtonTitle}>Got it</Text>}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
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
    mainHeader: {
        fontSize: 24,
        marginBottom: 30,
        color: Colors.DEFAULT_GREEN,
        fontFamily: Fonts.POPPINS_LIGHT,
    },
    action: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
        borderBottomWidth: 1,
        // borderBottomColor: '#f2f2f2',
        padding: 5,
        paddingLeft: 10,
        borderColor: Colors.LIGHT_GREY2,
        backgroundColor: Colors.LIGHT_GREY,
        borderRadius: 10,
    },
    textInput: {
        // flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 12,
        color: '#05375a',
        textAlignVertical: 'bottom'
    },
    headText: {
        color: Colors.DEFAULT_GREEN,
        fontFamily: Fonts.POPPINS_LIGHT,
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
});

export default AddReviewScreen;