import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1703943000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop existing table if it exists
        await queryRunner.query(`DROP TABLE IF EXISTS "users" CASCADE`);

        // Create users table with correct schema
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" VARCHAR PRIMARY KEY,
                "username" VARCHAR NOT NULL,
                "email" VARCHAR,
                "displayName" VARCHAR,
                "imageUrl" VARCHAR,
                "loginCount" INTEGER DEFAULT 0,
                "lastLogin" TIMESTAMP,
                "lastLogout" TIMESTAMP,
                "isActive" BOOLEAN DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

        // Create indexes
        await queryRunner.query(`
            CREATE INDEX "idx_users_username" ON "users"("username");
            CREATE INDEX "idx_users_email" ON "users"("email");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "users" CASCADE`);
    }
}
