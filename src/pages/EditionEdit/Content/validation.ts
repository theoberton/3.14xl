import * as yup from 'yup';
import { Address } from 'ton-core';

export const formSchema = () => {
	return yup.object().shape({
		name: yup.string().min(1).max(80).required('Name is required'),
		symbol: yup.string().min(1).max(30).required('Symbol is required'),
		description: yup.string().max(300),
		media: yup.string().required('Media is required'),
		price: yup
			.string()
			.test(
				'Is positive?',
				'Price should be equal or more than zero',
				(value: string | undefined) => Number(value) >= 0
			),
		validity: yup
			.object({
				start: yup.date().typeError('Invalid date provided').nullable(),
				end: yup.date().typeError('Invalid date provided').nullable(),
			})
			.optional(),
		payoutAddress: yup
			.string()
			.test(
				'Is Valid address',
				'Payout address should be a valid TON address',
				(value: string | undefined) => {
					if (!value) {
						return false;
					}

					try {
						Address.parse(value);
					} catch (error) {
						return false;
					}
					return true;
				}
			)
			.required('Payout address is required in order to get royalty'),
	});
};
