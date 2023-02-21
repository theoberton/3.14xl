import { useField, useFormikContext } from 'formik';
import { useRef, useCallback, ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import { ThirdwebStorage } from '@thirdweb-dev/storage';
import crossIcon from '@/assets/images/svg/common/crossIcon.svg';
import uploadIcon from '@/assets/images/svg/common/uploadIcon.svg';

import { LoaderSizes } from '@/components/interfaces';
import { Loader } from '@/components';

import styles from '@/components/MediaInput/styles.module.scss';

import { useCustomStateFormField } from '@/hooks/useCustomStateFormField';

const storage = new ThirdwebStorage();

interface Props {
	placeholder?: string;
	name: string;
	className?: string;
	label?: string;
	isSubmitting?: boolean;
	disabled?: boolean;
}

export function MediaInput(props: Props) {
	const { name, placeholder, label, disabled } = props;
	const [field] = useField(name);
	const [isMediaUploading, setIsMediaUploadingStatus] = useState(false);

	const fileRef = useRef<HTMLInputElement>(null);
	const minifiedImageRef = useRef<HTMLImageElement>(null);

	const { value, name: fieldName, onChange } = field;
	const { setFieldValue, status } = useFormikContext();

	const { onFocus, onBlur, getError } = useCustomStateFormField(fieldName);

	const fieldType = 'text';

	const inputIconClass = classNames({
		[styles.inputIcon]: true,
	});

	const onSelectFile = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files && e.target.files[0];

			if (!file) {
				return;
			}

			try {
				setIsMediaUploadingStatus(true);

				const ipfsLink = await storage.upload(file);
				const fileLink =  storage.resolveScheme(ipfsLink);
				console.log('fileLink', fileLink);

				setFieldValue(name, fileLink);
			} catch (e) {
				console.log('e', e);
			} finally {
				setIsMediaUploadingStatus(false);
			}
		},
		[minifiedImageRef.current]
	);

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

	return (
		<div className={inputContainerClass}>
			{label && (
				<label htmlFor={fieldName} className={inputLabelClass}>
					{label}
				</label>
			)}
			<input
				ref={fileRef}
				onChange={onSelectFile}
				accept="image/jpeg,image/png,image/gif,image/jpg"
				type="file"
				hidden
			/>
			<div className={inputWrapperClass} onClick={handleAddMediaFileClick}>
				{value && <img ref={minifiedImageRef} className={styles.inputMinifiedImage} src={value} />}
				<input
					disabled
					className={styles.input}
					onFocus={onFocus}
					onBlur={onBlur}
					type={fieldType}
					placeholder={placeholder}
					value={field.value || ''}
				/>
				<img src={inputIcon} className={inputIconClass} onClick={handleInputClick} />
				{
					<div className={styles.inputLoader}>
						{isMediaUploading && <Loader size={LoaderSizes.small} />}
					</div>
				}
			</div>
			{error && <div className={styles.inputError}>{error}</div>}
		</div>
	);
}

export default MediaInput;
