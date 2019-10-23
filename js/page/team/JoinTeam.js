import React, {Component} from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import Ionicons from 'react-native-vector-icons/Ionicons'

class JoinTeam extends Component {
    constructor(props) {
        super(props);
        const {height, width} = Dimensions.get('window')
        this.state = {
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
                title={I18nJs.t('team.joinTeam')}
                statusBar={statusBar}
                style={{
                    backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
                }}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View style={{
                flex:1,
                backgroundColor: this.props.theme.color.THEME_BACK_COLOR
            }}>
                {navigationBar}
                <View style={{
                    flexDirection: 'row',
                    margin:10
                }}
                >
                    <View style={{}}>
                        <TextInput
                            style={{
                                width: this.state.width - 70,
                                borderWidth:1,
                                borderColor:this.props.theme.color.THEME_BUTTON_COLOR,
                                paddingLeft:10
                            }}
                            placeholder={I18nJs.t('team.searchHolder')}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: this.props.theme.color.THEME_BUTTON_COLOR,
                            alignItems:'center',
                            justifyContent:'center',
                            width: 50
                        }}
                    >
                        <Ionicons
                            name={'ios-search'}
                            size={36}
                            style={{color:this.props.theme.color.THEME_BUTTON_TEXT}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user
})

export default connect(mapStateToProps)(JoinTeam)