import * as yup from 'yup';

export const formSchema = () => {
	return yup.object().shape({
		name: yup.string().min(1).max(30).required('Name is required'),
		symbol: yup.string().min(1).max(30).required('Symbol is required'),
		description: yup.string().max(300),
		media: yup.mixed().required('Media is required'),
		price: yup.number().min(0.000000001).max(1000000000000),
		period: yup
			.object({
				start: yup.date(),
				end: yup.date(),
			})
			.optional(),
		mintLimitPerAddress: yup.number(),
		payoutAddress: yup.string().required('Payout is required in order to get royalty'),
	});
};
