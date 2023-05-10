import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { Colors } from '../constants';
import { StaticImageService } from '../services';
import { Display } from '../utils';
import ReadMore from '@fawazahmed/react-native-read-more';
import UserAvatar from 'react-native-user-avatar';
import * as Animatable from 'react-native-animatable';

export default function ReviewCard({ name, company, review }) {
    return (
        <Animatable.View style={styles.container} animation={"fadeInUp"}>
            <View style={styles.profile}>
                <View style={styles.profileHeader}>
                    <UserAvatar size={35} name={name} />
                    <View>
                        <Text style={styles.profileName}>{company}</Text>
                        <Text style={styles.profileHandle}>{name}</Text>
                    </View>
                </View>
                <View style={styles.profileBody}>
                    <ReadMore
                        numberOfLines={3}
                        seeMoreStyle={{ color: Colors.FABEBOOK_BLUE, fontWeight: 'bold' }}
                        seeLessStyle={{ color: Colors.FABEBOOK_BLUE, fontWeight: 'bold' }}
                    >
                        {review}
                    </ReadMore>
                </View>
                <TouchableOpacity
                    style={styles.readmore}
                    activeOpacity={0.8}
                    onPress={() => {

                    }}
                >
                </TouchableOpacity>
            </View>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        width: Display.setWidth(95)
    },
    profile: {
        borderRadius:5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    profileAvatar: {
        width: 35,
        height: 35,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 12,
    },
    profileName: {
        marginLeft:8,
        fontSize: 15,
        fontWeight: '600',
        color: '#3d3d3d',
    },
    profileHandle: {
        marginLeft:8,
        marginTop: 0,
        fontSize: 13,
        color: '#989898',
    },
    readmore: {
        paddingHorizontal: 10,
    },
    readmoreText: {
        color: Colors.FABEBOOK_BLUE,
        fontWeight: 'bold',
    },
    profileBody: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});