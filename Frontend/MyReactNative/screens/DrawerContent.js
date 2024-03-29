import React from "react";
import { ip } from "./host.js";
import {
  AppRegistry,
  Text,
  View,
  Share,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Image,
  Linking
} from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Button, SocialIcon, ListItem } from "react-native-elements";

import * as SecureStore from "expo-secure-store";

export default class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    onShare = async () => {
      try {
        const result = await Share.share({
          message:
            'Follow the link to download "Jankalyan Blood Bank App, pune" - \n https://play.google.com/store/apps/details?id=com.jankalyan.bloodBank'
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };
    const list = [
      {
        id: 0,
        title: "Home",
        icon: <AntDesign name="home" size={25} color={"gray"} />
      },
      {
        id: 1,
        title: "Logout",
        icon: <SimpleLineIcons name="logout" size={25} color={"gray"} />
      },
      {
        id: 2,
        title: "About Us",
        icon: (
          <Ionicons
            name="ios-information-circle-outline"
            size={25}
            color={"gray"}
          />
        )
      },

      {
        id: 3,
        title: "Invite Friends",
        icon: <AntDesign name="plus" size={25} color={"gray"} />
      },
      {
        id: 4,
        title: "How to use this app",
        icon: <AntDesign name="question" size={25} color={"gray"} />
      }
    ];

    return (
      <View style={styles.container}>
        <TouchableHighlight>
          <View style={styles.innerHead}>
            <View
              style={{
                flexDirection: "row",
                flex: 1
              }}
            >
              {this.props.profilePic ? (
                <Image
                  style={styles.avatar}
                  source={{
                    uri: this.props.profilePic
                  }}
                />
              ) : (
                <Image
                  style={styles.avatar}
                  source={{
                    uri: ip + "/media/media/avatar.png"
                  }}
                />
              )}
              <View>
                <Text style={styles.name}>{this.props.name}</Text>

                <Text style={styles.description}>
                  Blood Group: {this.props.bloodGroup}
                </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <ScrollView style={{}}>
          <View>
            {list.map((item, i) => (
              <TouchableOpacity
                onPress={() => {
                  if (item.id === 0) {
                    this.props.nav.navigate("Home");
                    this.props.close();
                  }

                  if (item.id === 1) {
                    this.props.nav.navigate("login");
                    SecureStore.setItemAsync("isLoggedIn", "false").then(
                      response => {}
                    );
                    SecureStore.deleteItemAsync("token").then(response => {
                      fetch(ip + "/setNotificationToken/", {
                        method: "post",
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                          Authorization: "Token " + this.props.token
                        },
                        body: JSON.stringify({
                          token: ""
                        }),
                        credentials: "include"
                      })
                        .then(r => {
                          if (r.status === 200) {
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    });
                    this.props.close();
                  }
                  if (item.id === 2) {
                    this.props.nav.navigate("AboutUs");
                    this.props.close();
                  }
                  if (item.id === 3) {
                    onShare();
                  }
                  if (item.id === 4) {
                    Linking.canOpenURL(ip + "/media/media/mannual.pdf").then(
                      supported => {
                        if (supported) {
                          Linking.openURL(ip + "/media/media/mannual.pdf");
                        } else {
                          console.log(
                            "Don't know how to open URI: " +
                              ip +
                              "/forgotPassword/"
                          );
                        }
                      }
                    );
                  }
                }}
              >
                <ListItem
                  title={item.title}
                  titleStyle={{ paddingLeft: 10 }}
                  leftIcon={item.icon}
                  rightIcon={{ name: null }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 30,
              justifyContent: "space-around",
              paddingBottom: 20
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Linking.canOpenURL(
                  "https://www.facebook.com/JankalyanBBP/"
                ).then(supported => {
                  if (supported) {
                    Linking.openURL("https://www.facebook.com/JankalyanBBP/");
                  } else {
                    console.log(
                      "Don't know how to open URI: " +
                        "https://www.facebook.com/JankalyanBBP/"
                    );
                  }
                });
              }}
            >
              <SocialIcon type="facebook" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 30,
              justifyContent: "space-around",
              paddingBottom: 20
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              Email: jankalyansocial@gmail.com
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              justifyContent: "space-around",
              paddingBottom: 20
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Linking.canOpenURL("http://janakalyanbloodbank.org").then(
                  supported => {
                    if (supported) {
                      Linking.openURL("http://janakalyanbloodbank.org");
                    } else {
                      alert("Could Not Open URL! Please try again Later");
                    }
                  }
                );
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                janakalyanbloodbank.org
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  innerHead: {
    height: 150,
    backgroundColor: "#660000"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginTop: 20,
    marginHorizontal: 20
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "bold",
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 10
  },
  description: {
    fontSize: 18,
    color: "#fff",
    textAlign: "left",
    marginLeft: 5
  },
  info: {
    fontSize: 16,
    color: "#fff"
  },
  viewDesc: {
    flexDirection: "row",
    flex: 1
  }
});

AppRegistry.registerComponent("ReactNativeProject", () => DrawerContent);
