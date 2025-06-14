import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface CardHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-white shadow-sm rounded-xl border border-gray-200 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  title,
  description,
  children,
}: CardHeaderProps) => {
  return (
    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export const CardContent = ({ children, className = "" }: CardContentProps) => {
  return <div className={`px-4 py-6 sm:px-6 ${className}`}>{children}</div>;
};
