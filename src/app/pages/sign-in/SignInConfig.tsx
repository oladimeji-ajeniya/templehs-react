import { TemplehsRouteConfigType } from 'src/@templehs/utils/TemplehsUtils';
import SignInPage from './SignInPage';
import authRoles from '../../auth/authRoles';

const SignInConfig: TemplehsRouteConfigType = {
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
			path: 'sign-in',
			element: <SignInPage />
		}
	]
};

export default SignInConfig;
