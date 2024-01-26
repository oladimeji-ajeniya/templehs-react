import NavLinkAdapter from 'src/@templehs/core/NavLinkAdapter';
import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import withRouter from 'src/@templehs/core/withRouter';
import { ListItemButton, ListItemButtonProps } from '@mui/material';
import { WithRouterProps } from 'src/@templehs/core/withRouter/withRouter';
import TemplehsNavBadge from '../../TemplehsNavBadge';
import TemplehsSvgIcon from '../../../TemplehsSvgIcon';
import { TemplehsNavItemComponentProps } from '../../TemplehsNavItem';

const Root = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
	color: theme.palette.text.primary,
	textDecoration: 'none!important',
	minHeight: 48,
	'&.active': {
		backgroundColor: `${theme.palette.secondary.main}!important`,
		color: `${theme.palette.secondary.contrastText}!important`,
		pointerEvents: 'none',
		'& .templehs-list-item-text-primary': {
			color: 'inherit'
		},
		'& .templehs-list-item-icon': {
			color: 'inherit'
		}
	},
	'& .templehs-list-item-icon': {},
	'& .templehs-list-item-text': {
		padding: '0 0 0 16px'
	}
}));

type TemplehsNavHorizontalItemProps = TemplehsNavItemComponentProps & WithRouterProps;

/**
 * TemplehsNavHorizontalItem is a component responsible for rendering the navigation element in the horizontal menu in the Templehs theme.
 */
function TemplehsNavHorizontalItem(props: TemplehsNavHorizontalItemProps) {
	const { item, checkPermission } = props;

	const component = item.url ? NavLinkAdapter : 'li';

	let itemProps;

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
					classes={{ primary: 'text-13 templehs-list-item-text-primary truncate' }}
				/>

				{item.badge && (
					<TemplehsNavBadge
						className="ltr:ml-8 rtl:mr-8"
						badge={item.badge}
					/>
				)}
			</Root>
		),
		[item.badge, item.exact, item.icon, item.iconClass, item.title, item.url]
	);
}

const NavHorizontalItem = withRouter(memo(TemplehsNavHorizontalItem));

export default NavHorizontalItem;
