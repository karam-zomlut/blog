import app from './app';
import { Server } from 'http';

const port = app.get('port');

const server: Server = app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
});
