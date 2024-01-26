import NavLinkAdapter from 'src/@templehs/core/NavLinkAdapter';
import { alpha, styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { useMemo } from 'react';
import { ListItemButton, ListItemButtonProps } from '@mui/material';
import TemplehsNavBadge from '../../TemplehsNavBadge';
import TemplehsSvgIcon from '../../../TemplehsSvgIcon';
import { TemplehsNavItemComponentProps } from '../../TemplehsNavItem';

type ListItemButtonStyleProps = ListItemButtonProps & {
	itempadding: number;
};

const Root = styled(ListItemButton)<ListItemButtonStyleProps>(({ theme, ...props }) => ({
	minHeight: 44,
	width: '100%',
	borderRadius: '6px',
	margin: '0 0 4px 0',
	paddingRight: 16,
	paddingLeft: props.itempadding > 80 ? 80 : props.itempadding,
	paddingTop: 10,
	paddingBottom: 10,
	color: alpha(theme.palette.text.primary, 0.7),
	cursor: 'pointer',
	textDecoration: 'none!important',
	'&:hover': {
		color: theme.palette.text.primary
	},
	'&.active': {
		color: theme.palette.text.primary,
		backgroundColor:
			theme.palette.mode === 'light' ? 'rgba(0, 0, 0, .05)!important' : 'rgba(255, 255, 255, .1)!important',
		pointerEvents: 'none',
		transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
		'& > .templehs-list-item-text-primary': {
			color: 'inherit'
		},
		'& > .templehs-list-item-icon': {
			color: 'inherit'
		}
	},
	'& >.templehs-list-item-icon': {
		marginRight: 16,
		color: 'inherit'
	},
	'& > .templehs-list-item-text': {}
}));

/**
 * TemplehsNavVerticalItem is a React component used to render TemplehsNavItem as part of the Templehs navigational component.
 */
function TemplehsNavVerticalItem(props: TemplehsNavItemComponentProps) {
	const { item, nestedLevel = 0, onItemClick, checkPermission } = props;

	const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;

	const component = item.url ? NavLinkAdapter : 'li';

	let itemProps = {};

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			to: item.url || '',
			end: item.end,
			role: 'button'
		};
	}

	if (checkPermission && !item?.hasPermission) {
		return null;
	}

	return useMemo(
		() => (
			<Root
				component={component}
				className={clsx('templehs-list-item', item.active && 'active')}
				onClick={() => onItemClick && onItemClick(item)}
				itempadding={itempadding}
				sx={item.sx}
				{...itemProps}
			>
				{item.icon && (
					<TemplehsSvgIcon
						className={clsx('templehs-list-item-icon shrink-0', item.iconClass)}
						color="action"
					>
						{item.icon}
					</TemplehsSvgIcon>
				)}

				<ListItemText
					className="templehs-list-item-text"
					primary={item.title}
					secondary={item.subtitle}
					classes={{
						primary: 'text-13 font-medium templehs-list-item-text-primary truncate',
						secondary: 'text-11 font-medium templehs-list-item-text-secondary leading-normal truncate'
					}}
				/>
				{item.badge && <TemplehsNavBadge badge={item.badge} />}
			</Root>
		),
		[item, itempadding, onItemClick]
	);
}

const NavVerticalItem = TemplehsNavVerticalItem;

export default NavVerticalItem;
