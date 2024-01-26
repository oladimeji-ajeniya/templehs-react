import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import withRouter from 'src/@templehs/core/withRouter';
import { Link, ListItemButton, ListItemButtonProps } from '@mui/material';
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

type TemplehsNavHorizontalLinkProps = TemplehsNavItemComponentProps & WithRouterProps;

/*
 * TemplehsNavHorizontalLink
 * This is a component to render horizontal navigation links in the Templehs navigations.
 * It receieves `TemplehsNavItemComponentProps` and `WithRouterProps` as props.
 */
function TemplehsNavHorizontalLink(props: TemplehsNavHorizontalLinkProps) {
	const { item, checkPermission } = props;

	let itemProps;

	const component = item.url ? Link : 'li';

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			href: item.url,
			role: 'button',
			target: item.target ? item.target : '_blank'
		};
	}

	if (checkPermission && !item?.hasPermission) {
		return null;
	}

	return useMemo(
		() => (
			<Root
				component={component}
				className={clsx('templehs-list-item')}
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
		[item.badge, item.icon, item.iconClass, item.target, item.title, item.url]
	);
}

const NavHorizontalLink = withRouter(memo(TemplehsNavHorizontalLink));

export default NavHorizontalLink;
