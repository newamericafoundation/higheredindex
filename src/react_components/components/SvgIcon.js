import React from 'react';

export default function SvgIcon(props) {
	const {name} = props;

	var Icon = require('../../static/img/svg/' + name + '.svg');
	return (<Icon className={'icon icon__' + name} />)
}