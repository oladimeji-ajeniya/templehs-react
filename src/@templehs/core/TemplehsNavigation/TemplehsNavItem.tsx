import { TemplehsNavItemType } from './types/TemplehsNavItemType';

const components: { [key: string]: React.FC<unknown> } = {};

/**
 * Register a component to TemplehsNavItem.
 */
export function registerComponent<T = unknown>(name: string, Component: React.FC<T>) {
	components[name] = Component as React.FC<unknown>;
}

export type TemplehsNavItemComponentProps = {
	type: string;
	item: TemplehsNavItemType;
	dense?: boolean;
	nestedLevel?: number;
	onItemClick?: (T: TemplehsNavItemType) => void;
	checkPermission?: boolean;
};

/**
Component to render NavItem depending on its type.
*/
export default function TemplehsNavItem(props: TemplehsNavItemComponentProps) {
	const { type } = props;

	const C = components[type];

	return C ? <C {...(props as object)} /> : null;
}
