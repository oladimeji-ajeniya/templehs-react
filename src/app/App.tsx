import '@mock-api';
import BrowserRouter from 'src/@templehs/core/BrowserRouter';
import TemplehsLayout from 'src/@templehs/core/TemplehsLayout';
import TemplehsTheme from 'src/@templehs/core/TemplehsTheme';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache, { Options } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { selectCurrentLanguageDirection } from 'src/app/store/i18nSlice';
import { selectUserRole } from 'src/app/store/user/userSlice';
import themeLayouts from 'src/app/theme-layouts/themeLayouts';
import { selectMainTheme } from 'src/app/store/templehs/settingsSlice';
import TemplehsAuthorization from 'src/@templehs/core/TemplehsAuthorization';
import settingsConfig from 'src/app/configs/settingsConfig';
import { useAppSelector } from 'src/app/store';
import withAppProviders from './withAppProviders';
import { AuthProvider } from './auth/AuthContext';

// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const emotionCacheOptions = {
	rtl: {
		key: 'muirtl',
		stylisPlugins: [rtlPlugin],
		insertionPoint: document.getElementById('emotion-insertion-point')
	},
	ltr: {
		key: 'muiltr',
		stylisPlugins: [],
		insertionPoint: document.getElementById('emotion-insertion-point')
	}
};

/**
 * The main App component.
 */
function App() {
	/**
	 * The user object from the Redux store.
	 */
	const userRole = useAppSelector(selectUserRole);

	/**
	 * The language direction from the Redux store.
	 */
	const langDirection = useSelector(selectCurrentLanguageDirection);

	/**
	 * The main theme from the Redux store.
	 */
	const mainTheme = useSelector(selectMainTheme);

	return (
		<CacheProvider value={createCache(emotionCacheOptions[langDirection] as Options)}>
			<TemplehsTheme
				theme={mainTheme}
				direction={langDirection}
			>
				<AuthProvider>
					<BrowserRouter>
						<TemplehsAuthorization
							userRole={userRole}
							loginRedirectUrl={settingsConfig.loginRedirectUrl}
						>
							<SnackbarProvider
								maxSnack={5}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right'
								}}
								classes={{
									containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99'
								}}
							>
								<TemplehsLayout layouts={themeLayouts} />
							</SnackbarProvider>
						</TemplehsAuthorization>
					</BrowserRouter>
				</AuthProvider>
			</TemplehsTheme>
		</CacheProvider>
	);
}

export default withAppProviders(App);
