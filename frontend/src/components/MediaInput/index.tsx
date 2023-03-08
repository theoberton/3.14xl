import { useField, useFormikContext } from 'formik';
import { useRef, useCallback, ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import { ThirdwebStorage } from '@thirdweb-dev/storage';
import crossIcon from '@/assets/images/svg/common/crossIcon.svg';
import uploadIcon from '@/assets/images/svg/common/uploadIcon.svg';
import { useMediaQuery } from 'react-responsive';

import { LoaderSizes, LoaderColors } from '@/components/interfaces';
import { Loader } from '@/components';

import styles from '@/components/MediaInput/styles.module.scss';

import { useCustomStateFormField } from '@/hooks/useCustomStateFormField';
console.log(useMediaQuery);

const storage = new ThirdwebStorage();

interface Props {
	placeholder?: string;
	name: string;
	className?: string;
	label?: string;
	disabled?: boolean;
}

export function MediaInput(props: Props) {
	const { name, placeholder, label, disabled } = props;
	const [field] = useField(name);
	const [isMediaUploading, setIsMediaUploadingStatus] = useState(false);

	const fileRef = useRef<HTMLInputElement>(null);
	const minifiedImageRef = useRef<HTMLImageElement>(null);

	const { value, name: fieldName, onChange } = field;
	const { setFieldValue, isSubmitting } = useFormikContext();

	const { onFocus, onBlur, getError } = useCustomStateFormField(fieldName);

	const fieldType = 'text';

	const inputIconClass = classNames({
		[styles.inputIcon]: true,
	});

	const onSelectFile = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			console.log('e', e);
			const file = e.target.files && e.target.files[0];

			if (!file) {
				return;
			}

			try {
				setIsMediaUploadingStatus(true);

				const ipfsLink = await storage.upload(file);
				const fileLink = storage.resolveScheme(ipfsLink);

				setFieldValue(name, fileLink);
			} catch (e) {
				console.log('e', e);
			} finally {
				setIsMediaUploadingStatus(false);
			}
		},
		[minifiedImageRef.current]
	);

	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1199.98px)' });

	const inputLabelClass = classNames({
		[styles.inputLabel]: true,
	});

	const inputWrapperClass = classNames({
		[styles.inputWrapper]: true,
	});

	const inputContainerClass = classNames({
		[styles.inputContainer]: true,
	});

	const handleAddMediaFileClick = useCallback(() => {
		if (fileRef.current) {
			fileRef.current.click();
		}
	}, [fileRef]);

	const handleClearInput = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
		e.stopPropagation();
		setFieldValue(name, undefined);
	}, []);

	const error = getError();
	const inputIcon = value ? crossIcon : uploadIcon;

	const handleInputClick = useCallback(
		(e: React.MouseEvent<HTMLImageElement>) => {
			if (disabled) return;

			const manageInputHandler = value ? handleClearInput : () => {};

			return manageInputHandler(e);
		},
		[value, disabled]
	);

	const inputClass = classNames({
		[styles.input]: true,
		[styles.inputFilled]: Boolean(value),
	});

	return (
		<div className={inputContainerClass}>
			{label && (
				<label htmlFor={fieldName} className={inputLabelClass}>
					{label}
					{isTabletOrMobile && (
						<div className={styles.inputLoaderLabel}>
							{isMediaUploading && (
								<Loader size={LoaderSizes.subSmall} color={LoaderColors.white} />
							)}
						</div>
					)}
				</label>
			)}
			<input
				ref={fileRef}
				onChange={onSelectFile}
				accept="image/jpeg,image/png,image/gif,image/jpg"
				type="file"
				disabled={disabled || isSubmitting}
				hidden
			/>
			<div className={inputWrapperClass} onClick={handleAddMediaFileClick}>
				{value && <img ref={minifiedImageRef} className={styles.inputMinifiedImage} src={value} />}
				<input
					className={inputClass}
					onFocus={onFocus}
					onBlur={onBlur}
					type={fieldType}
					placeholder={placeholder}
					value={field.value || ''}
				/>
				{!isSubmitting && (
					<img src={inputIcon} className={inputIconClass} onClick={handleInputClick} />
				)}
				{!isTabletOrMobile && (
					<div className={styles.inputLoader}>
						{isMediaUploading && <Loader size={LoaderSizes.small} color={LoaderColors.white} />}
					</div>
				)}
			</div>
			{/* {error && <div className={styles.inputError}>{error}</div>} */}
		</div>
	);
}

export default MediaInput;
