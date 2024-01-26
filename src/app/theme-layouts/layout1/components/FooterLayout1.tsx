import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'src/app/store/templehs/settingsSlice';
import clsx from 'clsx';

type FooterLayout1Props = { className?: string };

/**
 * The footer layout 1.
 */
function FooterLayout1(props: FooterLayout1Props) {
	const { className } = props;

	const footerTheme = useSelector(selectFooterTheme);

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="templehs-footer"
				className={clsx('relative z-20 shadow-md', className)}
				color="default"
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? footerTheme.palette.background.paper
							: footerTheme.palette.background.default
				}}
			>
				
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(FooterLayout1);
