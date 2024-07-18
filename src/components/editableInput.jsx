import { useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';


/**
 * EditableInput is a React component that allows the user to edit a value. It renders an input field when in editing mode, and a paragraph with the current value when not in editing mode.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.initialValue - The initial value of the input field.
 * @param {string} props.placeholder - The placeholder text to display when the input field is empty.
 * @param {string} props.className - The CSS class name to apply to the input field or paragraph.
 * @param {string} props.property - The property name to use when calling the onChange callback.
 * @param {function} props.onChange - The callback function to call when the input value changes.
 * @return {JSX.Element} The EditableInput component.
 */
const EditableInput = ({ initialValue, placeholder, className, property, onChange }) => {
	const [value, setValue] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	/**
	 * A function that handles the input change event.
	 *
	 * @param {Event} e - The event object triggered by the input change.
	 * @return {void} No return value.
	 */
	const handleInputChange = (e) => {
		setValue(e.target.value);
		onChange(property, e.target.value);
	};

	/**
	 * A function that handles blur event to set editing state to false.
	 *
	 * @return {void} No return value.
	 */
	const handleBlur = () => {
		setIsEditing(false);
	};

	/**
	 * A function that handles key down event and triggers editing completion on 'Enter' key.
	 *
	 * @param {Event} e - The event object triggered by the key down.
	 * @return {void} No return value.
	 */
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
				<p
					className={`${className} cursor-pointer p-1 border border-gray-600 border-dashed w-fit`}
				>
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
