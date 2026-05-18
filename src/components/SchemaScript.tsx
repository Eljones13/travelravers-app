// TRAVEL RAVERS: JSON-LD SCHEMA INJECTOR
// Renders a <script type="application/ld+json"> tag for structured data.
// No wrapper element — just the raw script tag so it doesn't affect layout.

interface SchemaScriptProps {
  schema: Record<string, unknown>;
}

export default function SchemaScript({ schema }: SchemaScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
