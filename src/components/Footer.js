import React from 'react';
import { Link } from 'react-router';
import SvgIcon from './SvgIcon'

export default function Footer() {
	
	return (
		<div className="footer">
			<div className="footer__left">
				<div className="footer__link-list-container">
					<div className="footer__link-list">
						<h5 className="footer__link-list__title">Explore</h5>
						<h5 className="footer__link-list__link"><Link to={'/search/#states'}>States</Link></h5>
						<h5 className="footer__link-list__link"><Link to={'/search/#institutions'}>Institutions</Link></h5>
						<h5 className="footer__link-list__link"><Link to={'/search/#indicators'}>Indicators</Link></h5>
					</div>
					<div className="footer__link-list">
						<h5 className="footer__link-list__title">About</h5>
						<h5 className="footer__link-list__link"><Link to={'/download'}>Data Download</Link></h5>
						<h5 className="footer__link-list__link"><Link to={'/'}>Methodology</Link></h5>
					</div>
				</div>
			</div>
			<div className="footer__right">
				<div className="footer__icons">
					<div className="footer__icons__left">
						<a href='https://www.newamerica.org/education-policy/'>
							<SvgIcon name='na-ed-policy' />
						</a>
					</div>
					<div className="footer__icons__right">
						<a href='https://www.facebook.com/NewAmericaEd/'>
							<SvgIcon name='facebook' />
						</a>
						<a href='https://twitter.com/newamericaed?lang=en'>
							<SvgIcon name='twitter' />
						</a>
					</div>
				</div>
				<p className="footer__license">This site carries a Creative Commons (CC BY 4.0) license, which permits re-use of New America content when proper attribution is provided.</p>
				<p className="footer__last-updated"><span className="footer__last-updated__label">Last Updated:</span></p>
			</div>
		
		</div>
	)
}