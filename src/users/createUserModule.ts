import UserController from "./userController";
import UserRepository from "./userRepository";
import UserService from "./userService";

export const createUserModule = () => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository); 
    const userController = new UserController(userService);
    return userController;
}
  