
import { signupStep } from '../interfaces/signupStep';

export const SIGNUP_STEPS :signupStep[] = [
	{title: 'Entity', values: ['firstname', 'lastname']},
	{title: 'Contact', values: ['username', 'telephone']},
	{title: 'Account', values: ['password', 'role']},
	{title: 'Valider', values: ['code']}
];
