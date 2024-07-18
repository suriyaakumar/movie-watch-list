import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


/**
 * Renders an image upload component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.value - The initial image value.
 * @param {Function} props.onImageUpload - The callback function to handle image upload.
 * @return {JSX.Element} The rendered image upload component.
 */
export default function ImageFileUpload({ value, onImageUpload }) {
	const [imagePreview, setImagePreview] = useState('');

	useEffect(() => {
		if (value) {
			setImagePreview(value);
		}
	}, [value]);

	/**
	 * Handles the change event for file input.
	 *
	 * @param {Event} event - The event object for the file input change.
	 * @return {void}
	 */
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
				onImageUpload(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<>
			<div className='mx-auto rounded-full overflow-hidden bg-gray-200 w-48 h-48'>
				{imagePreview && (
					<img
						src={imagePreview}
						alt='Uploaded'
						className='w-full h-full object-cover'
					/>
				)}
			</div>
			<label
				htmlFor='fileInput'
				className='cursor-pointer px-4 py-2 mx-auto bg-red-600 text-white hover:bg-red-700 rounded'
			>
				<div className='flex items-center'>
					<span className='font-medium'>Upload</span>
				</div>
				<input
					id='fileInput'
					name='fileInput'
					type='file'
					className='sr-only'
					onChange={handleFileChange}
				/>
			</label>
		</>
	);
}

ImageFileUpload.propTypes = {
	value: PropTypes.string,
	onImageUpload: PropTypes.func.isRequired,
};
