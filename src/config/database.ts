import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Activity } from '../entities/Activity'; // Create this file

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'ft_oauth',
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    entities: [User, Activity],
    migrations: [__dirname + '/../migrations/*.{ts,js}'],
});

export default AppDataSource;