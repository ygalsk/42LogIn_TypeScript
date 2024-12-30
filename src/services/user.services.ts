import { User } from '../entities/User';
import { AppDataSource } from '../config/database';
import { Repository } from 'typeorm';

interface ProfileUpdateData {
    displayName?: string;
    bio?: string;
    language?: string;
}

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async findById(id: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { id }
        });
    }

    async updateProfile(userId: string, data: ProfileUpdateData): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            throw new Error('User not found');
        }

        Object.assign(user, data);
        return await this.userRepository.save(user);
    }

    async findOrCreate(userData: Partial<User>): Promise<User> {
        if (!userData.id) {
            throw new Error('User ID is required');
        }

        let user = await this.userRepository.findOne({
            where: { id: userData.id }
        });

        if (!user) {
            user = this.userRepository.create(userData);
        } else {
            Object.assign(user, userData);
        }

        return await this.userRepository.save(user);
    }
}
