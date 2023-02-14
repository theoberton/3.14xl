import * as yup from 'yup';

export const formSchema = () => {
	return yup.object().shape({
		name: yup.string().min(1).max(30).required('Name is required'),
		symbol: yup.string().min(1).max(30).required('Symbol is required'),
		description: yup.string().max(300),
		media: yup.mixed().required('Media is required'),
		price: yup.number().min(0.000000001).max(1000000000000),
		validity: yup
			.object({
				start: yup.date().typeError('Invalid date provided'),
				end: yup.date().typeError('Invalid date provided'),
			})
			.optional(),
		// payoutAddress: yup.string().required('Payout is required in order to get royalty'),
	});
};
