import { Session } from 'next-auth';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscriberButton {
  priceId: string;
}

interface ISession extends Session {
  activeSubscription?: null | string;
}

export function SubscriberButton ({ priceId }: SubscriberButton) {
  const [session] = useSession();
  const typedSession: ISession = session;
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }

    if (typedSession.activeSubscription) {
      router.push('/posts');
      return;
    }

    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;
      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.log('error', error.response.data)
      alert(error.message);
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      type="button"
      className={styles.subscriberButton}
    >Subscriber now</button>
  );
}