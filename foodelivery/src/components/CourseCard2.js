import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components";

const CourseCard2 = ({ navigate }) => {
    return (
        // <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate()}>

            <Container>
                <Cover>
                    <Image source={require("../assets/images/deliver.png")} />
                    <Title>Styled Components</Title>
                </Cover>
                <Content>
                    <Logo source={require("../assets/images/facebook.png")} />
                    <Caption>React Native</Caption>
                    <Subtitle>by Facebook</Subtitle>
                </Content>
            </Container>
        </TouchableOpacity>
        // </View>
    );
};

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    // }
});

const Container = styled.View`
    background-color: white;
    width: 315px;
    height: 280px;
    border-radius: 14px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    margin-left: 20px;
    margin-top: 120px;
  `;

const Cover = styled.View`
    background-color: white;
    width: 100%;
    height: 200px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    overflow: hidden;
  `;

const Image = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  width: 170px;
  margin-top: 20px;
  margin-left: 20px;
`;

const Content = styled.View`
  padding-left: 20px;
  flex-direction: row;
  align-items: center;
  height: 80px;
`;

const Logo = styled.Image`
  width: 44px;
  height: 44px;
`;

const Caption = styled.Text`
  color: #3c4560;
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
  `;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  text-transform: uppercase;
  margin-top: 4px;
  margin-left: 10px;
`;

export default CourseCard2;