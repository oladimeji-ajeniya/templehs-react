import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { selectTemplehsCurrentSettings, setDefaultSettings } from 'src/app/store/templehs/settingsSlice';
import _ from '@lodash';
import useThemeMediaQuery from 'src/@templehs/hooks/useThemeMediaQuery';
import { navbarToggle, navbarToggleMobile } from 'src/app/store/templehs/navbarSlice';
import TemplehsSvgIcon from 'src/@templehs/core/TemplehsSvgIcon';
import { TemplehsSettingsConfigType } from 'src/@templehs/core/TemplehsSettings/TemplehsSettings';

type NavbarToggleButtonProps = {
	className?: string;
	children?: React.ReactNode;
};

/**
 * The navbar toggle button.
 */
function NavbarToggleButton(props: NavbarToggleButtonProps) {
	const {
		className = '',
		children = (
			<TemplehsSvgIcon
				size={20}
				color="action"
			>
				heroicons-outline:view-list
			</TemplehsSvgIcon>
		)
	} = props;

	const dispatch = useAppDispatch();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const settings: TemplehsSettingsConfigType = useAppSelector(selectTemplehsCurrentSettings);
	const { config } = settings.layout;

	return (
		<IconButton
			className={className}
			color="inherit"
			size="small"
			onClick={() => {
				if (isMobile) {
					dispatch(navbarToggleMobile());
				} else if (config?.navbar?.style === 'style-2') {
					dispatch(
						setDefaultSettings(
							_.set({}, 'layout.config.navbar.folded', !settings?.layout?.config?.navbar?.folded)
						)
					);
				} else {
					dispatch(navbarToggle());
				}
			}}
		>
			{children}
		</IconButton>
	);
}

export default NavbarToggleButton;
