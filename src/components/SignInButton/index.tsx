import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/client';

import styles from './styles.module.scss';

export function SignInButton () {
  const [session] = useSession();

  console.log(session);

  return session ? (
    <button 
      className={styles.signInButton} 
      type="button"
      onClick={() => signOut()}
    >
      <FaGithub color="#04d301" />
      {session.user.name}
      <FiX className={styles.rightIcon} />
    </button>
  ) : (
    <button 
      className={styles.signInButton} 
      type="button"
      onClick={() => signIn('github')}
    >
      <FaGithub color="#eba417"  />
      LogIn in with Github
    </button>
  );
}