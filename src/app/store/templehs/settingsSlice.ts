import { createTheme, getContrastRatio } from '@mui/material/styles';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from '@lodash';
import {
	defaultSettings,
	defaultThemeOptions,
	extendThemeWithMixins,
	getParsedQuerySettings,
	mustHaveThemeOptions
} from 'src/@templehs/default-settings';
import settingsConfig from 'src/app/configs/settingsConfig';
import themeLayoutConfigs from 'src/app/theme-layouts/themeLayoutConfigs';
import { setUser } from 'src/app/store/user/userSlice';
import { darkPaletteText, lightPaletteText } from 'src/app/configs/themesConfig';
import { RootStateType, AppThunkType } from 'src/app/store/types';
import { TemplehsSettingsConfigType, TemplehsThemeType } from 'src/@templehs/core/TemplehsSettings/TemplehsSettings';
import createAppAsyncThunk from 'src/app/store/createAppAsyncThunk';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import { PartialDeep } from 'type-fest';

type AppRootStateType = RootStateType<settingsSliceType>;

export const changeTemplehsTheme =
	(theme: TemplehsThemeType): AppThunkType<void> =>
	(dispatch, getState) => {
		const AppState = getState() as AppRootStateType;
		const { settings } = AppState.templehs;

		const newSettings: TemplehsSettingsConfigType = {
			...settings.current,
			theme: {
				main: theme,
				navbar: theme,
				toolbar: theme,
				footer: theme
			}
		};

		return dispatch(setDefaultSettings(newSettings));
	};

type layoutProps = {
	style: string;
	config: unknown;
};

/**
 * Gets the initial settings for the application.
 */
function getInitialSettings(): TemplehsSettingsConfigType {
	const defaultLayoutStyle =
		settingsConfig.layout && settingsConfig.layout.style ? settingsConfig.layout.style : 'layout1';

	const layout: layoutProps = {
		style: defaultLayoutStyle,
		config: themeLayoutConfigs[defaultLayoutStyle].defaults
	};

	return _.merge({}, defaultSettings, { layout }, settingsConfig, getParsedQuerySettings());
}

/**
 * Generates the settings object by merging the default settings with the new settings.
 */
export function generateSettings(
	_defaultSettings: PartialDeep<TemplehsSettingsConfigType>,
	_newSettings: TemplehsSettingsConfigType
) {
	return _.merge(
		{},
		_defaultSettings,
		{ layout: { config: themeLayoutConfigs[_newSettings?.layout?.style]?.defaults } },
		_newSettings
	);
}

const initialSettings = getInitialSettings();

/**
 * The type definition for the initial state.
 */
type initialStateProps = {
	initial: TemplehsSettingsConfigType;
	defaults: TemplehsSettingsConfigType;
	current: TemplehsSettingsConfigType;
};

/**
 * The initial state.
 */
const initialState: initialStateProps = {
	initial: initialSettings,
	defaults: _.merge({}, initialSettings),
	current: _.merge({}, initialSettings)
};

/**
 * Sets the default settings for the application.
 */
export const setDefaultSettings = createAppAsyncThunk(
	'templehs/settings/setDefaultSettings',
	async (val: PartialDeep<TemplehsSettingsConfigType>, { dispatch, getState }) => {
		const AppState = getState() as AppRootStateType;

		const { settings } = AppState.templehs;

		const defaults = generateSettings(settings.defaults, val as TemplehsSettingsConfigType);
		
		return {
			...settings,
			defaults: _.merge({}, defaults),
			current: _.merge({}, defaults)
		};
	}
);

/**
 * The settings slice.
 */
