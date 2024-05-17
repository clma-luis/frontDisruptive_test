
interface SpinnerLoadingProps {
  width?: string;
  height?: string;
  border?: string;
  color?: boolean;
}

const SpinnerLoading = (props: SpinnerLoadingProps) => {
  const { width = "8", height = "8", color } = props;


  return (
    <div
      className={`inline-block h-${width} w-${height} animate-spin rounded-full border-[3px]  border-solid border-current border-e-transparent align-[-0.125em]  motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-secondary`}
      role="status"
    />
  );
};

export default SpinnerLoading;
