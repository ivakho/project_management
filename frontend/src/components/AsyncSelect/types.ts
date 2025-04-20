export interface IAsyncSelectProps {
  label: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  options: { title: string; value: string | number }[];
  loading?: boolean;
}
