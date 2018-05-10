import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Login from './Login';
import Home from './features/Home'

class Application extends Component {
    render() {
        if (this.props.isLoggedIn) {
            return <Home />
        } else {
            return <Login />
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state.auth.isLoggedIn);
    console.log(state);
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
}

export default connect(mapStateToProps)(Application);