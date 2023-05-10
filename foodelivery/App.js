import React from "react";
import { LogBox } from "react-native";
import Navigators from "./src/navigators";
import {Store} from "./src/Store";
import {Provider} from 'react-redux'
// import 'react-native-gesture-handler';

LogBox.ignoreAllLogs();

export default ()=> (
    <Provider store={Store}>
        <Navigators/>
    </Provider>
    )