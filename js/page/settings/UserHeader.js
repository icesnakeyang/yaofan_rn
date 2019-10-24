import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationUtil from "../../navigator/NavigationUtil";
import moment from 'moment'
import {I18nJs} from "../../language/I18n";
import {connect} from "react-redux";

class UserHeader extends Component {
    constructor(props) {
        super(props);
    }

    _renderData() {
        console.log(this.props)
        let renderData = {
            userName: I18nJs.t('settings.guest'),
            createTime: '-'
        }
        if (this.props.user.userInfo && this.props.user.userInfo.name) {
            renderData.userName = this.props.user.userInfo.name
        }
        if (this.props.user.userInfo && this.props.user.userInfo.createTime) {
            renderData.createTime = moment(this.props.user.userInfo.createTime).format('YYYY-MM-DD')
        }
        return renderData

    }

    render() {
        const renderData = this._renderData()
        return (
            <View
                style={{marginTop: 20, backgroundColor: this.props.theme.color.THEME_ROW_COLOR, height: 50}}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row'
                    }}
                    onPress={() => {
                        NavigationUtil.goPage({}, 'MyAccount')
                    }}
                >
                    <View style={{marginLeft: 50}}>
                        <Ionicons
                            name={'ios-contact'}
                            size={48}
                            style={{color: this.props.theme.color.THEME_TAB_ICON_COLOR}}
                        />
                    </View>
                    <View style={{justifyContent: 'center', marginLeft: 20}}>
                        <View>
                            <Text style={{fontSize: 18}}>{renderData.userName}</Text>
                        </View>
                        <View>
                            <Text style={{fontSize: 10}}>{renderData.createTime}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user
})

export default connect(mapStateToProps)(UserHeader)