import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import TemplehsNavItem from '../TemplehsNavItem';
import { TemplehsNavigationProps } from '../TemplehsNavigation';
import { TemplehsNavItemType } from '../types/TemplehsNavItemType';

const StyledList = styled(List)(({ theme }) => ({
	'& .templehs-list-item': {
		'&:hover': {
			backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.04)'
		},
		'&:focus:not(.active)': {
			backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,.05)'
		}
	},
	'& .templehs-list-item-text': {
		margin: 0
	},
	'& .templehs-list-item-text-primary': {
		lineHeight: '20px'
	},
	'&.active-square-list': {
		'& .templehs-list-item, & .active.templehs-list-item': {
			width: '100%',
			borderRadius: '0'
		}
	},
	'&.dense': {
		'& .templehs-list-item': {
			paddingTop: 0,
			paddingBottom: 0,
			height: 32
		}
	}
}));

/**
 * TemplehsNavVerticalLayout1
 * This component is used to render vertical navigations using
 * the Material-UI List component. It accepts the TemplehsNavigationProps props
 * and renders the TemplehsNavItem components accordingly
 */
function TemplehsNavVerticalLayout1(props: TemplehsNavigationProps) {
	const { navigation, active, dense, className, onItemClick, checkPermission } = props;

	function handleItemClick(item: TemplehsNavItemType) {
		onItemClick?.(item);
	}

	return (
		<StyledList
			className={clsx(
				'navigation whitespace-nowrap px-12 py-0',
				`active-${active}-list`,
				dense && 'dense',
				className
			)}
		>
			{navigation.map((_item) => (
				<TemplehsNavItem
					key={_item.id}
					type={`vertical-${_item.type}`}
					item={_item}
					nestedLevel={0}
					onItemClick={handleItemClick}
					checkPermission={checkPermission}
				/>
			))}
		</StyledList>
	);
}

export default TemplehsNavVerticalLayout1;
