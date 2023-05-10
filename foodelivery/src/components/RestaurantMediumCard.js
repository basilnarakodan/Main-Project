import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors, Fonts, Images } from '../constants';
import { StaticImageService } from '../services';
import { Display } from '../utils';
import * as Animatable from 'react-native-animatable';

const RestaurantMediumCard = ({ id, company, images: { logo }, role, ctc, branch, location, last_date, last_time,date,time, navigate }) => {
    return (
        <TouchableOpacity
            activeOpacity={.7}
            onPress={() => navigate(id,company)}
        >
            <Animatable.View style={styles.container} animation={"fadeInUp"}>
                <View>
                   
                    <Image
                        source={logo ? { uri: StaticImageService.getLogo(logo) } : Images.NO_IMAGE}
                        resizeMode={logo ? "cover" : "contain"}
                        style={styles.posterStyle}
                    />
                </View>
                <View style={styles.labelContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{company}</Text>
                        <View style={styles.rowAndCenter}>
                            <FontAwesome />
                            <Text style={styles.ratingText}></Text>
                            <Text style={{...styles.reviewsText,fontSize:12}}>{ctc}</Text>
                        </View>
                    </View>
                    <Text style={styles.tagsText}>{role}</Text>
                    <View style={styles.titleContainer}>
                        <Text style={styles.tagsText}>{branch?.join(' • ')}</Text>
                        <View style={styles.rowAndCenter}>
                            {last_date?<Text style={styles.reviewsText}>Apply By</Text>
                            :   <Text style={styles.reviewsText}>Applied On</Text>
                            }
                            
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.tagsText}>{location}</Text>
                        <View style={styles.rowAndCenter}>
                            {last_date ?
                            <>
                            <Text style={{...styles.reviewsText,color:Colors.DEFAULT_GREEN}}>{last_date}</Text>
                            <Text style={{...styles.reviewsText,color:Colors.DEFAULT_GREEN}}>{" "}{last_time}</Text>
                            </>
                            :
                            <>    
                            <Text style={{...styles.reviewsText,color:Colors.DEFAULT_GREEN}}>{date}</Text>
                             <Text style={{...styles.reviewsText,color:Colors.DEFAULT_GREEN}}>{" "}{time}</Text>
                            
                            </>}
                           
                        </View>
                    </View>
                </View>
            </Animatable.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        elevation: 1.5,
        borderRadius: 8,
        backgroundColor: Colors.DEFAULT_WHITE,
        marginTop: 8,
        marginVertical: 20,
    },
    posterStyle: {
        width: Display.setWidth(18),
        height: Display.setWidth(18),
        borderRadius: 10,
        margin: 5,
    },
    labelContainer: {
        flex: 1,
        marginHorizontal: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    deliveryDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
        marginBottom: 5,
    },
    tagsText: {
        fontSize: 11,
        lineHeight: 11 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_GREY,
        marginBottom: 7,
    },
    deliveryDetailsText: {
        marginLeft: 3,
        fontSize: 12,
        lineHeight: 12 * 1.4,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.DEFAULT_BLACK,
    },
    deliveryDetailsIcon: {
        height: 16,
        width: 16,
    },
    rowAndCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_BOLD,
        color: Colors.DEFAULT_BLACK,
    },
    reviewsText: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_BLACK,
    },
});

export default RestaurantMediumCard;