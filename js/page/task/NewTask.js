import React, {Component} from 'react'
import {
    View,
    Text,
    Dimensions,
    TextInput
} from 'react-native'
import Textarea from 'react-native-textarea'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import InputRow from "../../common/component/InputRow";
import NavigationUtil from "../../navigator/NavigationUtil";

class NewTask extends Component {
    constructor(props) {
        super(props);
        let {height, width} = Dimensions.get('window')
        this.state = {
            editDetail: '',
            title: '',
            height: height,
            width: width,
            endTime: ''
        }
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    _showData() {
        console.log('show')
        let showData = {
            endTime: ''
        }
        if (this.props.navigation.state.params && this.props.navigation.state.params.endTime) {
            this.setState({
                endTime: this.props.navigation.state.params.endTime
            })
        }
        return showData
    }

    render() {
        console.log(this.props)

        let statusBar = {
            backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('tasks.newTask')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View style={{flex: 1, backgroundColor: this.props.theme.color.THEME_BACK_COLOR}}>
                {navigationBar}
                <View style={{
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    marginTop: 20,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TextInput
                        style={{fontSize: 18}}
                        placeholder={I18nJs.t('tasks.taskTitleHolder')}
                        onChangeText={(title) => this.setState({title})}
                    />
                </View>
                <View style={{
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    marginTop: 20,
                    height: this.state.height - 400
                }}>
                    <Textarea
                        style={{padding: 10, fontSize: 16}}
                        placeholder={I18nJs.t('tasks.taskDetailHolder')}
                        onChangeText={(editDetail) => this.setState({editDetail})}
                    ></Textarea>
                </View>
                <View>
                    <InputRow
                        touchFunction={() => {
                            NavigationUtil.goPage({}, 'DateTimePicker')
                        }}
                        label={I18nJs.t('tasks.setEndTime')}
                        content={this.props.navigation.state.params.endTime}
                        showLabel={true}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user
})

export default connect(mapStateToProps)(NewTask)