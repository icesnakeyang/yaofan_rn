import React, {Component} from 'react'
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationUtil from "../../navigator/NavigationUtil";

class Register extends Component {

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
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
                        NavigationUtil.goPage({}, 'Login')
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            color: this.props.theme.color.THEME_HEAD_TEXT
                        }}
                    >{I18nJs.t('login.login')}</Text>
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
                title={I18nJs.t('login.register')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View style={{flex: 1, backgroundColor: this.props.theme.color.THEME_BACK_COLOR}}>
                {navigationBar}
                {/*输入区域*/}
                <View style={{margin: 10, marginTop: 20, backgroundColor: this.props.theme.color.THEME_ROW_COLOR}}>
                    {/*电话*/}
                    <View style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        height: 50,
                        alignItems: 'flex-end'
                    }}>
                        <View style={{width: 75, alignItems: 'flex-end'}}>
                            <Text
                                style={{color: this.props.theme.color.THEME_ROW_TEXT}}>{I18nJs.t('login.phone')}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            borderBottomWidth: 0.75,
                            borderBottomColor: this.props.theme.color.THEME_ROW_TEXT,
                            height: 40,
                            marginLeft: 10,
                            marginRight: 10,
                            justifyContent: 'flex-end'
                        }}>
                            <TextInput
                                style={{fontSize: 20, padding: 0, color: this.props.theme.color.THEME_ROW_TEXT}}
                                onChangeText={(phone) => this.setState({phone})}
                            />
                        </View>
                    </View>

                    {/*密码*/}
                    <View style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        height: 50,
                        alignItems: 'center'
                    }}>
                        <View style={{width: 75, alignItems: 'flex-end'}}>
                            <Text
                                style={{color: this.props.theme.color.THEME_ROW_TEXT}}>{I18nJs.t('login.password')}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            borderBottomWidth: 0.75,
                            borderBottomColor: this.props.theme.color.THEME_ROW_TEXT,
                            marginLeft: 10,
                            marginRight: 10
                        }}>
                            <TextInput
                                style={{fontSize: 18, padding: 0, color: this.props.theme.color.THEME_ROW_TEXT}}
                                onChangeText={(password) => this.setState({password})}
                            />
                        </View>
                    </View>
                </View>

                {/*提交按钮*/}
                <View style={{
                    margin: 10,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: this.props.theme.color.THEME_BUTTON_COLOR
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.loginUser()
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: this.props.theme.color.THEME_BUTTON_TEXT
                            }}
                        >{I18nJs.t('login.register')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})
export default connect(mapStateToProps)(Register)