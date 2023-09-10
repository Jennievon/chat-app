import React from "react";

function EmptyState({
  description,
  children,
}: {
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="empty-state">
      <p>{description}</p>
      {children}
    </div>
  );
}

export default EmptyState;
