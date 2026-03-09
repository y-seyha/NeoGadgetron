interface ProfileFieldProps {
  label: string;
  value: string | number;
}

export default function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 p-2 rounded-md">
      <span className="font-medium text-gray-800 dark:text-gray-200 sm:w-32">
        {label}:
      </span>
      <span className="text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-md sm:w-full break-words">
        {value}
      </span>
    </div>
  );
}
