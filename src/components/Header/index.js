require('./Header.less');
import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Header';
    }
    render() {
        return <header>
        	<div className="logo">Logo</div>
        </header>;
    }
}

export default Header;
