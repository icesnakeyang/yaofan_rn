import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {connect} from "react-redux";
import actions from "../../action";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        this._loadAllData()
    }

    _loadAllData() {
        const {loadDashboard} = this.props
        let params = {
            token: this.props.user.userInfo.token
        }
        loadDashboard(params, (result) => {
            console.log(result)
            if (result) {
                console.log(this.props)
                this.setState({
                    data: {
                        currentPoint: this.props.statistic.data.currentPoint,
                        totalPointIn: this.props.statistic.data.pointIn,
                        totalPointOut: this.props.statistic.data.pointOut,
                        countTask: this.props.statistic.data.countTask
                    }
                })
            }
        })
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    _showData() {
        let showData = {
            isLoading: true
        }

        if (this.state.data) {
            showData.isLoading = false
            console.log(this.state)
        }
        return showData
    }

    render() {
        const showData = this._showData()
        let statusBar = {backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('point.title')}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                statusBar={statusBar}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View style={{flex: 1, backgroundColor: this.props.theme.color.THEME_BACK_COLOR}}>
                {navigationBar}
                {showData.isLoading ?
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text>{I18nJs.t('loading')}</Text>
                    </View>
                    :
                    <View>
                        <View>
                            <View style={{
                                marginTop: 20,
                                flexDirection: 'row',
                                padding: 10,
                                justifyContent: 'space-around'
                            }}>
                                <View style={{
                                    backgroundColor: '#bb0512',
                                    height: 60,
                                    width: 100,
                                    padding: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color: '#ffffff'
                                            }}>{I18nJs.t('point.currentPoint')}</Text>
                                    </View>
                                    <View>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#ffffff'
                                        }}>{this.state.data.currentPoint}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    backgroundColor: '#a1141a',
                                    height: 60,
                                    width: 100,
                                    padding: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text
                                        style={{fontSize: 16, color: '#ffffff'}}>{I18nJs.t('point.totalPointIn')}</Text>
                                    <Text style={{fontSize: 14, color: '#ffffff'}}>{this.state.data.totalPointIn}</Text>
                                </View>
                                <View style={{
                                    backgroundColor: '#ef8201',
                                    height: 60,
                                    width: 100,
                                    padding: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#ffffff'
                                    }}>{I18nJs.t('point.totalPointOut')}</Text>
                                    <Text
                                        style={{fontSize: 14, color: '#ffffff'}}>{this.state.data.totalPointOut}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={{
                                marginTop: 20,
                                flexDirection: 'row',
                                padding: 10,
                                justifyContent: 'space-around'
                            }}>
                                <View style={{
                                    backgroundColor: '#007abb',
                                    height: 60,
                                    width: 100,
                                    padding: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color: '#ffffff'
                                            }}>{I18nJs.t('point.countTask')}</Text>
                                    </View>
                                    <View>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#ffffff'
                                        }}>{this.state.data.countTask}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    backgroundColor: '#4e638e',
                                    height: 60,
                                    width: 100,
                                    padding: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text
                                        style={{fontSize: 16, color: '#ffffff'}}>{I18nJs.t('point.completeTask')}</Text>
                                    <Text style={{fontSize: 14, color: '#ffffff'}}>{this.state.data.totalPointIn}</Text>
                                </View>
                                <View style={{
                                    backgroundColor: '#7387a2',
                                    height: 60,
                                    width: 100,
                                    padding: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#ffffff'
                                    }}>{I18nJs.t('point.progressTask')}</Text>
                                    <Text
                                        style={{fontSize: 14, color: '#ffffff'}}>{this.state.data.totalPointOut}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user,
    statistic: state.statistic
})

const mapDispatchToProps = dispatch => ({
    loadDashboard: (params, callback) => dispatch(actions.loadDashboard(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

