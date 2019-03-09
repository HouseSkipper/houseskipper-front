import { signupStep } from '../interfaces/signupStep';

export const SIGNUP_STEPS: signupStep[] = [
	{title: 'Identité', values: ['firstname', 'lastname']},
	{title: 'Contact', values: ['username', 'telephone']},
	{title: 'Compte', values: ['password', 'role']},
	{title: 'Validation', values: ['code']}
];
