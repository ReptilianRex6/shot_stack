export type PasswordRequirement = {
	regex: RegExp;
	text: string;
};

const DEFAULT_REQUIREMENTS: readonly PasswordRequirement[] = [
	{ regex: /.{8,}/, text: 'At least 8 characters' },
	{ regex: /[0-9]/, text: 'At least 1 number' },
	{ regex: /[a-z]/, text: 'At least 1 lowercase letter' },
	{ regex: /[A-Z]/, text: 'At least 1 uppercase letter' }
] as const;

export function usePasswordStrength(options: {
	id: string;
	initialPassword?: string;
	requirements?: PasswordRequirement[];
}) {
	let password = $state(options.initialPassword ?? '');
	let isVisible = $state(false);
	const id = options.id;
	const requirements = options.requirements || DEFAULT_REQUIREMENTS;

	const toggleVisibility = () => {
		isVisible = !isVisible;
	};

	const strength = $derived(
		requirements.map((req) => ({
			met: req.regex.test(password),
			text: req.text
		}))
	);

	const strengthScore = $derived(strength.filter((req) => req.met).length);

	const getStrengthColor = () => {
		if (strengthScore === 0) return 'bg-border';
		if (strengthScore <= 1) return 'bg-red-500';
		if (strengthScore <= 2) return 'bg-orange-500';
		if (strengthScore === 3) return 'bg-amber-500';
		return 'bg-emerald-500';
	};

	const getStrengthText = () => {
		if (strengthScore === 0) return 'Enter a password';
		if (strengthScore <= 2) return 'Weak password';
		if (strengthScore === 3) return 'Medium password';
		return 'Strong password';
	};

	return {
		get password() { return password; },
		set password(value: string) { password = value; },
		get isVisible() { return isVisible; },
		toggleVisibility,
		id,
		requirements,
		get strength() { return strength; },
		get strengthScore() { return strengthScore; },
		get strengthColor() { return getStrengthColor(); },
		get strengthText() { return getStrengthText(); }
	};
}
