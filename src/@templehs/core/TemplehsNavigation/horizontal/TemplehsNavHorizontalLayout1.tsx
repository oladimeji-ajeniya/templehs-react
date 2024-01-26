import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import TemplehsNavItem from '../TemplehsNavItem';
import { TemplehsNavigationProps } from '../TemplehsNavigation';

const StyledList = styled(List)(({ theme }) => ({
	'& .templehs-list-item': {
		'&:hover': {
			backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.04)'
		},
		'&:focus:not(.active)': {
			backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,.05)'
		},
		padding: '8px 12px 8px 12px',
		height: 40,
		minHeight: 40,
		'&.level-0': {
			minHeight: 44,
			minminHeight: 44
		},
		'& .templehs-list-item-text': {
			padding: '0 0 0 8px'
		}
	},
	'&.active-square-list': {
		'& .templehs-list-item': {
			borderRadius: '0'
		}
	}
}));

/**
 * TemplehsNavHorizontalLayout1 is a react component used for building and
 * rendering horizontal navigation menus, using the Material UI List component.
 */
function TemplehsNavHorizontalLayout1(props: TemplehsNavigationProps) {
	const { navigation, active, dense, className, checkPermission } = props;

	return (
		<StyledList
			className={clsx(
				'navigation flex whitespace-nowrap p-0',
				`active-${active}-list`,
				dense && 'dense',
				className
			)}
		>
			{navigation.map((_item) => (
				<TemplehsNavItem
					key={_item.id}
					type={`horizontal-${_item.type}`}
					item={_item}
					nestedLevel={0}
					dense={dense}
					checkPermission={checkPermission}
				/>
			))}
		</StyledList>
	);
}

export default TemplehsNavHorizontalLayout1;
