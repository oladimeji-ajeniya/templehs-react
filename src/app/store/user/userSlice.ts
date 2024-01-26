/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';

import settingsConfig from 'src/app/configs/settingsConfig';
import { AppDispatchType, RootStateType } from 'src/app/store/types';
import { UserType } from 'src/app/store/user';
import { PartialDeep } from 'type-fest';
import { AxiosError } from 'axios/index';
import jwtService from '../../auth/services/jwtService';
import createAppAsyncThunk from '../createAppAsyncThunk';
import { TemplehsSettingsConfigType } from '@templehs/core/TemplehsSettings/TemplehsSettings';
import { showMessage } from '../templehs/messageSlice';
import { setInitialSettings } from '../templehs/settingsSlice';

type AppRootStateType = RootStateType<userSliceType>;

/**
 * Sets the user data in the Redux store and updates the login redirect URL if provided.
 */
export const setUser = createAsyncThunk('user/setUser', (user: UserType) => {
	/*
    You can redirect the logged-in user to a specific route depending on his role
    */
	if (user.loginRedirectUrl) {
		settingsConfig.loginRedirectUrl = user.loginRedirectUrl; // for example 'apps/academy'
	}

	return Promise.resolve(user);
});



/**
 * Logs the user out and resets the Redux store.
 */
export const logoutUser = () => async (dispatch: AppDispatchType, getState: () => RootStateType) => {
	const AppState = getState() as AppRootStateType;

	const isUserGuest = selectIsUserGuest(AppState);

	if (isUserGuest) {
		return null;
	}

	history.push({
		pathname: '/'
	});

	dispatch(setInitialSettings());

	return Promise.resolve(dispatch(userLoggedOut()));
};


/**
 * The initial state of the user slice.
 */
const initialState: UserType = {
	role: [], // guest
	data: {
		displayName: 'John Doe',
		photoURL: 'assets/images/avatars/brian-hughes.jpg',
		email: 'johndoe@templehs.com',
	}
};

/**
 * The User slice
 */
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userLoggedOut: () => initialState
	},
	extraReducers: (builder) => {
		builder
			.addCase(setUser.fulfilled, (state, action) => action.payload)
	}
});

export const { userLoggedOut } = userSlice.actions;

export const selectUser = (state: AppRootStateType) => state.user;

export const selectUserRole = (state: AppRootStateType) => state.user.role;

export const selectIsUserGuest = (state: AppRootStateType) => {
	const { role } = state.user;

	return !role || role.length === 0;
};

export const selectUserShortcuts = (state: AppRootStateType) => state.user.data.shortcuts;

export type userSliceType = typeof userSlice;

export default userSlice.reducer;
