import { SxProps } from '@mui/system';
import { TemplehsNavigationType } from './TemplehsNavigationType';
import { TemplehsNavBadgeType } from './TemplehsNavBadgeType';

/**
 * TemplehsNavItemType
 * A type for Templehs navigation item and its properties.
 */
export type TemplehsNavItemType = {
	id: string;
	title?: string;
	translate?: string;
	auth?: string[] | string;
	subtitle?: string;
	icon?: string;
	iconClass?: string;
	url?: string;
	target?: string;
	type?: string;
	sx?: SxProps;
	disabled?: boolean;
	active?: boolean;
	exact?: boolean;
	end?: boolean;
	badge?: TemplehsNavBadgeType;
	children?: TemplehsNavigationType;
	hasPermission?: boolean;
};
