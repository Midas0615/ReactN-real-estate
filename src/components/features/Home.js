import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, Button, Image, ImageBackground, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { logoutRequest } from '../../redux/actions/auth';
import Swiper from 'react-native-deck-swiper'
import apiIdx from '../../api/idx';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
    },
    done: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
        backgroundColor: 'transparent'
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    settingIcon: {
        position: 'absolute',
        top: 12,
        left: 20
    },
    title: {
        flex: 1,
        color: 'yellow',
        fontSize: 25,
        textAlign: 'center',
        color: '#ff8d00',
        fontWeight: '500'
    }
})

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            swipedAllCards: false,
            swipeDirection: '',
            isSwipingBack: false,
            cardIndex: 0
        }
        apiIdx.testing()
            .then(res => res.json())
            .then((resData) => {
                this.setState({
                    cards: resData
                })
            });
    }

    renderCard = card => {
        return (
            <View style={styles.card}>
                <ImageBackground style={styles.imgBackground} source={{ uri: card.imgSrcs[0] }} resizeMode='cover'>
                    <Text style={styles.text}>{card.address}</Text>
                </ImageBackground>
            </View >
        )
    };

    onSwipedAllCards = () => {
        this.setState({
            swipedAllCards: true
        })
    };

    swipeBack = () => {
        if (!this.state.isSwipingBack) {
            this.setIsSwipingBack(true, () => {
                this.swiper.swipeBack(() => {
                    this.setIsSwipingBack(false)
                })
            })
        }
    };

    setIsSwipingBack = (isSwipingBack, cb) => {
        this.setState(
            {
                isSwipingBack: isSwipingBack
            },
            cb
        )
    };

    swipeLeft = () => {
        this.swiper.swipeLeft()
    };

    userLogout(e) {
        this.props.onLogout();
        e.preventDefault();
    }

    render() {
        if (this.state.cards.length > 0) {
            return (
                <View style={styles.container}>
                    <Swiper
                        cards={this.state.cards}
                        renderCard={(card) => this.renderCard(card)}
                        onSwiped={(cardIndex) => { console.log(cardIndex) }}
                        onSwipedAll={() => { console.log('onSwipedAll') }}
                        cardIndex={0}
                        backgroundColor={'#eeeeee'}
                        cardVerticalMargin={50}
                        stackSize={2}
                        overlayLabels={{
                            bottom: {
                                title: 'BLEAH',
                                style: {
                                    label: {
                                        backgroundColor: 'black',
                                        borderColor: 'black',
                                        color: 'white',
                                        borderWidth: 0
                                    },
                                    wrapper: {
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }
                                }
                            },
                            left: {
                                title: 'NOPE',
                                style: {
                                    label: {
                                        backgroundColor: 'black',
                                        borderColor: 'black',
                                        color: 'white',
                                        borderWidth: 0
                                    },
                                    wrapper: {
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        justifyContent: 'flex-start',
                                        marginTop: 30,
                                        marginLeft: -30
                                    }
                                }
                            },
                            right: {
                                title: 'LIKE',
                                style: {
                                    label: {
                                        backgroundColor: 'black',
                                        borderColor: 'black',
                                        color: 'white',
                                        borderWidth: 0
                                    },
                                    wrapper: {
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-start',
                                        marginTop: 30,
                                        marginLeft: 30
                                    }
                                }
                            },
                            top: {
                                title: 'SUPER LIKE',
                                style: {
                                    label: {
                                        backgroundColor: 'black',
                                        borderColor: 'black',
                                        color: 'white',
                                        borderWidth: 0
                                    },
                                    wrapper: {
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }
                                }
                            }
                        }}
                        animateOverlayLabelsOpacity
                        animateCardOpacity
                    >
                        <View style={styles.headerContainer}>
                            <Icon name='bars' size={30} style={styles.settingIcon} />
                            <Text style={styles.title}>
                                Rubble
                            </Text>
                        </View>
                    </Swiper>
                </View >
            );
        } else {
            return (
                <Text>wait</Text>
            );
        }
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        email: state.auth.email,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(logoutRequest()); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);