import { createDrawerNavigator } from "@react-navigation/drawer"
import { AddReviewScreen, ConnectScreen, DashboardScreen, DetailsScreen, EditProfileScreen, HomeScreen, PdfScreen, PolicyScreen, ProfileScreen, ResourceScreen, ResourceSingleScreen, ReviewScreen, VideoScreen } from "../screens";
import SideBar from "../components/SideBar";
import BottomTabs from "./BottomTabs";

const Drawer = createDrawerNavigator();

const MainScreen = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <SideBar {...props}/>}
        >
            <Drawer.Screen name="HomeTabs" component={BottomTabs} options={{ headerShown: false }}/>
            <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="Connect" component={ConnectScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="Review" component={ReviewScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="Resource" component={ResourceScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="Policy" component={PolicyScreen} options={{ headerShown: false }} />

            <Drawer.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="AddReview" component={AddReviewScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="ResourceSingle" component={ResourceSingleScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="Video" component={VideoScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="Pdf" component={PdfScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />

        </Drawer.Navigator>
    );
};

export default MainScreen;