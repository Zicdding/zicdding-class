export function Star({ className, ...props }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 39 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>star</title>
      <path
        d="M31.842 37.1582L20.0003 30.8748L8.15866 37.1582L10.3337 24.1082L0.666992 14.6832L13.9587 12.7498L19.7587 0.666504L25.5587 12.7498L38.8503 14.6832L29.667 24.1082L31.842 37.1582Z"
        fill="currentColor"
      />
    </svg>
  );
}
