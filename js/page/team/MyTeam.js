import React, {Component} from 'react'
import {
    View
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import TouchButton from "../../common/component/TouchButton";
import NavigationUtil from "../../navigator/NavigationUtil";

class MyTeam extends Component {
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
                title={I18nJs.t('team.myTeam')}
                statusBar={statusBar}
                style={{
                    backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
                }}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <TouchButton
                    label={I18nJs.t('team.joinTeam')}
                    touchFunction={()=>{
                        NavigationUtil.goPage({},'JoinTeam')
                    }}
                />
                <TouchButton
                    label={I18nJs.t('team.createTeam')}
                    touchFunction={()=>{
                        NavigationUtil.goPage({}, 'CreateTeam')
                    }}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user
})

export default connect(mapStateToProps)(MyTeam)