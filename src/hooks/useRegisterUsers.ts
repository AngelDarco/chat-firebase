import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';
import { intLoginUserData } from '../types';

const useRegisterUsers = () => {
	const auth = getAuth();

	const createAcountWithEmail = async ({email,password}:intLoginUserData) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			return userCredential.user;
		} catch (err) {
			return err;
		}
	};

	return { createAcountWithEmail };
};
export default useRegisterUsers;