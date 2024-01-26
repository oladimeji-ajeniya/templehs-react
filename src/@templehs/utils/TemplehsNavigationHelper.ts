import UserType from 'src/app/store/user/UserType';
import { TemplehsNavigationType } from '@templehs/core/TemplehsNavigation/types/TemplehsNavigationType';
import TemplehsNavItemModel from '@templehs/core/TemplehsNavigation/models/TemplehsNavItemModel';
import { TemplehsNavItemType } from '@templehs/core/TemplehsNavigation/types/TemplehsNavItemType';
import _ from '@lodash';
import { PartialDeep } from 'type-fest';


class TemplehsNavigationHelper {
	static selectById(nav: TemplehsNavigationType, id: string): TemplehsNavItemType | undefined {
		for (let i = 0; i < nav.length; i += 1) {
			const item = nav[i];
			if (item.id === id) {
				return item;
			}

			if (item.children) {
				const childItem = this.selectById(item.children, id);
				if (childItem) {
					return childItem;
				}
			}
		}

		return undefined;
	}

	static appendNavItem(
		nav: TemplehsNavigationType,
		item: TemplehsNavItemType,
		parentId: string | null = null
	): TemplehsNavigationType {
		if (!parentId) {
			return [...nav, item];
		}
		return nav.map((node) => {
			if (node.id === parentId) {
				const newNode = { ...node };
				newNode.children = [...(node.children || []), item];
				return newNode;
			}
			if (node.children) {
				return { ...node, children: this.appendNavItem(node.children, item, parentId) };
			}
			return { ...node };
		});
	}

	static prependNavItem(
		nav: TemplehsNavigationType,
		item: TemplehsNavItemType,
		parentId: string | null = null
	): TemplehsNavigationType {
		if (!parentId) {
			return [item, ...nav];
		}
		return nav.map((node) => {
			if (node.id === parentId) {
				const newNode = { ...node };
				newNode.children = [item, ...(node.children || [])];
				return newNode;
			}
			if (node.children) {
				return { ...node, children: this.prependNavItem(node.children, item, parentId) };
			}
			return { ...node };
		});
	}

	static filterNavigationByPermission(nav: TemplehsNavigationType, userRole: UserType['role']): TemplehsNavigationType {
		return nav.reduce((acc: TemplehsNavigationType, item) => {
			// If item has children, recursively filter them
			const children = item.children ? this.filterNavigationByPermission(item.children, userRole) : [];

			if (this.hasPermission(item.auth, userRole) || children.length) {
				const newItem = { ...item };
				newItem.children = children.length ? children : undefined;
				acc.push(newItem);
			}

			return acc;
		}, []);
	}

	/**
	 * The removeNavItem function removes a navigation item by its ID.
	 */
	static removeNavItem(nav: TemplehsNavigationType, id: string): TemplehsNavigationType {
		return nav.reduce((acc, node) => {
			if (node.id !== id) {
				if (node.children) {
					acc.push({
						...node,
						children: this.removeNavItem(node.children, id)
					});
				} else {
					acc.push(node);
				}
			}
			return acc;
		}, [] as TemplehsNavigationType);
	}

	/**
	 * The updateNavItem function updates a navigation item by its ID with new data.
	 */
	static updateNavItem(nav: TemplehsNavigationType, id: string, item: PartialDeep<TemplehsNavItemType>): TemplehsNavigationType {
		return nav.map((node) => {
			if (node.id === id) {
				return _.merge({}, node, item); // merge original node data with updated item data
			}
			if (node.children) {
				return {
					...node,
					children: this.updateNavItem(node.children, id, item)
				};
			}
			return node;
		});
	}

	/**
	 *  Convert to flat navigation
	 */
	static getFlatNavigation(navigationItems: TemplehsNavigationType = [], flatNavigation = []) {
		for (let i = 0; i < navigationItems.length; i += 1) {
			const navItem = navigationItems[i];

			if (navItem.type === 'item') {
				const _navtItem = TemplehsNavItemModel(navItem);
				flatNavigation.push(_navtItem);
			}

			if (navItem.type === 'collapse' || navItem.type === 'group') {
				if (navItem.children) {
					this.getFlatNavigation(navItem.children, flatNavigation);
				}
			}
		}
		return flatNavigation as TemplehsNavigationType | [];
	}

	static hasPermission(authArr: string[] | string | undefined, userRole: UserType['role']): boolean {
		/**
		 * If auth array is not defined
		 * Pass and allow
		 */
		if (authArr === null || authArr === undefined) {
			// console.info("auth is null || undefined:", authArr);
			return true;
		}

		if (authArr.length === 0) {
			/**
			 * if auth array is empty means,
			 * allow only user role is guest (null or empty[])
			 */
			// console.info("auth is empty[]:", authArr);
			return !userRole || userRole.length === 0;
		}

		/**
		 * Check if user has grants
		 */
		// console.info("auth arr:", authArr);
		/*
            Check if user role is array,
            */
		if (userRole && Array.isArray(authArr) && Array.isArray(userRole)) {
			return authArr.some((r: string) => userRole.indexOf(r) >= 0);
		}

		/*
            Check if user role is string,
            */
		return authArr.includes(userRole as string);
	}
}

export default TemplehsNavigationHelper;
