import lazyWithReducer from 'src/app/store/lazyWithReducer';
import reducer from './store';

const CalendarApp = lazyWithReducer('calendarApp', () => import('./CalendarApp'), reducer);

/**
 * The Calendar App Config.
 */
const CalendarAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'calendar',
			element: <CalendarApp />
		}
	]
};

export default CalendarAppConfig;
