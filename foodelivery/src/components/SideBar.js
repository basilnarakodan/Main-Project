import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from "react-native";
import { Display } from "../utils";
import Separator from "./Separator";
import { Colors, Fonts } from "../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UserService } from "../services";
import { useDispatch } from 'react-redux';
import { GeneralAction } from '../actions';
import { StorageService } from "../services";

const pdfUrl=require('../assets/policy.pdf');

const SideBar = ({ navigation }) => {

    const dispatch = useDispatch()
    const logout = () => {
        StorageService.setToken("")
        dispatch(GeneralAction.setToken(""))
        dispatch(GeneralAction.setUserData(null))
    }

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
                <Text>SideBar</Text>
            </TouchableOpacity> */}

            <Separator height={StatusBar.currentHeight} />
            <View style={styles.avatarContainer}>
                <Image style={styles.avatarImage} source={require('../assets/images/avatar.png')} resizeMode="cover" />
                <View style={styles.avatarTextContainer}>
                    <Text style={styles.avatarText}>Basil Narakodan</Text>
                    <Text
                        style={{ fontSize: 13, color: Colors.FABEBOOK_BLUE, marginLeft: 10 }}
                        onPress={() => navigation.navigate("Profile")}
                    >
                        Update Profile
                    </Text>

                </View>
                <Ionicons
                    name="chevron-forward"
                    size={25}
                    onPress={() => navigation.navigate("Profile")}
                    style={{ right: -25 }}
                />
            </View>
            <View style={styles.MenuListContainer}>
                <TouchableOpacity activeOpacity={0.8} style={styles.menu} onPress={() => navigation.navigate("HomeTabs")}>
                    <Ionicons name="home-outline" size={23} color={Colors.DEFAULT_GREEN} />
                    <Text style={styles.menuText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.menu} onPress={() => navigation.navigate("Profile")}>
                    <Feather name="user" size={23} color={Colors.DEFAULT_GREEN} />
                    <Text style={styles.menuText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.menu} onPress={() => navigation.navigate("Dashboard")}>
                    <MaterialCommunityIcons name="view-dashboard-outline" size={23} color={Colors.DEFAULT_GREEN} />
                    <Text style={styles.menuText}>Dashboard</Text>
                </TouchableOpacity>
                <View style={styles.menu}>
                </View>
            </View>

            <View style={styles.MenuListContainer}>
                <TouchableOpacity activeOpacity={0.8} style={styles.menu} onPress={() => navigation.navigate("Connect")}>
                    <Feather name="send" size={23} color={Colors.DEFAULT_GREEN} />
                    <Text style={styles.menuText}>Connect Alumni</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.menu} onPress={() => navigation.navigate("Review")}>
                    <MaterialCommunityIcons name="comment-text-multiple-outline" size={23} color={Colors.DEFAULT_GREEN} />
                    <Text style={styles.menuText}>Company Reviews</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.menu} onPress={() => navigation.navigate("Resource")}>
                    <Feather name="book-open" size={23} color={Colors.DEFAULT_GREEN} />
                    <Text style={styles.menuText}>Prepare for Job</Text>
                </TouchableOpacity>
                <View style={styles.menu}>
                    <Text style={styles.menuText}></Text>
                </View>
            </View>

            <TouchableOpacity activeOpacity={0.8} style={styles.menu} onPress={() =>  navigation.navigate("Pdf",pdfUrl)}>
                <Feather name="file-text" size={23} color={Colors.DEFAULT_GREEN} />
                <Text style={styles.menuText}>Placement Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.menu} onPress={() => logout()}>
                <MaterialIcons color={Colors.DEFAULT_GREEN} name="logout" size={23} />
                <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: "hidden",
    },
    avatarContainer: {
        position: "relative",
        width: Display.setWidth(100),
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: Colors.LIGHT_GREY2,
        borderBottomWidth: 1,
        paddingBottom: 20,
    },
    avatarTextContainer: {
        // flexDirection: "row",
    },
    avatarImage: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
    avatarText: {
        fontSize: 15,
        fontFamily: Fonts.POPPINS_LIGHT,
        marginLeft: 10,
    },
    MenuListContainer: {

        borderBottomColor: Colors.LIGHT_GREY2,
        borderBottomWidth: 1,
    },
    menu: {
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 20,

    },
    menuText: {
        marginLeft: 12,
        fontSize: 15,
        fontFamily: Fonts.POPPINS_REGULAR,
    }
});

export default SideBar;