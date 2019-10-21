import React, {Component} from 'react'
import {
    View,
    Text,
    Dimensions
} from 'react-native'
import Textarea from 'react-native-textarea'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";

class NewTask extends Component {
    constructor(props) {
        super(props);
        let {height, width} = Dimensions.get('window')
        this.state = {
            editDetail: '',
            title: '',
            height: height,
            width: width
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
                title={I18nJs.t('tasks.newTask')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View style={{flex: 1}}>
                {navigationBar}
                <View>
                    <Text>标题</Text>
                </View>
                <View>
                    <Text>发布时间</Text>
                </View>
                <View>
                    <Textarea
                        containerStyle={{
                            backgroundColor: '#ffff00',
                            fontSize: 24,
                            paddingLeft: 10,
                            paddingRight: 10
                        }}
                        onChangeText={(editDetail) => this.setState({editDetail})}
                    ></Textarea>
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
