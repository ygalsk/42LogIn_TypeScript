import { User } from '../entities/User';
import AppDataSource from '../config/database';
import { Entity, PrimaryGeneratedColumn, Column, Repository } from 'typeorm';

@Entity('activity')
class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    action: string;

    @Column({ type: 'json', nullable: true })
    details: any;

    @Column()
    timestamp: Date;
}

export class AuthService {
    private userRepository: Repository<User>;
    private activityRepository: Repository<Activity>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
        this.activityRepository = AppDataSource.getRepository(Activity);
    }

    async validateUser(profile: any): Promise<User> {
        try {
            let user = await this.userRepository.findOne({
                where: { id: profile.id }
            });

            if (!user) {
                user = this.userRepository.create({
                    id: profile.id,
                    username: profile.username,
                    email: profile.emails?.[0]?.value,
                    lastLogin: new Date(),
                    loginCount: 1
                });
            } else {
                user.lastLogin = new Date();
                user.loginCount = (user.loginCount || 0) + 1;
            }

            await this.userRepository.save(user);
            return user;
        } catch (error) {
            console.error('Error in validateUser:', error);
            throw error;
        }
    }

    async getUserById(id: string): Promise<User | null> {
        try {
            return await this.userRepository.findOne({
                where: { id }
            });
        } catch (error) {
            console.error('Error in getUserById:', error);
            throw error;
        }
    }

    async logoutUser(userId: string): Promise<void> {
        try {
            await this.userRepository.update(userId, {
                lastLogout: new Date()
            });
            await this.logActivity(userId, 'LOGOUT');
        } catch (error) {
            console.error('Error in logoutUser:', error);
            throw error;
        }
    }

    async logActivity(userId: string, action: string, details?: any) {
        try {
            await this.activityRepository.save({
                userId,
                action,
                details,
                timestamp: new Date()
            });
        } catch (error) {
            console.error('Error logging activity:', error);
        }
    }
}