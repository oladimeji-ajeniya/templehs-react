import { navbarToggle, navbarToggleMobile } from 'src/app/store/templehs/navbarSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/app/store';
import useThemeMediaQuery from 'src/@templehs/hooks/useThemeMediaQuery';
import { selectTemplehsCurrentLayoutConfig } from 'src/app/store/templehs/settingsSlice';
import { Layout1ConfigDefaultsType } from 'src/app/theme-layouts/layout1/Layout1Config';
import NavbarToggleFab from 'src/app/theme-layouts/shared-components/NavbarToggleFab';

type NavbarToggleFabLayout1Props = {
	className?: string;
};

/**
 * The navbar toggle fab layout 1.
 */
function NavbarToggleFabLayout1(props: NavbarToggleFabLayout1Props) {
	const { className } = props;

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const config = useSelector(selectTemplehsCurrentLayoutConfig) as Layout1ConfigDefaultsType;

	const dispatch = useAppDispatch();

	return (
		<NavbarToggleFab
			className={className}
			onClick={() => {
				dispatch(isMobile ? navbarToggleMobile() : navbarToggle());
			}}
			position={config.navbar.position}
		/>
	);
}

export default NavbarToggleFabLayout1;
