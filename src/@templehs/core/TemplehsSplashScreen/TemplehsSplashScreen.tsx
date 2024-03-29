import { memo } from 'react';
import Box from '@mui/material/Box';

/**
 * The TemplehsSplashScreen component is responsible for rendering a splash screen with a logo and a loading spinner.
 * It uses various MUI components to render the logo and spinner.
 * The component is memoized to prevent unnecessary re-renders.
 */
function TemplehsSplashScreen() {
	return (
		<div id="templehs-splash-screen">
			<div className="logo">
				<img
					width="800"
					src="assets/images/logo/logo.svg"
					alt="logo"
				/>
			</div>
			<Box
				id="spinner"
				sx={{
					'& > div': {
						backgroundColor: 'palette.secondary.main'
					}
				}}
			>
				<div className="bounce1" />
				<div className="bounce2" />
				<div className="bounce3" />
			</Box>
		</div>
	);
}

export default memo(TemplehsSplashScreen);
