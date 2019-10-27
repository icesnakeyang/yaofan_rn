import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import Textarea from 'react-native-textarea'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import actions from "../../action";
import TouchButton from "../../common/component/TouchButton";
import moment from "moment";
import Toast from 'react-native-easy-toast'

class ApproveTeamApply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applyTeam: {},
            processRemark: ''
        }
    }

    componentDidMount() {
        this._loadAllData()
    }

    _loadAllData() {
        let applyTeamId = this.props.navigation.state.params.applyId
        const {getApplyTeam} = this.props
        let params = {
            applyId: applyTeamId,
            token: this.props.user.userInfo.token
        }
        getApplyTeam(params, (result) => {
            if (result) {
                this.setState({
                    applyTeam: this.props.team.applyTeam
                })
            }
        })
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    _reject() {
        const {rejectApplyTeam} = this.props
        let params = {
            token:this.props.user.userInfo.token,
            remark: this.state.processRemark,
            applyId: this.props.team.applyTeam.applyTeamLogId
        }
        rejectApplyTeam(params, (result) => {
            console.log(result)
            if (result) {
                this.refs.toast.show(I18nJs.t('team.tipRejectSuccess'))
            }else{
                this.refs.toast.show(I18nJs.t('syserr.'+this.props.team.error))
            }
        })
    }

    _agree() {
        const {agreeApplyTeam} = this.props
        let params = {
            token:this.props.user.userInfo.token,
            remark: this.state.processRemark,
            applyId: this.props.team.applyTeam.applyTeamLogId
        }
        agreeApplyTeam(params, (result) => {
            console.log(result)
            if (result) {
                this.refs.toast.show(I18nJs.t('team.tipAgreeSuccess'))
            }else{
                this.refs.toast.show(I18nJs.t('syserr.'+this.props.team.error))
            }
        })
    }

    _showData(){
        let showData={
            applyTime:''
        }
        if(this.state.applyTeam.applyTime){
            showData.applyTime=moment(this.state.applyTeam.applyTime).format('YYYY-MM-DD HH:mm:ss')
        }
        return showData
    }

    render() {
        const showData=this._showData()
        let statusBar = {
            backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('team.Approve')}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                statusBar={statusBar}
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
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    alignItems: 'center',
                    padding: 10
                }}>
                    <View style={{padding: 10}}>
                        <Text style={{fontSize: 24}}>{this.state.applyTeam.applyTeamName}</Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <Text style={{fontSize: 20}}>{this.state.applyTeam.applyUserName}</Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <Text>{showData.applyTime}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{
                            borderWidth: 0.5,
                            flex: 1,
                            padding: 10,
                            margin: 10
                        }}>
                            <Text>{this.state.applyTeam.applyRemark}</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    marginTop: 20,
                    padding: 20
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1, borderWidth: 0.5, padding: 10}}>
                            <Textarea
                                placeholder={I18nJs.t('team.processRemark')}
                                onChangeText={(processRemark) => this.setState({processRemark})}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flex: 1}}>
                            <TouchButton
                                style={{backgroundColor: '#00a853'}}
                                label={I18nJs.t('team.btAgree')}
                                touchFunction={() => {
                                    this._agree()
                                }}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <TouchButton
                                style={{backgroundColor: '#d34100'}}
                                label={I18nJs.t('team.btReject')}
                                touchFunction={() => {
                                    this._reject()
                                }}
                            />
                        </View>
                    </View>
                </View>
                <Toast ref={'toast'}
                       position={'center'}
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
    getApplyTeam: (params, callback) => dispatch(actions.getApplyTeam(params, callback)),
    rejectApplyTeam: (params, callback) => dispatch(actions.rejectApplyTeam(params, callback)),
    agreeApplyTeam: (params, callback) => dispatch(actions.agreeApplyTeam(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(ApproveTeamApply)