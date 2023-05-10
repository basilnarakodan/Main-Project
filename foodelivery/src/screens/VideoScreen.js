import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import YouTube from 'react-native-youtube';
import { Display } from "../utils";
import { Separator } from "../components";
import { Colors, Fonts } from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from 'react-native-animatable';

const axios = require("axios").default;

const VideoScreen = ({ route: { params: videoId, slno, length } }) => {

    const [videoDetails, setVideoDetails] = useState([])

    useEffect(() => {
        axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId.videoId}&fields=items(id,snippet)&key=AIzaSyCV6iJs8Yqzh2XxoWsQ_IFE4-xn5lGm2Pw`)
            .then(res => setVideoDetails(res.data.items[0].snippet))
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
                <Separator height={StatusBar.currentHeight + 10} />
                <YouTube
                    apiKey="AIzaSyCV6iJs8Yqzh2XxoWsQ_IFE4-xn5lGm2Pw"
                    videoId={videoId.videoId}
                    play={true}
                    loop={false}
                    controls={1}
                    style={styles.videoPlayer}
                />
                <Animatable.View style={styles.Descriptioncontainer} animation={"fadeInUp"}>
                    <Text style={styles.title}>{videoDetails.title}</Text>
                    <Text style={{ color: "black" }}>Course: {videoId.title}</Text>
                    <Text style={{ color: "black" }}>Video: {videoId.slno}/{videoId.length}</Text>
                    <Text style={{ color: "black" }}>Description</Text>
                    <Text style={styles.description}>{videoDetails.description}</Text>
                </Animatable.View>
                <Separator height={30} />

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    videoPlayer: {
        height: Display.setHeight(30),
        width: Display.setWidth(100),
        marginBottom: 20,
    },
    Descriptioncontainer: {
        marginHorizontal: 20,
    },
    title: {
        fontSize: 18,
        color: Colors.DEFAULT_BLACK,
        marginBottom: 10,
    },
    description: {
        marginVertical: 10,
        fontSize: 14,
    }
});

export default VideoScreen;