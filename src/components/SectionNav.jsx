'use strict';

import React from 'react';
import { Link } from 'react-router';

import SvgIcon from './SvgIcon'

export default function SectionNav(props) {
	let sections;

	if (props.type == "indicator") {
		sections = (
		<div className="section-nav__items">
			<a href='#about'>
				<div className="section-nav__item">
					<SvgIcon name='students' />
					<h3 className="section-nav__item__text">About</h3>
				</div>
			</a>
			<a href='#rankings'>
				<div className="section-nav__item">
					<SvgIcon name='loans' />
					<h3 className="section-nav__item__text">Rankings</h3>
				</div>
			</a>
			<a href='#trends'>
				<div className="section-nav__item">
					<SvgIcon name='grants' />
					<h3 className="section-nav__item__text">Trends</h3>
				</div>
			</a>
		</div>
		);
	} else {
		sections = (
		<div className="section-nav__items">
			<a href='#students'>
				<div className="section-nav__item">
					<SvgIcon name='students' />
					<h3 className="section-nav__item__text">Students</h3>
				</div>
			</a>
			<a href='#loans'>
				<div className="section-nav__item">
					<SvgIcon name='loans' />
					<h3 className="section-nav__item__text">Loans</h3>
				</div>
			</a>
			<a href='#grants'>
				<div className="section-nav__item">
					<SvgIcon name='grants' />
					<h3 className="section-nav__item__text">Grants</h3>
				</div>
			</a>
			<a href='#schools'>
				<div className="section-nav__item">
					<SvgIcon name='books' />
					<h3 className="section-nav__item__text">Schools</h3>
				</div>
			</a>
			<a href='#outcomes'>
				<div className="section-nav__item">
					<SvgIcon name='outcomes' />
					<h3 className="section-nav__item__text">Outcomes</h3>
				</div>
			</a>
		</div>
		);
	}
	return (
    	<div className="section-nav">
    		{sections}
    	</div>
    );
}
