import { on } from 'svelte/events';
import { createSubscriber } from 'svelte/reactivity';

export function useLocalStorage<T extends object>(key: string, initial?: T) {
	const value = initial;
	let updateCallback: (() => void) | undefined;

	const subscribe = createSubscriber((update) => {
		updateCallback = update;
		return on(window, 'storage', (e) => {
			if (e.storageArea !== localStorage) return;
			if (e.key !== key) return;
			update();
		});
	});

	if (typeof localStorage !== 'undefined') {
		if (localStorage.getItem(key) === null && initial !== undefined) {
			localStorage.setItem(key, JSON.stringify(initial));
		}
	}

	const getCurrent = (): T => {
		subscribe();

		const root = typeof localStorage !== 'undefined'
			? JSON.parse(localStorage.getItem(key) || '{}') as T
			: value as T;

		const proxies = new WeakMap<object, T>();

		const proxy = (val: T | unknown): T | unknown => {
			if (typeof val !== 'object' || val === null) {
				return val;
			}

			let p = proxies.get(val as object);

			if (!p) {
				p = new Proxy(val as T, {
					get: (target, property) => {
						subscribe();
						return proxy(Reflect.get(target, property));
					},
					set: (target, property, newValue) => {
						Reflect.set(target, property, newValue);

						if (typeof localStorage !== 'undefined') {
							localStorage.setItem(key, JSON.stringify(root));
						}

						updateCallback?.();
						return true;
					}
				}) as T;

				proxies.set(val as object, p);
			}

			return p;
		};

		return proxy(root) as T;
	};

	const setCurrent = (newValue: T) => {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(key, JSON.stringify(newValue));
		}
		updateCallback?.();
	};

	return {
		get current() {
			return getCurrent();
		},
		set current(newValue: T) {
			setCurrent(newValue);
		}
	};
}
