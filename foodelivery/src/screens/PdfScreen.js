import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Pdf from 'react-native-pdf';
import { Colors, Fonts } from "../constants";
import { Display } from "../utils";

const PdfScreen = ({ route: { params: pdfUrl } }) => {

    const [pagination, setPagination] = useState(false)

    return (
        <View style={styles.container}>

            <View style={styles.subContainer}>
                {typeof pdfUrl === "string" ?
                    <Pdf
                        trustAllCerts={false}
                        source={{ uri: pdfUrl, cache: true }}
                        // source={pdfUrl}
                        enablePaging={pagination}
                        horizontal={pagination}
                        onLoadComplete={(numberOfPages, filePath) => {
                            // console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            // console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            // console.log(`Link pressed: ${uri}`);
                        }}
                        style={styles.pdf}
                    />
                    :
                    <Pdf
                        trustAllCerts={false}
                        // source={{ uri: pdfUrl, cache: true }}
                        source={pdfUrl}
                        enablePaging={pagination}
                        horizontal={pagination}
                        onLoadComplete={(numberOfPages, filePath) => {
                            // console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            // console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            // console.log(`Link pressed: ${uri}`);
                        }}
                        style={styles.pdf}
                    />
                }
            </View>
            <TouchableOpacity
                style={styles.textContainer}
                activeOpacity={0.8}
                onPress={() => setPagination(!pagination)}
            >
                <Text style={styles.text}>{pagination ? "Enable Scroll" : "Enable Pagination"}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    subContainer: {
        width: Display.setWidth(100),
        height: Display.setHeight(100),
    },
    pdf: {
        flex: 1,
    },
    text: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 15,
        fontFamily: Fonts.POPPINS_MEDIUM
    },
    textContainer: {
        position: "absolute",
        bottom: 10,
        backgroundColor: Colors.DEFAULT_GREEN,
        padding: 8,
        alignItems: "center"
    }
});

export default PdfScreen;