import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Image,
} from 'react-native';
import { Colors, Fonts, Images } from "../constants";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Separator } from '../components';
import { Display } from '../utils';
import * as Animatable from 'react-native-animatable';

const ResourceSingleScreen = ({ navigation, route: { params: { items, title } } }) => {
    console.log(items.pdfUrl);
    let length = Object.keys(items).length
    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.DEFAULT_WHITE} translucent />
                <Separator height={StatusBar.currentHeight + 10} />
                <Animatable.Text style={styles.title} animation={"zoomInRight"}>{title}</Animatable.Text>

                {items.map(({ icon, label, type, end, videoId, duration, slno, pdfUrl }, index) => {
                    return (
                        <View key={index} style={styles.cardWrapper}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    {
                                        videoId ?
                                            navigation.navigate("Video", { videoId, slno, length, title })
                                            : pdfUrl ?
                                                navigation.navigate("Pdf", pdfUrl) : null
                                    }
                                }}>
                                <View style={styles.card}>
                                    <Animatable.View style={styles.cardIcon} animation={"flipInX"}>
                                        {/* <Image
                                            source={icon}
                                            resizeMode="contain"
                                            style={styles.image}
                                        /> */}
                                        <FeatherIcon color="#000" name={icon} size={30} />
                                    </Animatable.View>

                                    <Animatable.View style={styles.cardDelimiter} animation={"zoomInLeft"} delay={800}>
                                        {index !== items.length - 1 && (
                                            <View style={styles.cardDelimiterLine} />
                                        )}

                                        <View
                                            style={[
                                                styles.cardDelimiterInset,
                                                !end && { backgroundColor: 'white' },
                                            ]}
                                        />
                                    </Animatable.View>

                                    <Animatable.View style={styles.cardBody} animation={"zoomIn"}>
                                        <View style={styles.cardBodyContent}>
                                            <Text style={styles.cardTitle}>{label}</Text>

                                            <Text style={styles.cardSubtitle}>{type}</Text>
                                            <Text style={styles.cardDates}>Duration: {duration}</Text>
                                        </View>

                                        <View style={styles.cardBodyAction}>
                                            <FeatherIcon
                                                color="#181818"
                                                name="arrow-right"
                                                size={16}
                                            />
                                        </View>
                                    </Animatable.View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    title: {
        fontSize: 32,
        color: '#1d1d1d',
        marginBottom: 12,
        fontFamily: Fonts.POPPINS_SEMI_BOLD
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardDelimiter: {
        position: 'relative',
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    cardDelimiterInset: {
        width: 12,
        height: 12,
        borderWidth: 3,
        borderRadius: 9999,
        backgroundColor: '#fff',
        borderColor: '#ffcb05',
        zIndex: 9,
        position: 'relative',
    },
    cardDelimiterLine: {
        position: 'absolute',
        left: 30,
        top: '50%',
        borderLeftWidth: 1,
        borderColor: '#eee',
        height: '100%',
        zIndex: 1,
    },
    cardBody: {
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    cardBodyContent: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    cardBodyAction: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        maxWidth: 28,
        alignItems: 'flex-end',
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#2a2a2a',
        marginBottom: 3,
    },
    cardSubtitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#464646',
        marginBottom: 3,
    },
    cardDates: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ababab',
    },
    image: {
        height: 40,
        width: 40,
    }
});

export default ResourceSingleScreen