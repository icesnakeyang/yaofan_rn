import React, {Component} from 'react'
import {
    View,
    TextInput,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import Textarea from "react-native-textarea";
import actions from "../../action";
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationUtil from "../../navigator/NavigationUtil";

class CreateTeam extends Component {
    constructor(props) {
        super(props);
        let {height, width} = Dimensions.get('window')
        this.state = {
            teamName: '',
            teamDescription: '',
            height: height,
            width: width
        }
    }

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
                        this._createTeam()
                    }}
                >
                    <Ionicons
                        name={'ios-checkmark'}
                        size={40}
                        style={{color: this.props.theme.color.THEME_HEAD_TEXT}}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    _createTeam() {
        console.log(this.state)
        console.log(this.props)
        if (!this.state.user) {
            return
        }
        if (!this.state.user.userInfo) {
            return
        }
        if (!this.state.user.userInfo.token) {
            return
        }
        if (!this.state.teamName) {
            return
        }
        if (!this.state.teamDescription) {
            return
        }
        const {createTeam} = this.props
        let params = {
            name: this.state.teamName,
            description: this.state.teamDescription,
            token: this.props.user.userInfo.token
        }
        createTeam(params, (result) => {
            if (result) {
                NavigationUtil.goPage({}, 'MyTeam')
            }
        })
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('team.createTeam')}
                statusBar={statusBar}
                style={{
                    backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
                }}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View style={{
                flex: 1,
                backgroundColor: this.props.theme.color.THEME_BACK_COLOR
            }}>
                {navigationBar}
                <View style={{
                    marginTop: 20,
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR
                }}>
                    <TextInput
                        style={{
                            height: 50,
                            padding: 0,
                            paddingLeft: 10
                        }}
                        placeholder={I18nJs.t('team.teamNameHolder')}
                        onChangeText={(teamName) => this.setState({teamName})}
                    />
                </View>
                <View style={{
                    marginTop: 10,
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR
                }}>
                    <Textarea
                        containerStyle={{height: this.state.height - 160, padding: 10}}
                        placeholder={I18nJs.t('team.teamDescriptionHolder')}
                        onChangeText={(teamDescription) => this.setState({teamDescription})}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user,
    team: state.team
})

const mapDispatchToProps = dispatch => ({
    createTeam: (params, callback) => dispatch(actions.createTeam(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam)