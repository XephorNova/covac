import React from "react";
import Select from "@chakra-ui/react";
import _ from "lodash";

class DropDownComponent extends React.Component {
    renderOptions() {
        return _.forEach(this.props.options, (value, label) => {
            return <option value={value}>{label}</option>;
        });
    }
    render() {
        console.log(this.props.options);
        return (
            <Select onChange={this.props.onChange}>
                {this.renderOptions()}
            </Select>
        );
    }
}

export default DropDownComponent;
