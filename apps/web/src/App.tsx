import { useState, type FormEvent } from 'react';

export function App() {
  const [request, setRequest] = useState('');
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(request.trim());
  }

  return (
    <main>
      <h1>Hotel Agent</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="request">What are you looking for?</label>
        <textarea
          id="request"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder="A double room in City X for 12–14 March, under £150 a night, near the station"
        />
        <button type="submit" disabled={!request.trim()}>
          Find a hotel
        </button>
      </form>
      {submitted && <p role="status">Request received: {submitted}</p>}
    </main>
  );
}
