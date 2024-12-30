import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('activity')
export class Activity {
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