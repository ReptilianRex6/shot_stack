import { tick } from 'svelte';

interface CurrencyInputOptions {
	currency?: string;
	id: string;
	initialValue?: number;
	locale?: string;
	setValue?: (val: string) => void;
}

export function createCurrencyInput({
	currency = 'EUR',
	id,
	initialValue = 0,
	locale = 'de-DE',
	setValue = () => {}
}: CurrencyInputOptions) {
	let isInitialLoad = $state(true);
	let numericValue = $state(initialValue);
	let displayValue = $state('');
	let inputElement: HTMLInputElement | null = null;

	const formatter = new Intl.NumberFormat(locale, {
		currency,
		currencySign: 'accounting',
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
		style: 'currency'
	});

	function formatCurrency(amount: number): string {
		return formatter.format(amount);
	}

	function parseLocaleNumber(stringNumber: string): number {
		const decimalSeparator = ',';
		const thousandSeparator = '.';
		return Number.parseFloat(
			stringNumber.replace(thousandSeparator, '').replace(decimalSeparator, '.')
		);
	}

	function updateDisplayValue() {
		displayValue = formatCurrency(numericValue);
		setValue(displayValue);
	}

	function updateValue(rawInput: string) {
		const [integerPart, fractionalPart = ''] = rawInput.split(',');
		const limitedFractionalPart = fractionalPart.slice(0, 2);
		const limitedValue = `${integerPart},${limitedFractionalPart}`;
		const parsedValue = parseLocaleNumber(limitedValue);

		if (!Number.isNaN(parsedValue)) {
			numericValue = parsedValue;
		}
	}

	function handleBlur(event: FocusEvent) {
		const target = event.currentTarget as HTMLInputElement;
		const parsedInput = parseLocaleNumber(target.value);
		if (!Number.isNaN(parsedInput)) {
			numericValue = parsedInput;
		}
	}

	function handleFocus(event: FocusEvent) {
		const target = event.currentTarget as HTMLInputElement;
		const numericText = target.value.replace('.', ',');
		target.value = numericText;

		tick().then(() => {
			target.setSelectionRange(numericText.length, numericText.length);
		});
	}

	function handleInput(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		const cleanedInput = target.value.replace(/[^\d,]/g, '');
		const cursorPosition = target.selectionStart;

		if (!cleanedInput) {
			numericValue = 0;
			displayValue = formatCurrency(0);
			setValue(displayValue);
			return;
		}

		updateValue(cleanedInput);

		tick().then(() => {
			target.value = displayValue;
			const newCursorPosition = Math.min(cursorPosition ?? 0, target.value.length);
			target.setSelectionRange(newCursorPosition, newCursorPosition);
		});
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.ctrlKey || event.metaKey) {
			return;
		}

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				decrement(event);
				break;
			case 'ArrowUp':
				event.preventDefault();
				increment(event);
				break;
			case 'Enter':
				(event.currentTarget as HTMLInputElement).blur();
				break;
		}
	}

	function decrement(event?: KeyboardEvent | MouseEvent) {
		const step = event?.shiftKey ? 0.1 : 1;
		numericValue = Math.max(0, numericValue - step);
	}

	function increment(event?: KeyboardEvent | MouseEvent) {
		const step = event?.shiftKey ? 0.1 : 1;
		numericValue += step;
	}

	displayValue = formatCurrency(initialValue);
	setValue(displayValue);
	isInitialLoad = false;

	$effect(() => {
		if (!isInitialLoad) {
			updateDisplayValue();
		}
	});

	return {
		get displayValue() {
			return displayValue;
		},
		get value() {
			return numericValue;
		},
		set value(newValue: number) {
			numericValue = newValue;
		},
		get inputProps() {
			return {
				'aria-describedby': `${id}-description`,
				'aria-label': 'Currency amount',
				'aria-roledescription': 'Currency input',
				autocomplete: 'off',
				autocorrect: 'off',
				id,
				inputmode: 'numeric',
				onblur: handleBlur,
				onfocus: handleFocus,
				oninput: handleInput,
				onkeydown: handleKeyDown,
				spellcheck: false,
				type: 'text',
				value: displayValue
			} as const;
		},
		get decrementProps() {
			return {
				'aria-controls': id,
				'aria-description': 'Hold Shift to decrease by 10 cents',
				'aria-label': 'Decrease value',
				'aria-labelledby': id,
				id: 'decrement',
				onclick: (event: MouseEvent) => decrement(event),
				tabindex: -1
			} as const;
		},
		get incrementProps() {
			return {
				'aria-controls': id,
				'aria-description': 'Hold Shift to increase by 10 cents',
				'aria-label': 'Increase value',
				'aria-labelledby': id,
				id: 'increment',
				onclick: (event: MouseEvent) => increment(event),
				tabindex: -1
			} as const;
		}
	};
}

export function useCurrencyInput(options: CurrencyInputOptions) {
	return createCurrencyInput(options);
}
