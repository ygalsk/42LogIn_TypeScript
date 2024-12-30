import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'ft_oauth',
    synchronize: false, // Set to false for production
    logging: true,
    entities: [User],
    migrations: [__dirname + '/../migrations/*.{ts,js}'],
});
