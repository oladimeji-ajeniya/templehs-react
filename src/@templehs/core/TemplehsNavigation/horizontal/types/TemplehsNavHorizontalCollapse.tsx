import NavLinkAdapter from 'src/@templehs/core/NavLinkAdapter';
import { styled, useTheme } from '@mui/material/styles';
import { useDebounce } from 'src/@templehs/hooks';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import clsx from 'clsx';
import { memo, useMemo, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Manager, Popper, Reference } from 'react-popper';
import withRouter from 'src/@templehs/core/withRouter';
import { ListItemButton, ListItemButtonProps } from '@mui/material';
import { Location } from 'history';
import isUrlInChildren from 'src/@templehs/core/TemplehsNavigation/isUrlInChildren';
import TemplehsNavBadge from '../../TemplehsNavBadge';
import TemplehsNavItem, { TemplehsNavItemComponentProps } from '../../TemplehsNavItem';
import TemplehsSvgIcon from '../../../TemplehsSvgIcon';

const Root = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
	color: theme.palette.text.primary,
	minHeight: 48,
	cursor: 'pointer',
	'&.active, &.active:hover, &.active:focus': {
		backgroundColor: `${theme.palette.secondary.main}!important`,
		color: `${theme.palette.secondary.contrastText}!important`,

		'&.open': {
			backgroundColor: 'rgba(0,0,0,.08)'
		},

		'& > .templehs-list-item-text': {
			padding: '0 0 0 16px'
		},

		'& .templehs-list-item-icon': {
			color: 'inherit'
		}
	}
}));

type TemplehsNavHorizontalCollapseProps = TemplehsNavItemComponentProps & {
	location: Location;
};

/**
 * TemplehsNavHorizontalCollapse component helps rendering Horizontal Templehs Navigation Item with children
 * Used in TemplehsNavVerticalItems and TemplehsNavHorizontalItems
 */
function TemplehsNavHorizontalCollapse(props: TemplehsNavHorizontalCollapseProps) {
	const [opened, setOpened] = useState(false);
	const { item, nestedLevel, dense, location, checkPermission } = props;
	const theme = useTheme();

	const handleToggle = useDebounce((open: boolean) => {
		setOpened(open);
	}, 150);

	const component = item.url ? NavLinkAdapter : 'li';

	let itemProps;

	if (typeof component !== 'string') {
		itemProps = {
			disabled: item.disabled,
			to: item.url,
			end: item.end,
			role: 'button'
		};
	}

	if (checkPermission && !item?.hasPermission) {
		return null;
	}

	return useMemo(
		() => (
			<ul className="relative px-0">
				<Manager>
					<Reference>
						{({ ref }) => (
							<div ref={ref}>
								<Root
									component={component}
									className={clsx(
										'templehs-list-item',
										opened && 'open',
										isUrlInChildren(item, location.pathname) && 'active'
									)}
									onMouseEnter={() => handleToggle(true)}
									onMouseLeave={() => handleToggle(false)}
									aria-owns={opened ? 'menu-templehs-list-grow' : null}
									aria-haspopup="true"
									sx={item.sx}
									{...itemProps}
								>
									{item.icon && (
										<TemplehsSvgIcon
											color="action"
											className={clsx('templehs-list-item-icon shrink-0', item.iconClass)}
										>
											{item.icon}
										</TemplehsSvgIcon>
									)}

									<ListItemText
										className="templehs-list-item-text"
										primary={item.title}
										classes={{ primary: 'text-13 truncate' }}
									/>

									{item.badge && (
										<TemplehsNavBadge
											className="mx-4"
											badge={item.badge}
										/>
									)}
									<IconButton
										disableRipple
										className="h-16 w-16 p-0 ltr:ml-4 rtl:mr-4"
										color="inherit"
										size="large"
									>
										<TemplehsSvgIcon
											size={16}
											className="arrow-icon"
										>
											{theme.direction === 'ltr'
												? 'heroicons-outline:arrow-sm-right'
												: 'heroicons-outline:arrow-sm-left'}
										</TemplehsSvgIcon>
									</IconButton>
								</Root>
							</div>
						)}
					</Reference>
					{ReactDOM.createPortal(
						<Popper placement={theme.direction === 'ltr' ? 'right' : 'left'}>
							{({ ref, style, placement }) =>
								opened && (
									<div
										ref={ref}
										style={{
											...style,
											zIndex: 999 + nestedLevel + 1
										}}
										data-placement={placement}
										className={clsx('z-999', !opened && 'pointer-events-none')}
									>
										<Grow
											in={opened}
											id="menu-templehs-list-grow"
											style={{ transformOrigin: '0 0 0' }}
										>
											<Paper
												className="rounded-8"
												onMouseEnter={() => handleToggle(true)}
												onMouseLeave={() => handleToggle(false)}
											>
												{item.children && (
													<ul
														className={clsx(
															'popper-navigation-list',
															dense && 'dense',
															'px-0'
														)}
													>
														{item.children.map((_item) => (
															<TemplehsNavItem
																key={_item.id}
																type={`horizontal-${_item.type}`}
																item={_item}
																nestedLevel={nestedLevel + 1}
																dense={dense}
															/>
														))}
													</ul>
												)}
											</Paper>
										</Grow>
									</div>
								)
							}
						</Popper>,
						document.querySelector('#root')
					)}
				</Manager>
			</ul>
		),
		[dense, handleToggle, item, nestedLevel, opened, location.pathname, theme.direction]
	);
}

TemplehsNavHorizontalCollapse.defaultProps = {};

const NavHorizontalCollapse = withRouter(memo(TemplehsNavHorizontalCollapse));

export default NavHorizontalCollapse;
