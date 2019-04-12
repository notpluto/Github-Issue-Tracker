import React from 'react';

class Header extends React.Component {

	render (){
		return (
			<header className="primary-header">
				<div className="logo">
					<h1>github issue tracker</h1>
					<a href="#"><img src="" alt="site logo"/></a>
				</div>
				<div className="input-box">
					<input type='text' value={this.props.inputValue}onKeyPress={this.props.enter} onChange={this.props.funct} placeholder="Add username and repo name to search an issue" />
					<button onClick={this.props.click}>search</button>
				</div>
			</header>
		)
	}
}

export default Header;