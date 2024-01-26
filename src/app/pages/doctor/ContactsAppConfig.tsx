import lazyWithReducer from 'src/app/store/lazyWithReducer';
import ContactView from './doctor/ContactView';
import reducer from './store';

const ContactsApp = lazyWithReducer('contactsApp', () => import('./ContactsApp'), reducer);

/**
 * The ContactsApp configuration.
 */
const ContactsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'doctors',
			element: <ContactsApp />,
			children: [
				{
					path: ':id',
					element: <ContactView />
				},
			]
		}
	]
};

export default ContactsAppConfig;
