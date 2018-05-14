import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, ScrollView, Text, TextInput, View, Button, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { loginAttempt, loginSuccess, loginFailed } from '../redux/actions/auth'
import { auth0, AUTH0_DOMAIN } from '../lib/auth';
import apiUser from '../api/user';

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
    },
    error: {
        borderWidth: 1,
        borderColor: 'red'
    }
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isEmailValidate: true,
            isPasswordValidate: true,
            route: 'Login'
        };

        this.userLogin = this.userLogin.bind(this);
        this.loginWindow = this.loginWindow.bind(this)
        this.validate = this.validate.bind(this)
    }

    validate(text, type) {
        if (type === 'email') {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(text)) {
                this.setState({ isEmailValidate: true })
            } else {
                this.setState({ isEmailValidate: false })
            }
            this.setState({ email: text })
        } else if (type === 'password') {
            let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            if (reg.test(text)) {
                this.setState({ isPasswordValidate: true })
            } else {
                this.setState({ isPasswordValidate: false })
            }
            this.setState({ password: text })
        }
    }

    userLogin(e) {
        if (!this.state.email) this.setState({ isEmailValidate: false })
        if (!this.state.password) this.setState({ isPasswordValidate: false })
        if (!this.isEmailValidate || !this.isPasswordValidate) return;
        if (this.state.route === 'Login') {
            auth0
                .auth
                .passwordRealm({ username: this.state.email, password: this.state.password, realm: "Username-Password-Authentication" })
                .then(credentials => {
                    this.getUserFromAuth0(credentials);
                })
                .catch(console.error);
        } else {
            auth0
                .auth
                .createUser({ email: this.state.email, username: this.state.email, password: this.state.password, connection: "Username-Password-Authentication" })
                .then(credentials => {
                    console.log(credentials);
                    apiUser.create(credentials)
                        .then(response => {
                            this.setState({
                                email: userinfo.email
                            });
                            this.props.loginSuccess(this.state);
                        })
                        .catch(console.error);
                })
                .catch(console.error);
        }
        e.preventDefault();
    }

    toggleRoute(e) {
        let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        this.setState({ route: alt });
        e.preventDefault();
    }

    loginWindow() {
        auth0
            .webAuth
            .authorize({ scope: 'openid profile email', audience: `https://${AUTH0_DOMAIN}/userinfo`, useBrowser: false })
            .then(credentials => {
                this.getUserFromAuth0(credentials);
            })
            .catch(error => console.log(error));
    }

    getUserFromAuth0(credentials) {
        auth0
            .auth
            .userInfo({ token: credentials.accessToken })
            .then(userinfo => {
                console.log(userinfo);
                this.setState({
                    email: userinfo.email
                });
                this.props.loginSuccess(this.state);
            })
            .catch(console.error);
    }

    render() {
        let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        return (
            <ImageBackground style={styles.imgBackground} resizeMode='cover' source={require('../assets/login_bg.jpg')}>
                <ScrollView style={styles.container}>
                    <View style={[styles.logoContainer]}>
                        <Image resizeMode="contain" style={styles.logo} source={require('../assets/login_avatar.png')} />
                    </View>
                    <View style={[styles.socailButtonContainer, styles.marginBottom]}>
                        <Button
                            style={styles.socailButton}
                            onPress={this.loginWindow}
                            icon={
                                <Icon name='facebook' color='white' />
                            }
                            iconRight
                            title={"Social Login"}
                        />
                    </View>

                    <TextInput
                        placeholder='Email'
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoFocus={true}
                        underlineColorAndroid='transparent'
                        keyboardType='email-address'
                        value={this.state.email}
                        onChangeText={(text) => this.validate(text, 'email')}
                        style={[styles.marginBottom, styles.textInput, !this.state.isEmailValidate ? styles.error : null]}
                    />
                    <TextInput
                        placeholder='Password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(text) => this.validate(text, 'password')}
                        style={[styles.marginBottom, styles.textInput, !this.state.isPasswordValidate ? styles.error : null]}
                    />
                    <View style={[styles.marginBottom]}>
                        <Button
                            onPress={(e) => this.userLogin(e)}
                            title={this.state.route}
                        />
                    </View>
                    <Text style={{ fontSize: 16, color: 'blue' }} onPress={(e) => this.toggleRoute(e)}>{alt}</Text>
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

    // _fbAuth() {
    //     let self = this;
    //     LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(function (result) {
    //         if (result.isCancelled) {
    //             console.log("Login Cancelled");
    //         } else {

    //             AccessToken.getCurrentAccessToken().then(
    //                 (data) => {
    //                     let accessToken = data.accessToken;

    //                     const responseInfoCallback = (error, result) => {
    //                         if (error) {
    //                             console.log(error)
    //                         } else {
    //                             console.log(result)
    //                             self.setState({
    //                                 email: result.email
    //                             });
    //                             self.userLogin();
    //                         }
    //                     }

    //                     const infoRequest = new GraphRequest(
    //                         '/me',
    //                         {
    //                             accessToken: accessToken,
    //                             parameters: {
    //                                 fields: {
    //                                     string: 'email,name,first_name,middle_name,last_name'
    //                                 }
    //                             }
    //                         },
    //                         responseInfoCallback
    //                     );

    //                     // Start the graph request.
    //                     new GraphRequestManager().addRequest(infoRequest).start();

    //                 })
    //         }
    //     }, function (error) {
    //         console.log("some error occurred!!");
    //     })
    // }