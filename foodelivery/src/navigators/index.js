import { React, useEffect } from "react";
import { NavigationContainer, } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer"
import { useSelector, useDispatch } from 'react-redux';
import {
    SplashScreen,
    WelcomeScreen,
    SigninScreen,
    SignupScreen,
    ForgotPasswordScreen,
    RegisterPhoneScreen,
    VerificationScreen,
    HomeScreen,
    DetailsScreen,
    DashboardScreen,
    ConnectScreen,
    EditProfileScreen,
    ProfileScreen,
    AddReviewScreen,
    ResourceSingleScreen,
    VideoScreen,
    PdfScreen
} from "../screens";
import HomeTabs from "./BottomTabs"
import { GeneralAction } from "../actions";
import MainScreen from "./MainScreen";

const Stack = createStackNavigator();

// const Drawer = createDrawerNavigator();

// const AuthScreens = () => {
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Signin" component={SigninScreen} />
//         <Stack.Screen name="Signup" component={SignupScreen} />
//         <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//         <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
//         <Stack.Screen name="Verification" component={VerificationScreen} />
//     </Stack.Navigator>
// }

// const DrawerScreens = () => {
//     <Drawer.Navigator>
//         <Drawer.Screen name="homeTabs" component={HomeTabs} />
//         <Drawer.Screen name="addreview" component={AddReviewScreen} />
//     </Drawer.Navigator>
// }

const Navigators = () => {

    const { isAppLoading, token, isFirstTimeUse } = useSelector(
        state => state?.generalState
    );
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GeneralAction.appStart())
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {
                    isAppLoading ? (
                    <Stack.Screen name="Splash" component={SplashScreen} />
                    ) :
                    !token || token === null || token === '' ?
                        (
                            <>
                                {isFirstTimeUse && (
                                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                                )}
                                <Stack.Screen name="Signin" component={SigninScreen} />
                                <Stack.Screen name="Signup" component={SignupScreen} />
                                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                                <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
                                <Stack.Screen name="Verification" component={VerificationScreen} />
                            </>
                        ) : (
                            // <>
                            //     <Stack.Screen name="HomeTabs" component={HomeTabs} />
                            //     <Stack.Screen name="Details" component={DetailsScreen} />
                            //     <Stack.Screen name="Dashboard" component={DashboardScreen} />
                            //     <Stack.Screen name="Connect" component={ConnectScreen} />
                            //     <Stack.Screen name="Profile" component={ProfileScreen} />
                            //     <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                            //     <Stack.Screen name="AddReview" component={AddReviewScreen} />
                            //     <Stack.Screen name="ResourceSingle" component={ResourceSingleScreen} />
                            //     <Stack.Screen name="Video" component={VideoScreen} />
                            //     <Stack.Screen name="Pdf" component={PdfScreen} />
                            // </>
                            <>
                                <Stack.Screen name="Main" component={MainScreen} options={{}} />
                            </>
                        )
                }
            </Stack.Navigator>
        </NavigationContainer>


        // <NavigationContainer>
        //     <Stack.Navigator screenOptions={{ headerShown: false }}>
        //         {
        //             isAppLoading ? (<Stack.Screen name="Splash" component={SplashScreen} />
        //             ) :
        //                 !token || token === null || token === '' ?
        //                     (
        //                         <>
        //                             {isFirstTimeUse && (
        //                                 <Stack.Screen name="Welcome" component={WelcomeScreen} />
        //                             )}
        //                             <Stack.Screen name="AuthScreens" component={AuthScreens} />
        //                         </>
        //                     ) : (
        //                         <>
        //                             <Stack.Screen name="DrawerScreens" component={DrawerScreens} />
        //                             <Stack.Screen name="addreview" component={AddReviewScreen} />
        //                         </>
        //                     )}
        //     </Stack.Navigator>
        // </NavigationContainer>

    );
};


export default Navigators;
