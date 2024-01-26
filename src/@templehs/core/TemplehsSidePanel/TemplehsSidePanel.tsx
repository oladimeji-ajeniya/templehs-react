import TemplehsScrollbars from 'src/@templehs/core/TemplehsScrollbars';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx';
import { memo, ReactNode, useState } from 'react';
import TemplehsSvgIcon from '../TemplehsSvgIcon';

const Root = styled('div')(({ theme }) => ({
	'& .TemplehsSidePanel-paper': {
		display: 'flex',
		width: 56,
		transition: theme.transitions.create(['transform', 'width', 'min-width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.shorter
		}),
		paddingBottom: 64,
		height: '100%',
		maxHeight: '100vh',
		position: 'sticky',
		top: 0,
		zIndex: 999,
		'&.left': {
			'& .TemplehsSidePanel-buttonWrapper': {
				left: 0,
				right: 'auto'
			},
			'& .TemplehsSidePanel-buttonIcon': {
				transform: 'rotate(0deg)'
			}
		},
		'&.right': {
			'& .TemplehsSidePanel-buttonWrapper': {
				right: 0,
				left: 'auto'
			},
			'& .TemplehsSidePanel-buttonIcon': {
				transform: 'rotate(-180deg)'
			}
		},
		'&.closed': {
			[theme.breakpoints.up('lg')]: {
				width: 0
			},
			'&.left': {
				'& .TemplehsSidePanel-buttonWrapper': {
					justifyContent: 'start'
				},
				'& .TemplehsSidePanel-button': {
					borderBottomLeftRadius: 0,
					borderTopLeftRadius: 0,
					paddingLeft: 4
				},
				'& .TemplehsSidePanel-buttonIcon': {
					transform: 'rotate(-180deg)'
				}
			},
			'&.right': {
				'& .TemplehsSidePanel-buttonWrapper': {
					justifyContent: 'flex-end'
				},
				'& .TemplehsSidePanel-button': {
					borderBottomRightRadius: 0,
					borderTopRightRadius: 0,
					paddingRight: 4
				},
				'& .TemplehsSidePanel-buttonIcon': {
					transform: 'rotate(0deg)'
				}
			},
			'& .TemplehsSidePanel-buttonWrapper': {
				width: 'auto'
			},
			'& .TemplehsSidePanel-button': {
				backgroundColor: theme.palette.background.paper,
				borderRadius: 38,
				transition: theme.transitions.create(
					['background-color', 'border-radius', 'width', 'min-width', 'padding'],
					{
						easing: theme.transitions.easing.easeInOut,
						duration: theme.transitions.duration.shorter
					}
				),
				width: 24,
				'&:hover': {
					width: 52,
					paddingLeft: 8,
					paddingRight: 8
				}
			},
			'& .TemplehsSidePanel-content': {
				opacity: 0
			}
		}
	},

	'& .TemplehsSidePanel-content': {
		overflow: 'hidden',
		opacity: 1,
		transition: theme.transitions.create(['opacity'], {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.short
		})
	},

	'& .TemplehsSidePanel-buttonWrapper': {
		position: 'absolute',
		bottom: 0,
		left: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '12px 0',
		width: '100%',
		minWidth: 56
	},

	'& .TemplehsSidePanel-button': {
		padding: 8,
		width: 40,
		height: 40
	},

	'& .TemplehsSidePanel-buttonIcon': {
		transition: theme.transitions.create(['transform'], {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.short
		})
	},

	'& .TemplehsSidePanel-mobileButton': {
		height: 40,
		position: 'absolute',
		zIndex: 99,
		bottom: 12,
		width: 24,
		borderRadius: 38,
		padding: 8,
		backgroundColor: theme.palette.background.paper,
		transition: theme.transitions.create(['background-color', 'border-radius', 'width', 'min-width', 'padding'], {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.shorter
		}),
		'&:hover': {
			width: 52,
			paddingLeft: 8,
			paddingRight: 8
		},
		'&.left': {
			borderBottomLeftRadius: 0,
			borderTopLeftRadius: 0,
			paddingLeft: 4,
			left: 0
		},

		'&.right': {
			borderBottomRightRadius: 0,
			borderTopRightRadius: 0,
			paddingRight: 4,
			right: 0,
			'& .TemplehsSidePanel-buttonIcon': {
				transform: 'rotate(-180deg)'
			}
		}
	}
}));

type TemplehsSidePanelProps = {
	position?: 'left';
	opened?: true;
	className?: string;
	children?: ReactNode;
};

/**
 * The TemplehsSidePanel component is responsible for rendering a side panel that can be opened and closed.
 * It uses various MUI components to render the panel and its contents.
 * The component is memoized to prevent unnecessary re-renders.
 */
function TemplehsSidePanel(props: TemplehsSidePanelProps) {
	const { position = 'left', opened = true, className, children } = props;

	const [panelOpened, setPanelOpened] = useState(Boolean(opened));
	const [mobileOpen, setMobileOpen] = useState(false);

	function toggleOpened() {
		setPanelOpened(!panelOpened);
	}

	function toggleMobileDrawer() {
		setMobileOpen(!mobileOpen);
	}

	return (
		<Root>
			<Hidden lgDown>
				<Paper
					className={clsx(
						'TemplehsSidePanel-paper',
						className,
						panelOpened ? 'opened' : 'closed',
						position,
						'shadow-lg'
					)}
					square
				>
					<TemplehsScrollbars className={clsx('content', 'TemplehsSidePanel-content')}>{children}</TemplehsScrollbars>

					<div className="TemplehsSidePanel-buttonWrapper">
						<Tooltip
							title="Toggle side panel"
							placement={position === 'left' ? 'right' : 'right'}
						>
							<IconButton
								className="TemplehsSidePanel-button"
								onClick={toggleOpened}
								disableRipple
								size="large"
							>
								<TemplehsSvgIcon className="TemplehsSidePanel-buttonIcon">
									heroicons-outline:chevron-left
								</TemplehsSvgIcon>
							</IconButton>
						</Tooltip>
					</div>
				</Paper>
			</Hidden>
			<Hidden lgUp>
				<SwipeableDrawer
					classes={{
						paper: clsx('TemplehsSidePanel-paper', className)
					}}
					anchor={position}
					open={mobileOpen}
					onOpen={() => {}}
					onClose={toggleMobileDrawer}
					disableSwipeToOpen
				>
					<TemplehsScrollbars className={clsx('content', 'TemplehsSidePanel-content')}>{children}</TemplehsScrollbars>
				</SwipeableDrawer>

				<Tooltip
					title="Hide side panel"
					placement={position === 'left' ? 'right' : 'right'}
				>
					<Fab
						className={clsx('TemplehsSidePanel-mobileButton', position)}
						onClick={toggleMobileDrawer}
						disableRipple
					>
						<TemplehsSvgIcon className="TemplehsSidePanel-buttonIcon">heroicons-outline:chevron-right</TemplehsSvgIcon>
					</Fab>
				</Tooltip>
			</Hidden>
		</Root>
	);
}

export default memo(TemplehsSidePanel);
