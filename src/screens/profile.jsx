import { useEffect, useState, useContext } from 'react';
import ImageFileUpload from '../components/imageUpload';
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/userContext';
import DatabaseContext from '../contexts/dbContext';

export default function Profile() {
	const { currentUser, updateUser } = useContext(UserContext);
	const { setUser } = useContext(DatabaseContext);
	const [profileName, setProfileName] = useState('');
	const [profileImage, setProfileImage] = useState('');

	useEffect(() => {
        document.title = 'Watchlists | Profile';
        if (currentUser) {
            setProfileName(currentUser.name);
            setProfileImage(currentUser.image);
        }
	}, [currentUser]);

	const handleProfileSave = async (e) => {
		try {
			e.preventDefault();
			if (profileName === '') throw new Error('Name cannot be empty');
			const updatedUser = {
				...currentUser,
				name: profileName,
				image: profileImage,
			};
			const dbSaveUser = await setUser(currentUser.email, updatedUser);
			if (!dbSaveUser) throw new Error('Failed to save details to database!');
			const contextSaveUser = updateUser(updatedUser);
			if (!contextSaveUser)
				throw new Error('Failed to save details to context!');
			toast.success('Profile updated successfully!');
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className='mx-auto mt-10 space-y-5'>
			<h1 className='font-black text-3xl'>Your Profile</h1>
			<form
				onSubmit={handleProfileSave}
				className='sm:px-24 md:px-36 lg:px-64 flex flex-col space-y-5'
			>
				<ImageFileUpload value={profileImage} onImageUpload={setProfileImage} />
				<label htmlFor='name'>Name</label>
				<input
					value={profileName}
					onChange={(e) => setProfileName(e.target.value)}
					name='name'
					type='text'
					placeholder='Name'
					className='focus:outline-none rounded p-2 border-2 border-gray-300'
				/>
				<label htmlFor='email'>E-mail</label>
				<input
					value={currentUser?.email}
					name='email'
					type='email'
					placeholder='email'
					className='focus:outline-none rounded p-2 bg-gray-200 border-2 border-gray-300'
                    disabled
                />
				<button className='text-white rounded p-2 bg-red-600 hover:bg-red-700'>
					Save
				</button>
			</form>
		</div>
	);
}
