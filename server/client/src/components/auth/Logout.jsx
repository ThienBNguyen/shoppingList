import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import { logout } from '../../actions/authAction';
class Logout extends Component {
	render() {
		return (
			<Fragment>
				<NavLink onClick={this.props.logout} href="#">
					Logout
				</NavLink>
			</Fragment>
		);
	}
}
export default connect(null, { logout })(Logout);
