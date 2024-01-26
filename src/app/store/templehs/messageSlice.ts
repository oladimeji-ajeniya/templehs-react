import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from 'src/app/store/types';
import { SnackbarProps } from '@mui/material/Snackbar/Snackbar';
import { TemplehsMessageVariantType } from 'src/@templehs/core/TemplehsMessage/TemplehsMessage';

type AppRootStateType = RootStateType<messageSliceType>;

/**
 * The type definition for the initial state of the message slice.
 */
type initialStateProps = {
	state: boolean;
	options: Pick<SnackbarProps, 'anchorOrigin' | 'autoHideDuration' | 'message'> & {
		variant: TemplehsMessageVariantType;
	};
};

/**
 * The initial state of the message slice.
 */
const initialState: initialStateProps = {
	state: false,
	options: {
		variant: 'info',
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'center'
		},
		autoHideDuration: 2000,
		message: 'Hi'
	}
};

/**
 * The Message slice.
 */
export const messageSlice = createSlice({
	name: 'templehs/message',
	initialState,
	reducers: {
		showMessage: (state, action: PayloadAction<SnackbarProps>) => {
			state.state = true;
			state.options = {
				...initialState.options,
				...action.payload
			} as initialStateProps['options'];
		},
		hideMessage: (state) => {
			state.state = false;
		}
	}
});

export const { hideMessage, showMessage } = messageSlice.actions;

export const selectTemplehsMessageState = (state: AppRootStateType) => state.templehs.message.state;

export const selectTemplehsMessageOptions = (state: AppRootStateType) => state.templehs.message.options;

export type messageSliceType = typeof messageSlice;

export default messageSlice.reducer;
