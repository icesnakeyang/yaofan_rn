import React, {Component} from 'react'
import {
    View,
    TouchableOpacity,
    TextInput
} from 'react-native'
import GetLeftButton from "../../common/component/GetLeftButton";
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import {connect} from "react-redux";
import NavigationUtil from "../../navigator/NavigationUtil";

class TaskPoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            point: '',
            editPoint: ''
        }
    }

    componentDidMount() {
        console.log('mount')
        this._loadAllData()
    }

    _loadAllData() {
        console.log('load data')
        console.log(this.props)
        if (this.props.navigation.state.params.point) {
            this.setState({
                point: this.props.navigation.state.params.point,
                editPoint: this.props.navigation.state.params.point
            })
        }
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    getRightButton() {
        return (
            <View>
                <TouchableOpacity
                    style={{margin: 5, marginRight: 8}}
                    onPress={() => {
                        console.log(this.state)
                        NavigationUtil.goPage({point: this.state.editPoint}, 'NewTask')
                    }}
                >
                    <Ionicons
                        name={'ios-checkmark'}
                        size={36}
                        style={{color: this.props.theme.color.THEME_HEAD_TEXT}}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        console.log(this.state)
        let statusBar = {
            backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('tasks.point')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View style={{
                flex:1,
                backgroundColor:this.props.theme.color.THEME_BACK_COLOR
            }}>
                {navigationBar}
                <View style={{
                    backgroundColor:this.props.theme.color.THEME_ROW_COLOR,
                    marginTop:20,
                    height:50,
                    justifyContent:'center',
                    paddingLeft:20
                }}>
                    <TextInput
                        placeholder={I18nJs.t('tasks.point')}
                        defaultValue={this.state.point}
                        onChangeText={(editPoint) => this.setState({editPoint})}
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

export default connect(mapStateToProps)(TaskPoint)