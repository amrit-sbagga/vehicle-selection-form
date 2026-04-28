import styles from "./ResponseCard.module.css";

type Props = {
  title: string;
  content: string;
};

function ResponseCard({ title, content }: Props) {
  if (!content) return null;

  return (
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      <pre className={styles.content}>{content}</pre>
    </div>
  );
}

export default ResponseCard;