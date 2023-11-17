import { app } from './app.js';

const port = process.env.PORT;

// app.listen(port, () => {
//   console.log(`Server is up on port ${port}`);
// });

app.listen(3000, () => {
  console.log(`Server is up on port 3000`);
});