import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, View, Button, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { loginAttempt, loginSuccess, loginFailed } from '../redux/actions/auth'
import Dimensions from 'Dimensions';
// import { login } from '../api/auth';
// import { axios } from 'react-native-axios'; 

import { AccessToken, LoginManager, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';

const styles = StyleSheet.create({
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, .3)'
    },
    logoContainer: {
        paddingVertical: 30,
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    marginBottom: {
        marginBottom: 20
    },
    textInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingLeft: 35,
        fontWeight: '500'
    },
    socailButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    socailButton: {
        width: 250,
        justifyContent: 'center'
    }
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        LoginManager.logOut();
    }

    _fbAuth() {
        let self = this;
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(function (result) {
            if (result.isCancelled) {                
                console.log("Login Cancelled");
            } else {

                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        let accessToken = data.accessToken;

                        const responseInfoCallback = (error, result) => {
                            if (error) {
                                console.log(error)
                            } else {
                                console.log(result)
                                self.setState({
                                    email: result.email
                                });
                                self.userLogin();
                            }
                        }

                        const infoRequest = new GraphRequest(
                            '/me',
                            {
                                accessToken: accessToken,
                                parameters: {
                                    fields: {
                                        string: 'email,name,first_name,middle_name,last_name'
                                    }
                                }
                            },
                            responseInfoCallback
                        );

                        // Start the graph request.
                        new GraphRequestManager().addRequest(infoRequest).start();

                    })
            }
        }, function (error) {
            console.log("some error occurred!!");
        })
    }

    userLogin(e = null) {
        this.props.loginSuccess(this.state);
        if (e)
            e.preventDefault();
    }

    toggleRoute(e) {
        let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        this.setState({ route: alt });
        e.preventDefault();
    }

    render() {
        return (
            <ImageBackground style={styles.imgBackground} resizeMode='cover' source={require('../assets/login_bg.jpg')}>
                <ScrollView style={styles.container}>
                    <View style={[styles.logoContainer]}>
                        <Image resizeMode="contain" style={styles.logo} source={require('../assets/login_avatar.png')} />
                    </View>
                    <View style={[styles.socailButtonContainer, styles.marginBottom]}>
                        <Icon.Button name="facebook" style={styles.socailButton} borderRadius={1} backgroundColor="#3b5998" onPress={this._fbAuth.bind(this)}>
                            LOGIN WITH FACEBOOK
                        </Icon.Button>
                    </View>
                    <View style={[styles.socailButtonContainer, styles.marginBottom]}>
                        <Icon.Button name="google" style={styles.socailButton} borderRadius={1} backgroundColor="#dc4e41" onPress={this._fbAuth.bind(this)}>
                            LOGIN WITH GOOGLE
                        </Icon.Button>
                    </View>
                    <TextInput
                        placeholder='Email'
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoFocus={true}
                        underlineColorAndroid='transparent'
                        keyboardType='email-address'
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                        style={[styles.marginBottom, styles.textInput]}
                    />
                    <TextInput
                        placeholder='Password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                        style={[styles.marginBottom, styles.textInput]}
                    />
                    <View style={[styles.marginBottom]}>
                        <Button
                            onPress={(e) => this.userLogin(e)}
                            title={"Login"}
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.isLoggedIn
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginSuccess: (userData) => { dispatch(loginSuccess(userData)); },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);