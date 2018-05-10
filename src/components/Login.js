import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, View, Button, TouchableOpacity, StyleSheet } from 'react-native';
// import { login } from '../api/auth';
import { loginAttempt, loginSuccess, loginFailed } from '../redux/actions/auth'
// import { axios } from 'react-native-axios'; 

import { LoginButton, AccessToken } from 'react-native-fbsdk';

const styles = StyleSheet.create({
    marginBottom: {
        marginBottom: 20
    },
    socailButtonContainer: {
        flex:1, 
        justifyContent: 'center',
        alignItems: 'center'
    }
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: 'Login',
            email: '',
            password: '',
        };
    }

    userLogin(e) {
        this.props.onLogin(this.state);
        e.preventDefault();
    }

    toggleRoute(e) {
        let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        this.setState({ route: alt });
        e.preventDefault();
    }

    render() {
        let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
        return (
            <ScrollView style={{ padding: 20 }}>
                <TextInput
                    placeholder='Email'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType='email-address'
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    style={[styles.marginBottom, { marginTop: 50 }]}
                />
                <TextInput
                    placeholder='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    style={[styles.marginBottom]}
                />
                <View style={[styles.marginBottom]}>
                    <Button
                        onPress={(e) => this.userLogin(e)}
                        title={this.state.route}
                    />
                </View>
                <View style={[styles.marginBottom, styles.socailButtonContainer]}>
                    <LoginButton
                        publishPermissions={["publish_actions"]}
                        onLoginFinished={
                            (error, result) => {
                                if (error) {
                                    alert("login has error: " + result.error);
                                } else if (result.isCancelled) {
                                    alert("login is cancelled.");
                                } else {
                                    AccessToken.getCurrentAccessToken().then(
                                        (data) => {
                                            alert(data.accessToken.toString())
                                        }
                                    )
                                }
                            }
                        }
                        onLogoutFinished={() => alert("logout.")} />
                </View>
                <Button
                    onPress={(e) => this.userLogin(e)}
                    title="Login with Gmail"
                    style={[styles.marginBottom]}
                />
            </ScrollView>
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
        onLogin: (userData) => { dispatch(loginSuccess(userData)); },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);