import { useState } from 'react';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import TemplehsSvgIcon from 'src/@templehs/core/TemplehsSvgIcon';
import Dialog from '@mui/material/Dialog';
import { useSelector } from 'react-redux';
import { selectTemplehsCurrentSettings } from 'src/app/store/templehs/settingsSlice';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import qs from 'qs';
import Typography from '@mui/material/Typography';

type TemplehsSettingsViewerDialogProps = {
	className?: string;
};

/**
 * The settings viewer dialog.
 */
function TemplehsSettingsViewerDialog(props: TemplehsSettingsViewerDialogProps) {
	const { className = '' } = props;

	const [openDialog, setOpenDialog] = useState(false);
	const settings = useSelector(selectTemplehsCurrentSettings);

	const jsonStringifiedSettings = JSON.stringify(settings);
	const queryString = qs.stringify({
		defaultSettings: jsonStringifiedSettings,
		strictNullHandling: true
	});

	function handleOpenDialog() {
		setOpenDialog(true);
	}

	function handleCloseDialog() {
		setOpenDialog(false);
	}

	return (
		<div className={clsx('', className)}>
			<Button
				variant="contained"
				color="secondary"
				className="w-full"
				onClick={handleOpenDialog}
				startIcon={<TemplehsSvgIcon>heroicons-solid:code</TemplehsSvgIcon>}
			>
				View settings as json/query params
			</Button>

			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle>Templehs Settings Viewer</DialogTitle>
				<DialogContent>
					<Typography className="mb-16 mt-24 text-16 font-bold">JSON</Typography>

					<Typography className="mb-16 mt-24 text-16 font-bold">Query Params</Typography>

					{queryString}
				</DialogContent>
				<DialogActions>
					<Button
						color="secondary"
						variant="contained"
						onClick={handleCloseDialog}
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default TemplehsSettingsViewerDialog;
