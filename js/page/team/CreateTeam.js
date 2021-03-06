import React, {Component} from 'react'
import {
    View,
    TextInput,
    Dimensions,
    DeviceEventEmitter
} from 'react-native'
import {connect} from "react-redux";
import {I18nJs} from "../../language/I18n";
import Textarea from "react-native-textarea";
import actions from "../../action";
import NavigationUtil from "../../navigator/NavigationUtil";
import TouchButton from "../../common/component/TouchButton";

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

    _createTeam() {
        if (!this.props.user) {
            return
        }
        if (!this.props.user.userInfo) {
            return
        }
        if (!this.props.user.userInfo.token) {
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
                DeviceEventEmitter.emit('Refresh_MyTeam')
                NavigationUtil.goPage({}, 'TeamHome')
            }
        })
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: this.props.theme.color.THEME_BACK_COLOR
            }}>
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
                        containerStyle={{height: this.state.height-350, padding: 10}}
                        placeholder={I18nJs.t('team.teamDescriptionHolder')}
                        onChangeText={(teamDescription) => this.setState({teamDescription})}
                    />
                </View>
                <TouchButton
                    label={I18nJs.t('team.btCreateTeam')}
                    touchFunction={()=>{
                        this._createTeam()
                    }}
                />
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