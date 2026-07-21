export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg-start disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const variants = {
    primary: 'bg-brand-primary hover:bg-brand-primary-hover text-white shadow-lg shadow-brand-primary/25 border border-brand-primary/20 focus:ring-brand-primary',
    secondary: 'bg-brand-card hover:bg-brand-card-hover text-brand-text border border-brand-border hover:border-brand-border-hover focus:ring-brand-border',
    danger: 'bg-brand-error hover:bg-brand-error/90 text-white shadow-lg shadow-brand-error/25 border border-brand-error/20 focus:ring-brand-error',
    ghost: 'bg-transparent hover:bg-white/5 text-brand-text-muted hover:text-brand-text focus:ring-white/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      
      {!loading && Icon && iconPosition === 'left' && (
        <Icon className="h-[1.15em] w-[1.15em]" />
      )}
      
      <span>{children}</span>
      
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="h-[1.15em] w-[1.15em]" />
      )}
    </button>
  );
}
