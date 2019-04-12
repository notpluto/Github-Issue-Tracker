import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from  './Header'
import Card from './Card'
import Loading from './Loading'


class App extends Component {
	state ={
		value: '',
		page: 1,
		loading: true,
	}

	handleInputValue =(e) => {
		this.setState({value: e.target.value})
	}

	componentDidMount() {
		this.fetchData()
	}

	fetchData = () => {
		console.log(this.state.page)
		fetch(`https://api.github.com/repos/${this.state.value ? this.state.value.toLowerCase() : 'google/googletest'}/issues?page=${this.state.page}`).then(res => res.json()).then(data => {
			if(data.length) {
				this.props.dispatch({type: 'ADD_DATA', payload: data.map(v => ({...v, isClicked: false}))})
			} else {
				this.props.dispatch({type: 'ADD_DATA', payload: []})
			}
			this.setState({loading: false})
		})
	}

	handleClick = (e) => {
		this.setState({page: 1, loading: true, value: ''})
		if(this.state.value !== '') {
			this.fetchData()
		}

	}

	incrementPage = () => {
		this.setState({page: ++this.state.page, loading: true});
		this.fetchData()
	}

	decrementPage = () => {
		if(this.state.page > 1) {
			console.log('decrement')
			this.setState({page: this.state.page - 1, loading: true})
			this.fetchData()
		}
		console.log('no decrement')
	}

	handleEnter = (e) => {
		if(e.key === 'Enter') {
			this.handleClick()
		}
	}

  render() {
    return (
			<React.Fragment>
				<Header enter={this.handleEnter} inputValue={this.state.value} funct={this.handleInputValue} click={this.handleClick}/>
				{
					(this.state.loading) ? <Loading /> :
					(
						<>
      				<Card inputValue={this.state.value} increment={this.incrementPage} decrement={this.decrementPage}data={this.props.defaultArray}/>
      			</>
 					)
				}
  		</React.Fragment>
	  )
	}
}

function mapStateToProps(state) {
	return {	
		defaultArray: state.Issues,
		queriedArray: state.QueryIssues,
	}
}

export default connect(mapStateToProps)(App);
