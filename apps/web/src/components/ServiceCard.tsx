import { Button } from '@all-service-hemma/ui';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export function ServiceCard({ title, description, icon, className = '' }: ServiceCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {icon && <div className="mb-4 text-primary-600">{icon}</div>}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button variant="outline" size="sm" className="w-full">
        Learn More
      </Button>
    </div>
  );
}
 