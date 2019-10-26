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
        console.log(this.props)
        const {getApplyTeam} = this.props
        let params = {
            token: this.props.user.userInfo.token,
            teamId: this.props.navigation.state.params.teamId
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
            teamName: ''
        }
        if (this.props.team && this.props.team.applyTeam) {
            showData.teamName = this.props.team.applyTeam.applyTeamName
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
        const showData=this._showData()
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
                    <View style={{marginTop: 10}}>
                        <Text>{I18nJs.t('team.applyTime')}：2012-12-12</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        borderWidth: 0.5,
                        margin: 10,
                        padding: 10,
                    }}>
                        <Text style={{fontSize: 12, flex: 1}}>行行好吧，给口饭吃</Text>
                    </View>
                </View>
                <View style={{marginTop: 20, backgroundColor: this.props.theme.color.THEME_ROW_COLOR}}>
                    <View style={{flexDirection: 'row', padding: 10}}>
                        <Text>
                            {I18nJs.t('team.processResult')}
                        </Text>
                        <Text style={{marginLeft: 10}}>
                            已拒绝
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', padding: 10}}>
                        <Text>
                            {I18nJs.t('team.processTime')}
                        </Text>
                        <Text style={{marginLeft: 10}}>
                            2019-12-11
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        borderWidth: 0.5,
                        margin: 10,
                        padding: 10

                    }}>
                        <Text style={{fontSize: 12}}>抱歉，你不适合我公司</Text>
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

