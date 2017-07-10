import { Router}              from 'express';
import user_controller        from '../controllers/user';
import * as bf                from '../helpers/basic_functions'; // types can be loaded as module

const router: Router = Router();

router.get('/', bf.wrapper((params, done) => {
  done(null, 'Running typescript api');
}));

router.get('/get-all',              bf.wrapper(user_controller.getAll));
router.get('/get-byid/:id',         bf.wrapper(user_controller.getById));
router.get('/get-byemail/:email',   bf.wrapper(user_controller.get_byEmail));


// Export the express.Router() instance to be used by server.ts
const MainRouters: Router = router;
export default MainRouters;
