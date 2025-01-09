"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center py-8">
      <h2 className="text-red-500 text-lg font-semibold">Something went wrong!</h2>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}
