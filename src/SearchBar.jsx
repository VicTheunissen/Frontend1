import 'react';
import {Component} from "react";

class SearchBar extends Component {
    render() {
        const {value, onChange, placeholder} = this.props;
        return (
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem'}}
            />
        );
    }
}


SearchBar.defaultProps = {placeholder: 'Search coins...'}

export default SearchBar;