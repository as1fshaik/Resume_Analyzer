export default function Card({
  children,
  title,
  subtitle,
  className = '',
  headerAction,
  onClick,
  ...props
}) {
  const clickableStyles = onClick
    ? 'cursor-pointer hover:bg-brand-card-hover hover:border-brand-border-hover hover:shadow-glass hover:-translate-y-0.5'
    : '';

  return (
    <div
      onClick={onClick}
      className={`bg-brand-card border border-brand-border rounded-2xl shadow-card backdrop-blur-md transition-all duration-200 ${clickableStyles} ${className}`}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border">
          <div className="flex flex-col gap-1">
            {title && (
              <h3 className="text-base font-semibold text-brand-text tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-brand-text-muted">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && (
            <div className="flex items-center gap-2">
              {headerAction}
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
