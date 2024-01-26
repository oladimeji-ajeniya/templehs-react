import { TemplehsRouteConfigType } from 'src/@templehs/utils/TemplehsUtils';
import SignUpPage from './SignUpPage';
import authRoles from '../../auth/authRoles';

const SignUpConfig: TemplehsRouteConfigType = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: 'sign-up',
			element: <SignUpPage />
		}
	]
};

export default SignUpConfig;
