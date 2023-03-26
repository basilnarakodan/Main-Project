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
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Colors } from '../constants';
import { StaticImageService } from '../services';
import { Display } from '../utils';


export default function ConnectCard({name,joined_company,passing_year,linkedIn,images: {logo},linkedInUrl}) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
            <View style={styles.container}>
                <View style={styles.profile}>
                    <View style={styles.profileHeader}>
                        <Image
                            alt=""
                            source={{
                                uri: StaticImageService.getLogo(logo)
                            }}
                            style={styles.profileAvatar}
                        />

                        <View style={styles.profileBody}>
                            <Text style={styles.profileName}>{name}</Text>
                            <Text style={styles.profileHandle}>placed@ {joined_company} in {passing_year}</Text>
                            <Text style={styles.profileHandle}>@{linkedIn}</Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.connectSymbol} 
                            activeOpacity={0.8}
                            onPress={()=>{
                                (linkedInUrl)?Linking.openURL(linkedInUrl):""
                            }}
                        >
                            <FeatherIcon color={Colors.DEFAULT_GREEN} name="send" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 0,
        paddingHorizontal: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
   },
    profile: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 12,
    },
    profileName: {
        fontSize: 17,
        fontWeight: '600',
        color: '#3d3d3d',
    },
    profileHandle: {
        marginTop: 4,
        fontSize: 15,
        color: '#989898',
    },
    connectSymbol: {
        position: 'absolute',
        right: 20,
    }
});