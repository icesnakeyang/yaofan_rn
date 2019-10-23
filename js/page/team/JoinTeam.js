import React, {Component} from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    Dimensions, FlatList
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import Ionicons from 'react-native-vector-icons/Ionicons'
import actions from "../../action";
import InputRow from "../../common/component/InputRow";
import NavigationUtil from "../../navigator/NavigationUtil";

class JoinTeam extends Component {
    constructor(props) {
        super(props);
        const {height, width} = Dimensions.get('window')
        this.state = {
            height: height,
            width: width,
            searchKey: '',
            teamList: []
        }
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    _renderItem(data) {
        console.log(data)
        return (
            <InputRow
                label={data.item.teamName}
                content={data.item.managerName}
                showLabel={true}
                touchFunction={() => {
                    console.log(data.item.teamId)
                    NavigationUtil.goPage({teamId: data.item.teamId}, 'ApplyTeam')
                }}
            />
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
                flex: 1,
                backgroundColor: this.props.theme.color.THEME_BACK_COLOR
            }}>
                {navigationBar}
                <View style={{
                    flexDirection: 'row',
                    margin: 10
                }}
                >
                    <View style={{}}>
                        <TextInput
                            style={{
                                width: this.state.width - 70,
                                borderWidth: 1,
                                borderColor: this.props.theme.color.THEME_BUTTON_COLOR,
                                paddingLeft: 10
                            }}
                            placeholder={I18nJs.t('team.searchHolder')}
                            onChangeText={(searchKey) => this.setState({searchKey})}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: this.props.theme.color.THEME_BUTTON_COLOR,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 50
                        }}
                        onPress={() => {
                            console.log(this.state)
                            const {searchTeam} = this.props
                            let params = {
                                name: this.state.searchKey,
                                token: this.props.user.userInfo.token
                            }
                            searchTeam(params, (result) => {
                                console.log(result)
                                if (result) {
                                    console.log(this.props)
                                    this.setState({
                                        teamList: this.props.team.teams
                                    })
                                }
                            })
                        }}
                    >
                        <Ionicons
                            name={'ios-search'}
                            size={36}
                            style={{color: this.props.theme.color.THEME_BUTTON_TEXT}}
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    <FlatList
                        data={this.state.teamList}
                        renderItem={(item) => (this._renderItem(item))}
                    />
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
    searchTeam: (params, callback) => dispatch(actions.searchTeam(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinTeam)