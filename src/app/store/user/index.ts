import { TemplehsSettingsConfigType } from "@templehs/core/TemplehsSettings/TemplehsSettings";

/**
 * The type definition for a user object.
 */
export type UserType = {
	role: string[];
	data: {
		displayName: string;
		photoURL?: string;
		email?: string;
		shortcuts?: string[];
		settings?: Partial<TemplehsSettingsConfigType>;
	};
	loginRedirectUrl?: string;
};
