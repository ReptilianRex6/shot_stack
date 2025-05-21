import { getContext, setContext } from 'svelte';

const LOCALE_CONTEXT_KEY = Symbol('ctx:locale');
interface LocaleOptions {
	locale?: string;
}

export function useLocale(options: LocaleOptions = {}): { locale: string } {
	const contextLocale = getContext<{ locale: string } | undefined>(LOCALE_CONTEXT_KEY);

	if (contextLocale) {
		return contextLocale;
	}

	let locale = $state(options.locale ?? getDefaultLocale());

	const localeManager = {
		get locale() {
			return locale;
		},
		set locale(value: string) {
			locale = value;
		}
	};

	setContext(LOCALE_CONTEXT_KEY, localeManager);

	return localeManager;
}

function getDefaultLocale(): string {
	if (typeof navigator !== 'undefined' && navigator.language) {
		return navigator.language;
	}
	return 'en-US';
}
