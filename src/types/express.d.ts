import { User as UserEntity } from '../entities/User';

declare global {
    namespace Express {
        interface User extends UserEntity {}
    }
}