import React, {Component} from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {I18nJs} from "../../language/I18n";

class TaskRow extends Component {
    constructor(props) {
        super(props);
        const {height, width} = Dimensions.get('window')
        this.state = {
            height: height,
            width: width
        }
    }

    static propTypes = {
        touchFunction: PropTypes.func,
        title: PropTypes.string,
        endTime: PropTypes.string,
        point: PropTypes.number,
        status: PropTypes.string,
        unRead: PropTypes.number
    }

    render() {
        return (
            <View style={{
                marginTop: 20
            }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                        height: 60,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                    onPress={this.props.touchFunction}
                >
                    <View>
                        <View style={{flexDirection:'row'}}>
                            <View>
                                {this.props.unRead ?
                                    <View style={{
                                        width: 15,
                                        height: 15,
                                        backgroundColor: '#f90c04',
                                        borderRadius: 100,
                                        marginLeft: 5,
                                        marginTop: 0
                                    }}>
                                        <Text style={{
                                            marginLeft:3,
                                            marginTop:-1,
                                            color:'#ffffff'
                                        }}>{this.props.unRead}</Text>
                                    </View>
                                    : null}
                            </View>
                            <View>
                                <Text style={{
                                    marginLeft: 10,
                                    fontSize: 20
                                }}>{this.props.title}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={{marginLeft: 10,}}>
                                <Text style={{fontSize: 12}}>完成时间：</Text>
                            </View>
                            <View>
                                <Text style={{fontSize: 12}}>{this.props.endTime}</Text>
                            </View>
                            <View style={{marginLeft: 20}}>
                                <Text style={{fontSize: 12}}>{I18nJs.t('status.' + this.props.status)}</Text>
                            </View>
                        </View>
                    </View>

                    <View
                        style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text style={{marginRight: 10, fontSize: 20, color: '#ff5a2a'}}>{this.props.point}</Text>
                    </View>
                    <View style={{marginRight: 20, justifyContent: 'center'}}>
                        <Ionicons
                            name={'ios-arrow-forward'}
                            size={20}
                            style={{color: this.props.theme.color.THEME_TAB_ICON_COLOR}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

export default connect(mapStateToProps)(TaskRow)