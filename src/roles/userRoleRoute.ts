import { Router } from 'express';
import { schemaValidator } from '../shared/auth/schemaValidatorMiddleware';
import { creationUserRoleSchema } from './userRoleSchema/userRoleSchema';
import { createUserRoleModule } from './createUserRoleModule';

const router = Router();

const userRoleController = createUserRoleModule();

router.post('/roles', schemaValidator(creationUserRoleSchema), userRoleController.createRole);

router.get('/roles', userRoleController.getAllRoles);

router.get('/roles/:id', userRoleController.getRoleById);

router.put('/roles/:id', userRoleController.updateRole);

router.delete('/roles/:id', userRoleController.deleteRole);

export const UserRoleRoutes = router;