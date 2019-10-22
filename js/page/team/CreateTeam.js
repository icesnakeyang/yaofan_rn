import React, {Component} from 'react'
import {
    View,
    TextInput
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import Textarea from "react-native-textarea";

class CreateTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: '',
            teamDescription: ''
        }
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
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
                            borderBottomWidth: 1,
                            padding: 0,
                            paddingLeft: 10
                        }}
                        placeholder={'请输入团队名称'}
                        onChangeText={(teamName) => this.setState({teamName})}
                    />
                </View>
                <View style={{
                    marginTop: 10,
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR
                }}>
                    <Textarea
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

export default connect(mapStateToProps)(CreateTeam)