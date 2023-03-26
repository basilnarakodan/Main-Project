import { React, useEffect } from "react";
import { NavigationContainer, } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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
    ProfileScreen
} from "../screens";
import HomeTabs from "./BottomTabs"
import { GeneralAction } from "../actions";

const Stack = createStackNavigator();

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
                    isAppLoading ? (<Stack.Screen name="Splash" component={SplashScreen} />
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
                        <>
                        <Stack.Screen name="HomeTabs" component={HomeTabs} />
                        <Stack.Screen name="Details" component={DetailsScreen} />
                        <Stack.Screen name="Dashboard" component={DashboardScreen} />
                        <Stack.Screen name="Connect" component={ConnectScreen} />
                        <Stack.Screen name="Profile" component={ProfileScreen} />
                        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                        </>
                    )}
            </Stack.Navigator>
        </NavigationContainer>

    );
};

// const mapStateToProps=(state)=>{
//     return{
//         token:state.generalState.token
//     }
// }

export default Navigators;
