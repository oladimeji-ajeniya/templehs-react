import Dialog from '@mui/material/Dialog';
import { closeDialog, selectTemplehsDialogProps } from 'src/app/store/templehs/dialogSlice';
import { useAppDispatch, useAppSelector } from 'src/app/store';

/**
 * TemplehsDialog component
 * This component renders a material UI ```Dialog``` component
 * with properties pulled from the redux store
 */
function TemplehsDialog() {
	const dispatch = useAppDispatch();
	const options = useAppSelector(selectTemplehsDialogProps);

	return (
		<Dialog
			onClose={() => dispatch(closeDialog())}
			aria-labelledby="templehs-dialog-title"
			classes={{
				paper: 'rounded-8'
			}}
			{...options}
		/>
	);
}

export default TemplehsDialog;
