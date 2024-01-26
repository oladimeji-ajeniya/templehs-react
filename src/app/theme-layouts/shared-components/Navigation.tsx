import TemplehsNavigation from 'src/@templehs/core/TemplehsNavigation';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/store';
import { selectNavigation } from 'src/app/store/templehs/navigationSlice';
import useThemeMediaQuery from 'src/@templehs/hooks/useThemeMediaQuery';
import { navbarCloseMobile } from 'src/app/store/templehs/navbarSlice';
import { TemplehsNavigationProps } from 'src/@templehs/core/TemplehsNavigation/TemplehsNavigation';

/**
 * Navigation
 */
function Navigation(props: Partial<TemplehsNavigationProps>) {
	const { className = '', layout = 'vertical', dense, active } = props;

	const navigation = useAppSelector(selectNavigation);

	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const dispatch = useAppDispatch();

	return useMemo(() => {
		function handleItemClick() {
			if (isMobile) {
				dispatch(navbarCloseMobile());
			}
		}

		return (
			<TemplehsNavigation
				className={clsx('navigation flex-1', className)}
				navigation={navigation}
				layout={layout}
				dense={dense}
				active={active}
				onItemClick={handleItemClick}
				checkPermission
			/>
		);
	}, [dispatch, isMobile, navigation, active, className, dense, layout]);
}

export default Navigation;
