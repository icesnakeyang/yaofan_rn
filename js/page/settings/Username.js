import React, {Component} from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from "react-redux";
import NavigationUtil from "../../navigator/NavigationUtil";
import {updateUsername} from "../../action/user/login";
import actions from "../../action";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";

class Username extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            editUsername: ''
        }
    }

    componentDidMount() {
        this.loadAllData()
    }

    componentWillUnmount() {

    }

    loadAllData() {
        if (this.props.user.userInfo && this.props.user.userInfo.name) {
            this.setState({
                username: this.props.user.userInfo.name,
                editUsername: this.props.user.userInfo.name
            })
        }
    }

    saveUsername() {
        const {updateUsername} = this.props
        let params = {
            username: this.state.editUsername,
            token: this.props.user.userInfo.token
        }
        updateUsername(params, (result) => {
            if (result) {
                NavigationUtil.goPage({}, 'MyAccount')
            }
        })
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}></GetLeftButton>
        )
    }

    getRightButton() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        this.saveUsername()
                    }}
                    style={{padding: 5, paddingRight: 13}}
                >
                    <Ionicons
                        name={'md-checkmark'}
                        size={26}
                        style={{color: this.props.theme.color.THEME_HEAD_TEXT}}
                    />
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
                title={I18nJs.t('myAccount.name')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <TextInput
                    style={styles.input_text}
                    defaultValue={this.state.username}
                    onChangeText={(editUsername) => this.setState({editUsername})}
                ></TextInput>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    updateUsername: (params, callback) => dispatch(actions.updateUsername(params, callback))
})
export default connect(mapStateToProps, mapDispatchToProps)(Username)

const styles = StyleSheet.create({
    input_text: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 16,
        borderBottomWidth: 1
    }
})