interface AboutProps {
  description: string;
}

export function About({ description }: AboutProps) {
  return (
    <section className="space-y-8">
      <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
        <p className="text-lg">{description}</p>
      </div>
    </section>
  );
}
