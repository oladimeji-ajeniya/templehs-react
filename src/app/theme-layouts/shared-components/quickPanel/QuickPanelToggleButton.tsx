import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'src/app/store';
import TemplehsSvgIcon from 'src/@templehs/core/TemplehsSvgIcon';
import { toggleQuickPanel } from './store/stateSlice';

type QuickPanelToggleButtonProps = {
	children?: React.ReactNode;
};

/**
 * The quick panel toggle button.
 */
function QuickPanelToggleButton(props: QuickPanelToggleButtonProps) {
	const { children = <TemplehsSvgIcon>heroicons-outline:bookmark</TemplehsSvgIcon> } = props;
	const dispatch = useAppDispatch();

	return (
		<IconButton
			className="h-40 w-40"
			onClick={() => dispatch(toggleQuickPanel())}
			size="large"
		>
			{children}
		</IconButton>
	);
}

export default QuickPanelToggleButton;
