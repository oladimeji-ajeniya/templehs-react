import Divider from '@mui/material/Divider';
import { memo } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import TemplehsNavHorizontalLayout1 from './horizontal/TemplehsNavHorizontalLayout1';
import TemplehsNavVerticalLayout1 from './vertical/TemplehsNavVerticalLayout1';
import TemplehsNavVerticalLayout2 from './vertical/TemplehsNavVerticalLayout2';
import TemplehsNavHorizontalCollapse from './horizontal/types/TemplehsNavHorizontalCollapse';
import TemplehsNavHorizontalGroup from './horizontal/types/TemplehsNavHorizontalGroup';
import TemplehsNavHorizontalItem from './horizontal/types/TemplehsNavHorizontalItem';
import TemplehsNavHorizontalLink from './horizontal/types/TemplehsNavHorizontalLink';
import TemplehsNavVerticalCollapse from './vertical/types/TemplehsNavVerticalCollapse';
import TemplehsNavVerticalGroup from './vertical/types/TemplehsNavVerticalGroup';
import TemplehsNavVerticalItem from './vertical/types/TemplehsNavVerticalItem';
import TemplehsNavVerticalLink from './vertical/types/TemplehsNavVerticalLink';
import { registerComponent } from './TemplehsNavItem';
import { TemplehsNavigationType } from './types/TemplehsNavigationType';
import { TemplehsNavItemType } from './types/TemplehsNavItemType';

const inputGlobalStyles = (
	<GlobalStyles
		styles={() => ({
			'.popper-navigation-list': {
				'& .templehs-list-item': {
					padding: '8px 12px 8px 12px',
					height: 40,
					minHeight: 40,
					'& .templehs-list-item-text': {
						padding: '0 0 0 8px'
					}
				},
				'&.dense': {
					'& .templehs-list-item': {
						minHeight: 32,
						height: 32,
						'& .templehs-list-item-text': {
							padding: '0 0 0 8px'
						}
					}
				}
			}
		})}
	/>
);

/*
Register Templehs Navigation Components
 */
registerComponent('vertical-group', TemplehsNavVerticalGroup);
registerComponent('vertical-collapse', TemplehsNavVerticalCollapse);
registerComponent('vertical-item', TemplehsNavVerticalItem);
registerComponent('vertical-link', TemplehsNavVerticalLink);
registerComponent('horizontal-group', TemplehsNavHorizontalGroup);
registerComponent('horizontal-collapse', TemplehsNavHorizontalCollapse);
registerComponent('horizontal-item', TemplehsNavHorizontalItem);
registerComponent('horizontal-link', TemplehsNavHorizontalLink);
registerComponent('divider', () => <Divider className="my-16" />);
registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);

export type TemplehsNavigationProps = {
	className?: string;
	dense?: boolean;
	active?: boolean;
	onItemClick?: (T: TemplehsNavItemType) => void;
	navigation: TemplehsNavigationType;
	layout?: 'horizontal' | 'vertical' | 'vertical-2';
	firstLevel?: boolean;
	selectedId?: string;
	checkPermission?: boolean;
};

/**
 * TemplehsNavigation
 * Component for displaying a navigation bar which contains TemplehsNavItem components
 * and acts as parent for providing props to its children components
 */
function TemplehsNavigation(props: TemplehsNavigationProps) {
	const { navigation, layout = 'vertical' } = props;

	if (!navigation || navigation.length === 0) {
		return null;
	}

	return (
		<>
			{inputGlobalStyles}
			{layout === 'horizontal' && (
				<TemplehsNavHorizontalLayout1
					checkPermission={false}
					{...props}
				/>
			)}
			{layout === 'vertical' && (
				<TemplehsNavVerticalLayout1
					checkPermission={false}
					{...props}
				/>
			)}
			{layout === 'vertical-2' && (
				<TemplehsNavVerticalLayout2
					checkPermission={false}
					{...props}
				/>
			)}
		</>
	);
}

export default memo(TemplehsNavigation);
