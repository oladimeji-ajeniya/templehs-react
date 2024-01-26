import layout1 from './layout1/Layout1';

/**
 * The type definition for the theme layouts.
 */
export type themeLayoutsType = {
	[key: string]: React.ComponentType;
};

/**
 * The theme layouts.
 */
const themeLayouts: themeLayoutsType = {
	layout1
};

export default themeLayouts;
