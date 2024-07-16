import { useState } from 'react';
import PropTypes from 'prop-types';

export default function ImageFileUpload({ value, onImageUpload }) {
	const [imagePreview, setImagePreview] = useState(value);

	const handleFileChange = (event) => {
        const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
                setImagePreview(reader.result);
                onImageUpload(file)
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<>
			{imagePreview && (
				<div className='mx-auto rounded-full overflow-hidden bg-gray-200 w-48 h-48'>
					<img
						src={imagePreview}
						alt='Uploaded'
						className='w-full h-full object-cover'
					/>
				</div>
			)}
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
    value: PropTypes.string.isRequired,
    onImageUpload: PropTypes.func.isRequired
}