export const settingsSlice = createSlice({
	name: 'templehs/settings',
	initialState,
	reducers: {
		setSettings: (state, action: PayloadAction<TemplehsSettingsConfigType>) => {
			const current = generateSettings(state.defaults, action.payload);

			return {
				...state,
				current
			};
		},

		setInitialSettings: () => _.merge({}, initialState),
		resetSettings: (state) => ({
			...state,
			defaults: _.merge({}, state.defaults),
			current: _.merge({}, state.defaults)
		})
	},
	extraReducers: (builder) => {
		builder
			.addCase(setDefaultSettings.fulfilled, (state, action) => action.payload)
			.addCase(setUser.fulfilled, (state, action) => {
				const defaults = generateSettings(
					state.defaults,
					action.payload?.data?.settings as TemplehsSettingsConfigType
				);
				return {
					...state,
					defaults: _.merge({}, defaults),
					current: _.merge({}, defaults)
				};
			});
	}
});

type directionType = 'ltr' | 'rtl';

const getDirection = (state: AppRootStateType) => state.templehs.settings.current.direction;
const getMainTheme = (state: AppRootStateType) => state.templehs.settings.current.theme.main;
const getNavbarTheme = (state: AppRootStateType) => state.templehs.settings.current.theme.navbar;
const getToolbarTheme = (state: AppRootStateType) => state.templehs.settings.current.theme.toolbar;
const getFooterTheme = (state: AppRootStateType) => state.templehs.settings.current.theme.footer;

/**
 * Generates the MUI theme object.
 */
function generateMuiTheme(theme: TemplehsThemeType, direction: directionType) {
	const data = _.merge({}, defaultThemeOptions, theme, mustHaveThemeOptions) as ThemeOptions;

	return createTheme(
		_.merge({}, data, {
			mixins: extendThemeWithMixins(data),
			direction
		} as ThemeOptions)
	);
}

/**
 * Selects the contrast theme based on the background color.
 */
export const selectContrastMainTheme = (bgColor: string) => {
	function isDark(color: string) {
		return getContrastRatio(color, '#ffffff') >= 3;
	}
	return isDark(bgColor) ? selectMainThemeDark : selectMainThemeLight;
};

/**
 * Changes the theme mode.
 */
function changeThemeMode(theme: TemplehsThemeType, mode: 'dark' | 'light'): TemplehsThemeType {
	const modes = {
		dark: {
			palette: {
				mode: 'dark',
				divider: 'rgba(241,245,249,.12)',
				background: {
					paper: '#1E2125',
					default: '#121212'
				},
				text: darkPaletteText
			}
		},
		light: {
			palette: {
				mode: 'light',
				divider: '#e2e8f0',
				background: {
					paper: '#FFFFFF',
					default: '#F7F7F7'
				},
				text: lightPaletteText
			}
		}
	};

	return _.merge({}, theme, modes[mode]);
}

export const selectMainTheme = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);

export const selectMainThemeDark = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectMainThemeLight = createSelector([getMainTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectNavbarTheme = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);

export const selectNavbarThemeDark = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectNavbarThemeLight = createSelector([getNavbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectToolbarTheme = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);

export const selectToolbarThemeDark = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectToolbarThemeLight = createSelector([getToolbarTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectFooterTheme = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(theme, direction)
);

export const selectFooterThemeDark = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectFooterThemeLight = createSelector([getFooterTheme, getDirection], (theme, direction) =>
	generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectTemplehsCurrentSettings = (state: AppRootStateType) => state.templehs.settings.current;

export const selectTemplehsCurrentLayoutConfig = (state: AppRootStateType) => state.templehs.settings.current.layout.config;

export const selectTemplehsDefaultSettings = (state: AppRootStateType) => state.templehs.settings.defaults;

export const selectCustomScrollbarsEnabled = (state: AppRootStateType) => state.templehs.settings.current.customScrollbars;

// export const selectTemplehsThemesSettings = (state: RootState) => state.templehs.settings.themes;

export const { resetSettings, setInitialSettings, setSettings } = settingsSlice.actions;

export type settingsSliceType = typeof settingsSlice;

export default settingsSlice.reducer;
