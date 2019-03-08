
import { signupStep } from '../interfaces/signupStep';

export const SIGNUP_STEPS: signupStep[] = [
	{title: 'Identité', values: ['Prénom', 'Nom']},
	{title: 'Contact', values: ['Email', 'Telephone']},
	{title: 'Compte', values: ['Motdepasse', 'Role']},
	{title: 'Validation', values: ['code']}
];
