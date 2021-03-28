import styles from './styles.module.scss';

interface SubscriberButton {
  priceId: string;
}

export function SubscriberButton ({ priceId }: SubscriberButton) {
  return (
    <button 
      type="button"
      className={styles.subscriberButton}
    >Subscriber now</button>
  );
}