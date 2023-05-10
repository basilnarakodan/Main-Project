import React from "react";
import { ImageBackground, TouchableOpacity,StyleSheet } from "react-native";
import styled from "styled-components";
import { Display } from "../utils";

const CourseCard = ({ navigate,bgimage,title,items }) => (
    <TouchableOpacity onPress={() => navigate(items,title)} activeOpacity={0.8}>
        <Container>
            <Cover>
                <Image source={bgimage} />
                <Title>{title}</Title>
                <Logo source={require("../assets/images/goggles.png")} />
            </Cover>
            {/* <Content>
                <Logo source={require("../assets/images/facebook.png")} />
                <Caption>React Native</Caption>
                <Subtitle>by Facebook</Subtitle>
            </Content> */}
        </Container>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    // },
});

const Container = styled.View`
    background-color: white;
    width: 360px;
    height: 200px;
    border-radius: 14px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    // margin-left: 10px;
    margin-top: 20px;
  `;

const Cover = styled.View`
    width: 100%;
    height: 200px;
    border-radius: 14px;
    // border-top-left-radius: 14px;
    // border-top-right-radius: 14px;
    overflow: hidden;
    background-color: grey;

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
  font-size: 32px;
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
  width: 35px;
  height: 35px;
  position: absolute;
  bottom: 20px;
  right: 30px;
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

export default CourseCard;