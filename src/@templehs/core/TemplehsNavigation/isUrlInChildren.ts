import { Pathname } from 'history';
import { TemplehsNavItemType } from './types/TemplehsNavItemType';

/**
 * Determines whether a given URL is present in the parent's child list or not.
 */
const isUrlInChildren = (parent: TemplehsNavItemType, url: Pathname) => {
	if (!parent.children) {
		return false;
	}

	for (let i = 0; i < parent.children.length; i += 1) {
		if (parent.children[i].children) {
			if (isUrlInChildren(parent.children[i], url)) {
				return true;
			}
		}

		if (parent.children[i].url === url || url.includes(parent.children[i].url)) {
			return true;
		}
	}

	return false;
};

export default isUrlInChildren;
