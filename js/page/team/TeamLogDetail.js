import React, {Component} from 'react'
import {
    View,
    Text,
    Dimensions
} from 'react-native'
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import actions from "../../action";
import {connect} from "react-redux";
import moment from "moment";

class TeamLogDetail extends Component {
    constructor(props) {
        super(props);
        const {width, height} = Dimensions.get('window')
        this.state = {
            width: width,
            height: height
        }
    }

    componentDidMount() {
        this._loadAllData()
    }

    _loadAllData() {
        const {getApplyTeam} = this.props
        let params = {
            token: this.props.user.userInfo.token,
            applyId: this.props.navigation.state.params.applyId
        }
        getApplyTeam(params, (result) => {
            if (result) {
                console.log(this.props)
            }
        })

    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}></GetLeftButton>
        )
    }

    _showData() {
        let showData = {
            teamName: '',
            applyUserName: '',
            applyTime: '',
            applyRemark: '',
            processResult: I18nJs.t('status.unProcess'),
            processTime: '',
            processRemark: ''
        }
        if (this.props.team && this.props.team.applyTeam) {
            if (this.props.team.applyTeam.applyTeamName) {
                showData.teamName = this.props.team.applyTeam.applyTeamName
            }
            if (this.props.team.applyTeam.applyUserName) {
                showData.applyUserName = this.props.team.applyTeam.applyUserName
            }
            if (this.props.team.applyTeam.applyTime) {
                showData.applyTime = moment(this.props.team.applyTeam.applyTime).format('YYYY-MM-DD HH:mm:ss')
            }
            if (this.props.team.applyTeam.applyRemark) {
                showData.applyRemark = this.props.team.applyTeam.applyRemark
            }
            if (this.props.team.applyTeam.processResult === 'REJECT') {
                showData.processResult = I18nJs.t('status.reject')
            } else {
                if (this.props.team.applyTeam.processResult === 'AGREE') {
                    showData.processResult = I18nJs.t('status.agree')
                }
            }
            if (this.props.team.applyTeam.processTime) {
                showData.processTime = moment(this.props.team.applyTeam.processTime).format('YYYY-MM-DD HH:mm:ss')
            }
            if (this.props.team.applyTeam.processRemark) {
                showData.processRemark = this.props.team.applyTeam.processRemark
            }
        }
        return showData
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('team.teamLog')}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                statusBar={statusBar}
                leftButton={this.getLeftButton()}
            />
        )
        const showData = this._showData()
        return (
            <View style={{
                flex: 1,
                backgroundColor: this.props.theme.color.THEME_BACK_COLOR
            }}>
                {navigationBar}
                <View style={{
                    marginTop: 20,
                    alignItems: 'center',
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR
                }}>
                    <View style={{
                        height: 50,
                        width: this.state.width,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{fontSize: 20}}>
                            {showData.teamName}
                        </Text>
                    </View>
                    <View>
                        <Text>{showData.applyUserName}</Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <Text>{I18nJs.t('team.applyTime')}：{showData.applyTime}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        borderWidth: 0.5,
                        margin: 10,
                        padding: 10,
                    }}>
                        <Text style={{fontSize: 12, flex: 1}}>{showData.applyRemark}</Text>
                    </View>
                </View>
                <View style={{marginTop: 20, backgroundColor: this.props.theme.color.THEME_ROW_COLOR}}>
                    <View style={{flexDirection: 'row', padding: 10}}>
                        <Text>
                            {I18nJs.t('team.processResult')}
                        </Text>
                        <Text style={{marginLeft: 10}}>
                            {showData.processResult}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', padding: 10}}>
                        <Text>
                            {I18nJs.t('team.processTime')}
                        </Text>
                        <Text style={{marginLeft: 10}}>
                            {showData.processTime}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        borderWidth: 0.5,
                        margin: 10,
                        padding: 10

                    }}>
                        <Text style={{fontSize: 12}}>{showData.processRemark}</Text>
                    </View>
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
    getApplyTeam: (params, callback) => dispatch(actions.getApplyTeam(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamLogDetail)

