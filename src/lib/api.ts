export async function getOpenAiResponse(input: string): Promise<string> {
  const res = await fetch('/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al llamar a OpenAI');
  }

  const data = await res.json();
  return data.result;
}
