import { useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const EditableInput = ({ initialValue, placeholder, className, property, onChange }) => {
	const [value, setValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue])

	const handleInputChange = (e) => {
		setValue(e.target.value);
		onChange(property, e.target.value);
	};

	const handleBlur = () => {
		setIsEditing(false);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			setIsEditing(false);
			onChange(property, e.target.value);
		}
	};

	return (
		<div className='w-fit p-1' onClick={() => setIsEditing(true)}>
			{isEditing ? (
				<input
					type='text'
					value={value}
					onChange={handleInputChange}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					autoFocus
					className={`${className} p-1 w-fit`}
				/>
			) : (
				<p className={`${className} cursor-pointer p-1 border border-gray-600 border-dashed w-fit`}>
					{value || placeholder}
				</p>
			)}
		</div>
	);
};

EditableInput.propTypes = {
	initialValue: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	property: PropTypes.string,
	onChange: PropTypes.func
};

export default EditableInput;
