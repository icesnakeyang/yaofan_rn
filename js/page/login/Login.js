import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native'
import {connect} from "react-redux";
import actions from "../../action";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: ''
        }
    }

    getRightButton() {
        return (
            <View>
                <TouchableOpacity
                    style={{
                        margin: 5,
                        marginRight: 8
                    }}
                    onPress={() => {

                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            color: this.props.theme.color.THEME_HEAD_TEXT
                        }}
                    >{I18nJs.t('login.register')}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('login.login')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View style={{backgroundColor: this.props.theme.color.THEME_BACK_COLOR}}>
                {navigationBar}
                <View style={{margin: 10, marginTop: 20}}>
                    <View style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end'
                    }}>
                        <View style={{width: 75, alignItems: 'flex-end'}}>
                            <Text>Phone</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            borderBottomWidth: 0.75,
                            height: 40,
                            marginLeft: 10,
                            justifyContent: 'flex-end'
                        }}>
                            <TextInput
                                style={{fontSize: 20}}
                                onChangeText={(phone) => this.setState({phone})}
                            />
                        </View>
                    </View>
                    <View style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        height: 50,
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end'
                    }}>
                        <View style={{width: 75, alignItems: 'flex-end'}}>
                            <Text>password</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            borderBottomWidth: 0.75,
                            height: 40,
                            marginLeft: 10,
                            justifyContent: 'flex-end'
                        }}>
                            <TextInput
                                style={{fontSize: 20}}
                                onChangeText={(password) => this.setState({password})}
                            />
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor:'#00ff00'}}>
                    <View style={{backgroundColor:'#0000ff'}}>
                        <TouchableOpacity
                            style={{backgroundColor:'#ff0000'}}
                            title={'save'}
                            onPress={() => {

                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

const mapDispatchToProps = dispatch => ({
    login: (params, callback) => dispatch(actions.login(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)