import { FormEvent, useRef } from 'react';
import userContexUpdate from '../../utils/userContextUpdate';
import styles from './loginGuests.module.css';

const loginGuests = (): JSX.Element => {
	// get the state to change context values
	const { userContextData, updateUserContext } = userContexUpdate();
	const { login } = userContextData();

	const usernameRef = useRef<HTMLInputElement>(null);
	const alertRef = useRef<HTMLLabelElement>(null);

	const handlerUserName = (e: FormEvent) => {
		e.preventDefault();
		if (usernameRef.current && alertRef.current) {

			const text = usernameRef?.current.value;
			const alert = alertRef?.current;

			// Verify the nickname most be more than 3 letters
			if (text.trim() === '') {
				(e.target as HTMLFormElement).reset();
				alert.innerHTML = 'Please enter a valid username';
				setTimeout(() => {
					alert.textContent = '';
				}, 3000);
				return;

			} else if (text.length < 3 && alert) {
				alert.innerHTML = 'Please choose an username with more than 3 letters';
				setTimeout(() => {
					alert.textContent = '';
				}, 3000);
				return;
			}
			else if (text.length > 12) {
				alert.innerHTML = 'Please choose an username with less than 12 letters';
				setTimeout(() => {
					alert.textContent = '';
				}, 3000);
				return;

			}

			// Change the properties in the context 
			if (login)
				updateUserContext(
					{
						...login,
						userName: text 
					});
		}

	};

	return (
		<div className={styles.userNameContainer}>
			<form onSubmit={handlerUserName}>
				<input type="text" ref={usernameRef} placeholder='Choose an username' />
				<button>Go!</button>
			</form>
			<label ref={alertRef}></label>
		</div>
	);
};
export default loginGuests;