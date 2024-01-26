import TemplehsUtils from 'src/@templehs/utils';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'src/app/configs/settingsConfig';
import { TemplehsRouteConfigsType, TemplehsRoutesType } from 'src/@templehs/utils/TemplehsUtils';
import SignInConfig from '../pages/sign-in/SignInConfig';
import SignUpConfig from '../pages/sign-up/SignUpConfig';
import SignOutConfig from '../pages/sign-out/SignOutConfig';
import Error404Page from '../pages/404/Error404Page';
import AppsConfigs from '../pages/appsConfigs';
import TemplehsLoading from '@templehs/core/TemplehsLoading/TemplehsLoading';

const routeConfigs: TemplehsRouteConfigsType = [
	SignOutConfig,
	SignInConfig,
	SignUpConfig,
	...AppsConfigs,
];

/**
 * The routes of the application.
 */
const routes: TemplehsRoutesType = [
	...TemplehsUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to="/doctors" />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: 'loading',
		element: <TemplehsLoading />
	},
	{
		path: '404',
		element: <Error404Page />
	},
	{
		path: '*',
		element: <Navigate to="404" />
	}
];

export default routes;
