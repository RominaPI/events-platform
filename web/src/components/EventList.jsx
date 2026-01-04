import { useEffect, useState } from 'react';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows')
      .then(res => {
        if (!res.ok) {
          throw new Error('Error al cargar datos');
        }
        return res.json();
      })
      .then(data => {
        setEvents(data.slice(0, 10));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando eventos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Eventos</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
