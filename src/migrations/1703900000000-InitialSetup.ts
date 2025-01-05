import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1703900000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create users table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "users" (
                "id" VARCHAR PRIMARY KEY,
                "username" VARCHAR NOT NULL,
                "email" VARCHAR,
                "displayName" VARCHAR,
                "imageUrl" VARCHAR,
                "lastLogin" TIMESTAMP,
                "lastLogout" TIMESTAMP,
                "loginCount" INTEGER DEFAULT 0,
                "isActive" BOOLEAN DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);

        // Create sessions table
        await queryRunner.query(`
            CREATE TABLE "sessions" (
                "id" VARCHAR PRIMARY KEY,
                "userId" VARCHAR NOT NULL,
                "accessToken" TEXT NOT NULL,
                "refreshToken" TEXT,
                "expiresAt" TIMESTAMP NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "fk_sessions_user" FOREIGN KEY ("userId") 
                    REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);

        // Create indexes
        await queryRunner.query(`
            CREATE INDEX "idx_users_username" ON "users"("username");
            CREATE INDEX "idx_users_email" ON "users"("email");
            CREATE INDEX "idx_sessions_userId" ON "sessions"("userId");
            CREATE INDEX "idx_sessions_expiresAt" ON "sessions"("expiresAt");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_sessions_expiresAt"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_sessions_userId"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_users_email"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_users_username"`);

        // Drop tables
        await queryRunner.query(`DROP TABLE IF EXISTS "sessions"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
    }
}
