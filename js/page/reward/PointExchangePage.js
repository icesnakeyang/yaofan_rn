import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput,
    Dimensions,
    DeviceEventEmitter
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import TouchButton from "../../common/component/TouchButton";
import actions from "../../action";
import Textarea from 'react-native-textarea'
import Toast from 'react-native-easy-toast'
import NavigationUtil from "../../navigator/NavigationUtil";

class PointExchangePage extends Component {
    constructor(props) {
        super(props);
        const {height, width} = Dimensions.get('window')
        this.state = {
            height: height,
            width: width,
            pointBalance: 0,
            withdraw: 0,
            remark: ''
        }
    }

    componentDidMount() {
        this._loadAllData()
    }

    _loadAllData() {
        console.log(this.props)
        if (this.props.statistic) {
            if (this.props.statistic.data.currentPoint) {
                this.setState({
                    pointBalance: this.props.statistic.data.currentPoint
                })
            }
        }
    }

    getLeftButton() {
        return (
            <GetLeftButton  {...this.props}></GetLeftButton>
        )
    }

    _withdraw() {
        if (!this.props.user.userInfo) {
            return
        }
        if (!this.state.withdraw) {
            this.refs.toast.show(I18nJs.t('point.exchange.noPoint'))
            return;
        }
        if (!this.state.remark) {
            this.refs.toast.show(I18nJs.t('point.exchange.noRemark'))
            return;
        }

        const {applyPointWithdraw} = this.props
        let params = {
            token: this.props.user.userInfo.token,
            point: this.state.withdraw,
            remark: this.state.remark
        }
        applyPointWithdraw(params, (result) => {
            if (result) {
                this.refs.toast.show(I18nJs.t('point.exchange.tipApplySuccess'))
                DeviceEventEmitter.emit('Refresh_Dashboard')
                NavigationUtil.goPage({}, 'Dashboard')
            } else {
                console.log(this.props)
                this.refs.toast.show(I18nJs.t('syserr.' + this.props.point.error))
            }
        })
    }

    render() {
        let statusBar = {backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('point.exchange.title')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
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
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    flexDirection: 'row',
                    marginTop: 20,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View>
                        <Text style={{fontSize: 18}}>{I18nJs.t('point.currentPoint')}</Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                        <Text style={{fontSize: 18, color: '#3679ff'}}>{this.state.pointBalance}</Text>
                    </View>
                </View>
                <View style={{
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    flexDirection: 'row',
                    padding: 10,
                    marginTop: 20
                }}>
                    <View style={{
                        justifyContent: 'flex-end'
                    }}>
                        <Text style={{fontSize: 18}}>{I18nJs.t('point.exchange.pointWithdraw')}</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        padding: 0,
                        marginLeft: 10,
                        justifyContent: 'flex-end'
                    }}>
                        <TextInput
                            style={{
                                borderBottomWidth: 0.5,
                                marginBottom: 0,
                                paddingBottom: 0,
                                fontSize: 24,
                                color: '#3679ff'
                            }}
                            value={this.state.withdraw.toString()}
                            onChangeText={(withdraw) => this.setState({withdraw})}
                        />
                    </View>
                    <View style={{
                        justifyContent: 'flex-end',
                        margin: 0,
                        padding: 0
                    }}>
                        <TouchButton
                            style={{margin: 0}}
                            label={I18nJs.t('point.exchange.takeAll')}
                            touchFunction={() => {
                                this.setState({
                                    withdraw: this.state.pointBalance,
                                })
                            }}
                        />
                    </View>
                </View>
                <View style={{
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    flexDirection: 'row',
                    padding: 10,
                    marginTop: 20
                }}>
                    <View style={{
                        flex: 1,
                        height: this.state.height - 450
                    }}>
                        <Textarea
                            style={{
                                borderWidth: 0.5,
                                fontSize: 18,
                                height: this.state.height - 450,
                                padding: 10
                            }}
                            placeholder={I18nJs.t('point.exchange.withdrawRemark')}
                            onChangeText={(remark) => this.setState({remark})}
                        />
                    </View>
                </View>
                <TouchButton
                    label={I18nJs.t('point.exchange.btWithdraw')}
                    touchFunction={() => {
                        this._withdraw()
                    }}
                />
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
    statistic: state.statistic,
    point: state.point
})

const mapDispatchToProps = dispatch => ({
    applyPointWithdraw: (params, callback) => dispatch(actions.applyPointWithdraw(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(PointExchangePage)