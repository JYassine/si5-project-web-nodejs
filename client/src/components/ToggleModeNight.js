import React from 'react';
import Toggle from 'react-toggle';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'react-toggle/style.css';
import './ToggleModeNight.scss';

export const ToggleModeNight = ({ mode, onChange }) => (
	<div className="ToggleModeNight">

		{console.log("toogle" + mode)}
		<Toggle
			id="mode"
			icons={{
				checked: (
					<FontAwesomeIcon icon={faMoon} className="fa faMoon" />
				),
				unchecked: (
					<FontAwesomeIcon icon={faSun} className="fa faSun" />
				),
			}}
			defaultChecked={mode}
			onChange={onChange}
		/>

	</div>
);
