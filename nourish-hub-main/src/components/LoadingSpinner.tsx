type LoadingSpinnerProps = {
  message?: string;
};

export default function LoadingSpinner({
  message = "Checking your session...",
}: LoadingSpinnerProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div
        className="flex flex-col items-center gap-4 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-16 w-16 rounded-full border-4 border-primary/15" />
          <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-transparent border-r-accent border-t-primary" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">{message}</p>
      </div>
    </main>
  );
}
