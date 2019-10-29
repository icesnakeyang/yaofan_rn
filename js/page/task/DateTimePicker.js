import React, {Component} from 'react'
import {
    View,
    Dimensions,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native'
import DatePicker from "react-native-datepicker";

import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationUtil from "../../navigator/NavigationUtil";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";

class DateTimePicker extends Component {
    constructor(props) {
        super(props);
        let {height, width} = Dimensions.get('window')
        this.state = {
            param: '',
            value: '',
            width: width
        }
    }

    componentDidMount() {
        this.loadAllData()
    }

    loadAllData() {

    }


    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    GetRightButton() {
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{padding: 5, paddingRight: 8}}>
                    <TouchableOpacity
                        onPress={() => {
                            this._setTime()
                        }}
                    >
                        <Ionicons
                            name={'ios-checkmark'}
                            size={26}
                            style={{color: this.props.theme.color.THEME_HEAD_TEXT}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _setTime() {
        if (this.state.value) {
            NavigationUtil.goPage({endTime: this.state.value}, 'NewTask')
        } else {
        }
        return
        DeviceEventEmitter.emit('refresh_key_detail')

    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                statusBar={statusBar}
                title={I18nJs.t('tasks.setEndTime')}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.GetRightButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <View style={{marginTop: 20, margin: 10}}>
                    <DatePicker
                        style={{width: this.state.width}}
                        date={this.state.value}
                        mode='datetime'
                        placeholder={I18nJs.t('tasks.setEndTimeHolder')}
                        format="YYYY-MM-DD HH:mm"
                        confirmBtnText="confirm"
                        cancelBtnText="cancel"
                        onDateChange={(value) => {
                            this.setState({value})
                        }}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(DateTimePicker)