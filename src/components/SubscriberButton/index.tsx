import { signIn, useSession } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscriberButton {
  priceId: string;
}

export function SubscriberButton ({ priceId }: SubscriberButton) {
  const [session] = useSession();

  async function handleSubscribe() {
    if(!session) {
      signIn('github');
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