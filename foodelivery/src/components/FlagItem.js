import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors, Fonts } from "../constants";
import { StaticImageService } from "../services";

const FlagItem = ({ name, dial_code, code, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress({ name, code, dial_code })}>

            <Image style={styles.flageImage} source={{ uri: StaticImageService.getFlagIcon(code) }} />
            <Text style={styles.flagText}>{dial_code}</Text>
            <Text style={styles.flagText}>{name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    flageImage: {
        height: 25,
        width: 25,
        marginRight: 10,
    },
    flagText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginRight: 10,
    }
});

export default FlagItem;