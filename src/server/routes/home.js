import { Router } from 'express';
import indexView from '../views';

const router = new Router();

router.get('*', (req, res) => {
  res.send(indexView);
});

router.get('/chatroom', (req, res) => {
  // res.sendFile(join(__dirname, '../views/index.html'));
  res.send(indexView);
});
export default router;
