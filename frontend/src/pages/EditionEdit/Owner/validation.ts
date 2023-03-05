import * as yup from 'yup';

export const formSchema = () => {
	return yup.object().shape({
		managerAddress: yup.string().required("Owner address is a required field"),
	});
};
