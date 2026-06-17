const Card = ({ title, subtitle, action, className = "", children }) => {
  return (
    <section className={`panel ${className}`}>
      {(title || subtitle || action) && (
        <header className="panel-header">
          <div>
            {title ? <p className="panel-title">{title}</p> : null}
            {subtitle ? <p className="panel-subtitle">{subtitle}</p> : null}
          </div>
          {action ? <div>{action}</div> : null}
        </header>
      )}
      {children}
    </section>
  );
};

export default Card;
