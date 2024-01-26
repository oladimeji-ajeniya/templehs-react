import { useDeepCompareEffect } from 'src/@templehs/hooks';
import { TemplehsSettingsConfigType } from 'src/@templehs/core/TemplehsSettings/TemplehsSettings';
import _ from '@lodash';
import AppContext from 'src/app/AppContext';
import {
	generateSettings,
	selectTemplehsCurrentSettings,
	selectTemplehsDefaultSettings,
	setSettings
} from 'src/app/store/templehs/settingsSlice';
import { memo, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { matchRoutes, useLocation, RouteMatch, RouteObject } from 'react-router-dom';
import { themeLayoutsType } from 'src/app/theme-layouts/themeLayouts';
import { PartialDeep } from 'type-fest';

export type TemplehsRouteObjectType = RouteObject & {
	settings?: TemplehsSettingsConfigType;
};

export type TemplehsRouteMatchType = RouteMatch & {
	route: TemplehsRouteObjectType;
};

type TemplehsLayoutProps = {
	layouts: themeLayoutsType;
};

/**
 * TemplehsLayout
 * React frontend component in a React project that is used for layouting the user interface. The component
 * handles generating user interface settings related to current routes, merged with default settings, and uses
 * the new settings to generate layouts.
 */
function TemplehsLayout(props: TemplehsLayoutProps) {
	const { layouts, ...restProps } = props;
	const dispatch = useAppDispatch();
	const settings = useAppSelector(selectTemplehsCurrentSettings);
	const defaultSettings = useAppSelector(selectTemplehsDefaultSettings);

	const appContext = useContext(AppContext);
	const { routes } = appContext;

	const location = useLocation();
	const { pathname } = location;

	const matchedRoutes = matchRoutes(routes, pathname) as TemplehsRouteMatchType[] | null;

	const matched = matchedRoutes?.[0] || false;

	const newSettings = useRef<PartialDeep<TemplehsSettingsConfigType>>({});

	const shouldAwaitRender = useCallback(() => {
		let _newSettings: TemplehsSettingsConfigType;

		/**
		 * On Path changed
		 */
		// if (prevPathname !== pathname) {
		if (typeof matched !== 'boolean') {
			/**
			 * if matched route has settings
			 */

			const routeSettings = matched.route.settings;

			_newSettings = generateSettings(defaultSettings, routeSettings);
		} else if (!_.isEqual(newSettings.current, defaultSettings)) {
			/**
			 * Reset to default settings on the new path
			 */
			_newSettings = _.merge({}, defaultSettings);
		} else {
			_newSettings = newSettings.current as TemplehsSettingsConfigType;
		}

		if (!_.isEqual(newSettings.current, _newSettings)) {
			newSettings.current = _newSettings;
		}
	}, [defaultSettings, matched]);

	shouldAwaitRender();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	useDeepCompareEffect(() => {
		if (!_.isEqual(newSettings.current, settings)) {
			dispatch(setSettings(newSettings.current as TemplehsSettingsConfigType));
		}
	}, [dispatch, newSettings.current, settings]);

	// console.warn('::TemplehsLayout:: rendered');
	const Layout = useMemo(() => layouts[settings.layout.style], [layouts, settings.layout.style]);

	return _.isEqual(newSettings.current, settings) ? <Layout {...restProps} /> : null;
}

export default memo(TemplehsLayout);
