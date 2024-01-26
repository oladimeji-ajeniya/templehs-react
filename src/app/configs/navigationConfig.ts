import i18next from 'i18next';
import en from './navigation-i18n/en';
import { TemplehsNavigationType } from '@templehs/core/TemplehsNavigation/types/TemplehsNavigationType';

i18next.addResourceBundle('en', 'navigation', en);


/**
 * The navigationConfig object is an array of navigation items for the Templehs application.
 */
const navigationConfig: TemplehsNavigationType = [
			{
				id: 'apps.calendar',
				title: 'Calendar',
				type: 'item',
				icon: 'heroicons-outline:calendar',
				url: '/calendar',
				translate: 'CALENDAR'
			},
			{
				id: 'apps.contacts',
				title: 'Doctors',
				type: 'item',
				icon: 'heroicons-outline:user-group',
				url: '/doctors',
				translate: 'Doctors'
			},
		
];

export default navigationConfig;
