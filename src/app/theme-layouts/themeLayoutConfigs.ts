import layout1, { Layout1ConfigDefaultsType } from './layout1/Layout1Config';

/**
 * The type definition for the theme layout defaults.
 */
export type themeLayoutDefaultsProps = Layout1ConfigDefaultsType

/**
 * The type definition for the theme layout.
 */
export type themeLayoutProps = {
	title: string;
	defaults: themeLayoutDefaultsProps;
};

/**
 * The type definition for the theme layout configs.
 */
export type themeLayoutConfigsProps = {
	[key: string]: themeLayoutProps;
};

/**
 * The theme layout configs.
 */
const themeLayoutConfigs: themeLayoutConfigsProps = {
	layout1: layout1 as themeLayoutProps
};

export default themeLayoutConfigs;
