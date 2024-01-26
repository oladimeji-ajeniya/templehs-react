import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunkType, RootStateType } from 'src/app/store/types';
import { PartialDeep } from 'type-fest';
import { selectUserRole, userSliceType } from 'src/app/store/user/userSlice';
import TemplehsNavigationHelper from 'src/@templehs/utils/TemplehsNavigationHelper';
import i18next from 'i18next';
import TemplehsUtils from 'src/@templehs/utils';
import navigationConfig from 'src/app/configs/navigationConfig';
import { selectCurrentLanguageId } from '../i18nSlice';
import { TemplehsNavItemType } from '@templehs/core/TemplehsNavigation/types/TemplehsNavItemType';
import { TemplehsNavigationType } from '@templehs/core/TemplehsNavigation/types/TemplehsNavigationType';
import TemplehsNavItemModel from '@templehs/core/TemplehsNavigation/models/TemplehsNavItemModel';

type AppRootStateType = RootStateType<[navigationSliceType, userSliceType]>;

const navigationAdapter = createEntityAdapter<TemplehsNavItemType>();

const emptyInitialState = navigationAdapter.getInitialState([]);

const initialState = navigationAdapter.upsertMany(emptyInitialState, navigationConfig);

/**
 * Redux Thunk actions related to the navigation store state
 */

/**
 * Appends a navigation item to the navigation store state.
 */
export const appendNavigationItem =
	(item: TemplehsNavItemType, parentId?: string | null): AppThunkType =>
	async (dispatch, getState) => {
		const AppState = getState() as AppRootStateType;
		const navigation = selectNavigationAll(AppState);

		dispatch(setNavigation(TemplehsNavigationHelper.appendNavItem(navigation, TemplehsNavItemModel(item), parentId)));

		return Promise.resolve();
	};

/**
 * Prepends a navigation item to the navigation store state.
 */
export const prependNavigationItem =
	(item: TemplehsNavItemType, parentId?: string | null): AppThunkType =>
	async (dispatch, getState) => {
		const AppState = getState() as AppRootStateType;
		const navigation = selectNavigationAll(AppState);

		dispatch(setNavigation(TemplehsNavigationHelper.prependNavItem(navigation, TemplehsNavItemModel(item), parentId)));

		return Promise.resolve();
	};

/**
 * Adds a navigation item to the navigation store state at the specified index.
 */
export const updateNavigationItem =
	(id: string, item: PartialDeep<TemplehsNavItemType>): AppThunkType =>
	async (dispatch, getState) => {
		const AppState = getState() as AppRootStateType;
		const navigation = selectNavigationAll(AppState);

		dispatch(setNavigation(TemplehsNavigationHelper.updateNavItem(navigation, id, item)));

		return Promise.resolve();
	};

/**
 * Removes a navigation item from the navigation store state.
 */
export const removeNavigationItem =
	(id: string): AppThunkType =>
	async (dispatch, getState) => {
		const AppState = getState() as AppRootStateType;
		const navigation = selectNavigationAll(AppState);

		dispatch(setNavigation(TemplehsNavigationHelper.removeNavItem(navigation, id)));

		return Promise.resolve();
	};

export const {
	selectAll: selectNavigationAll,
	selectIds: selectNavigationIds,
	selectById: selectNavigationItemById
} = navigationAdapter.getSelectors((state: AppRootStateType) => state.templehs.navigation);

/**
 * The navigation slice
 */
export const navigationSlice = createSlice({
	name: 'templehs/navigation',
	initialState,
	reducers: {
		setNavigation: (state, action: PayloadAction<TemplehsNavigationType>) =>
			navigationAdapter.setAll(state, action.payload),
		resetNavigation: () => initialState
	}
});

export const { setNavigation, resetNavigation } = navigationSlice.actions;

export const selectNavigation = createSelector(
	[selectNavigationAll, selectUserRole, selectCurrentLanguageId],
	(navigation, userRole) => {
		function setAdditionalData(data: TemplehsNavigationType): TemplehsNavigationType {
			return data?.map((item) => ({
				hasPermission: Boolean(TemplehsUtils.hasPermission(item?.auth, userRole)),
				...item,
				...(item.translate && item.title ? { title: i18next.t(`navigation:${item.translate}`) } : {}),
				...(item.children ? { children: setAdditionalData(item.children) } : {})
			}));
		}

		const translatedValues = setAdditionalData(navigation);

		return translatedValues;
	}
);

export const selectFlatNavigation = createSelector([selectNavigation], (navigation) =>
	TemplehsNavigationHelper.getFlatNavigation(navigation)
);

export type navigationSliceType = typeof navigationSlice;

export default navigationSlice.reducer;
