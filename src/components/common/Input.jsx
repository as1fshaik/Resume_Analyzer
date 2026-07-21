import { useId } from 'react';

export default function Input({
  label,
  error,
  className = '',
  icon: Icon,
  disabled = false,
  id,
  ...props
}) {
  const reactId = useId();
  const inputId = id || reactId;

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-brand-text-muted tracking-wide"
        >
          {label}
        </label>
      )}
      
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-brand-text-dim pointer-events-none">
            <Icon className="h-4 w-4" />
          </div>
        )}
        
        <input
          id={inputId}
          disabled={disabled}
          className={`w-full bg-brand-bg-start text-brand-text text-sm rounded-xl border border-brand-border py-2.5 transition-all duration-200 outline-none placeholder:text-brand-text-dim focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 disabled:opacity-50 disabled:cursor-not-allowed
            ${Icon ? 'pl-10' : 'pl-4'} 
            ${error ? 'border-brand-error focus:border-brand-error focus:ring-brand-error/50' : ''}`}
          {...props}
        />
      </div>
      
      {error && (
        <span className="text-[11px] font-medium text-brand-error tracking-wide">
          {error}
        </span>
      )}
    </div>
  );
}
