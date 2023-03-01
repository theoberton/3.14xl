import * as yup from 'yup';

export const formSchema = () => {
	return yup.object().shape({
		name: yup.string().min(1).max(80).required('Name is required'),
		symbol: yup.string().min(1).max(30).required('Symbol is required'),
		description: yup.string().max(300),
		media: yup.mixed().required('Media is required'),
		price: yup
			.string()
			.test(
				'Is positive?',
				'Price should be equal or more than zero',
				(value: string | undefined) => Number(value) >= 0
			),
		royalty: yup
			.string()
			.test(
				'Is between 0 and 100',
				'Royalty should be set between 0 and 100%',
				(value: string | undefined) => Number(value) >= 0 && Number(value) <= 100
			),
		validity: yup
			.object({
				start: yup.date().typeError('Invalid date provided').nullable(),
				end: yup.date().typeError('Invalid date provided').nullable(),
			})
			.optional(),
		payoutAddress: yup.string().required('Payout is required in order to get royalty'),
	});
};