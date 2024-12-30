import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    displayName: string;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ default: 0 })
    loginCount: number;

    @Column({ nullable: true, type: 'timestamp' })
    lastLogin: Date;

    @Column({ nullable: true, type: 'timestamp' })
    lastLogout: Date;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
