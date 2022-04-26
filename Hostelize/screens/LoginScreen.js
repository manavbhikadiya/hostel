import React, { useState } from "react";
import {
    Text,
    StyleSheet,
    PixelRatio,
    Platform,
    Dimensions,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
    Alert,
    Image,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-community/async-storage";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import { AuthContext } from '../component/Context';

const { width, height } = Dimensions.get("window");

const scale = width / 320;

const normalize = (size) => {
    const newSize = size * scale;
    if (Platform.OS === "ios") {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
};

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { signIn } = React.useContext(AuthContext)

    const handleEmail = (email) => {
        setEmail(email);
    };

    const handlePassword = (password) => {
        setPassword(password);
    };

    const submitData = () => {
        setIsLoading(true);
        axios
            .post(`https://hosteldashboards.herokuapp.com/user/loginUser/${email}`, { password: password })
            .then((res) => {
                if (res) {
                    setTimeout(() => {
                        AsyncStorage.setItem('userID', res.data._id)
                            .then(() => {
                                signIn();
                            })
                            .catch(() => {
                                navigation.navigate('LoginScreen');
                            })
                        AsyncStorage.setItem('name', res.data.name)
                            .then(() => {
                                signIn();
                            })
                            .catch(() => {
                                navigation.navigate('LoginScreen');
                            })
                        AsyncStorage.setItem('email', res.data.email)
                            .then(() => {
                                signIn();
                            })
                            .catch(() => {
                                navigation.navigate('LoginScreen');
                            })
                        
                        setIsLoading(false);
                        setEmail(null);
                        setPassword(null);
                    }, 3000)
                }
            })
            .catch((e) => {
                Alert.alert(
                    "Authenticaion Error",
                    "Credentials are incorrect.",
                    [
                        {
                            text: "Cancel",
                            onPress: () => navigation.navigate("LoginScreen"),
                            style: "cancel",
                        },
                        { text: "OK", onPress: () => navigation.navigate("LoginScreen") },
                    ]
                );
                setIsLoading(false);
                setEmail(null);
                setPassword(null);
            });
    };

    return (
        <>
            <View style={styles.container}>
                <Image
                    source={require("../assets/loginBack.jpg")}
                    style={styles.image}
                />
                <Animatable.View style={styles.loginContainer} animation="flipInX">
                    <Text style={styles.welcomeText}>Welcome Back</Text>
                    <Text style={styles.subText}>Login to your account</Text>
                    <View style={styles.loginFields}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={'#000'}
                            onChangeText={(val) => handleEmail(val)}
                            value={email}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            // secureTextEntry={true}
                            placeholderTextColor={'#000'}
                            onChangeText={(val) => handlePassword(val)}
                            value={password}
                        />
                        <TouchableOpacity style={styles.registerTextContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                                <Text style={styles.forgotText}>Forgot Password?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
                                <Text style={styles.registerText}>Register Now</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={submitData}>
                            {isLoading ? (
                                <Animated.View style={styles.loginButton}>
                                    <ActivityIndicator color="#fff" size={30} />
                                </Animated.View>
                            ) : (
                                <Animated.View style={styles.loginButton}>
                                    <Text style={styles.signInText}>Sign in</Text>
                                </Animated.View>
                            )}
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </View>
        </>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        paddingTop: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    loginContainer: {
        backgroundColor: "#fff",
        width: wp(80),
        height: hp(50),
        padding: 15,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.2,
        shadowRadius: 16.0,

        elevation: 24,
    },
    welcomeText: {
        fontSize: normalize(23),
        fontWeight: "bold",
        color: "#000066",
        marginLeft: 12,
        marginTop: 15,
    },
    subText: {
        marginTop: 5,
        color: "#cccccc",
        fontSize: normalize(14),
        marginLeft: 12,
    },
    loginFields: {
        marginTop: 20,
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: wp(65),
        height: 40,
        margin: 12,
        padding: 10,
        backgroundColor: "#f6f6f6",
        borderRadius: 8,
        color: "#737373",
    },
    loginButton: {
        width: wp(60),
        height: hp(4.8),
        backgroundColor: "#000066",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
        shadowColor: "#999999",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
        marginTop: 50,
    },
    signInText: {
        color: "#fff",
        fontSize: normalize(14.5),
        fontWeight: "bold",
    },
    image: {
        flex: 1,
        justifyContent: "center",
        position: "absolute",
        width: width,
        height: height * 1.1,
        backgroundColor: "rgba(0,0,0,1)",
        opacity: 0.4,
    },
    registerTextContainer: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    forgotText: {
        color: "#000",
    },
    registerText: {
        color: "#000066",
        fontWeight: "bold",
        marginLeft: 50,
    },
});
