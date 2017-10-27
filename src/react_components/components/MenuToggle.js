import React from 'react';

export default class MenuToggle extends React.Component {
	constructor(props) {
        super(props);
        this.state = {active: false};
    }

    click() {
        this.setState({active: !this.state.active});
    }
    
	render() {
		let classes = 'icon icon__menu-toggle';
		classes += this.state.active ? " active" : "";

		return (
			<button className={classes} type="button" onClick={this.click.bind(this)}>
				<span className="bar"></span>
			</button>
		  )
	}
}