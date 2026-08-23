import { Suspense, type ComponentType, type ReactNode } from 'react';

interface LazySectionProps {
  id: string;
  component: ComponentType;
  fallback?: ReactNode;
}

export default function LazySection({ id, component: Component, fallback }: LazySectionProps) {
  return (
    <section id={id} className="min-h-[12rem]">
      <Suspense fallback={fallback ?? <div className="min-h-[12rem]" aria-hidden="true" />}>
        <Component />
      </Suspense>
    </section>
  );
}
