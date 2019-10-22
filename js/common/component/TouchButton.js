import React, {Component} from 'react'
import {
    Text,
    TouchableOpacity,
    View
} from "react-native";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class TouchButton extends Component {
    static propTypes = {
        touchFunction: PropTypes.func,
        label: PropTypes.string
    }

    render() {
        return (
            <View style={{marginTop: 10}}>
                {this._generateRow()}
            </View>
        )
    }

    _generateRow() {
        // if (this.props.showLabel) {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: this.props.theme.color.THEME_BUTTON_COLOR,
                    height: 35,
                    justifyContent:'center',
                    alignItems:'center',
                    margin:10
                }}
                onPress={this.props.touchFunction}
            >
                <View>
                    <Text style={{fontSize:14, color:this.props.theme.color.THEME_BUTTON_TEXT}}>{this.props.label}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

export default connect(mapStateToProps)(TouchButton)