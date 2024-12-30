import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserData1703900000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add basic user data columns
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD COLUMN "intraId" INTEGER,
            ADD COLUMN "level" DECIMAL(5,2),
            ADD COLUMN "correction_point" INTEGER DEFAULT 0,
            ADD COLUMN "wallet" INTEGER DEFAULT 0,
            ADD COLUMN "location" VARCHAR,
            ADD COLUMN "pool_year" VARCHAR,
            ADD COLUMN "pool_month" VARCHAR,
            ADD COLUMN "is_staff" BOOLEAN DEFAULT false
        `);

        // Create user_achievements table
        await queryRunner.query(`
            CREATE TABLE "user_achievements" (
                "id" SERIAL PRIMARY KEY,
                "userId" VARCHAR NOT NULL,
                "achievementId" INTEGER NOT NULL,
                "name" VARCHAR NOT NULL,
                "description" TEXT,
                "tier" VARCHAR,
                "kind" VARCHAR,
                "obtainedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "fk_userachievements_user" FOREIGN KEY ("userId") 
                    REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);

        // Create indexes
        await queryRunner.query(`
            CREATE INDEX "idx_users_intraId" ON "users"("intraId");
            CREATE INDEX "idx_users_level" ON "users"("level");
            CREATE INDEX "idx_userachievements_userId" ON "user_achievements"("userId");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_userachievements_userId"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_users_level"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_users_intraId"`);

        // Drop tables
        await queryRunner.query(`DROP TABLE IF EXISTS "user_achievements"`);

        // Remove columns from users table
        await queryRunner.query(`
            ALTER TABLE "users"
            DROP COLUMN IF EXISTS "intraId",
            DROP COLUMN IF EXISTS "level",
            DROP COLUMN IF EXISTS "correction_point",
            DROP COLUMN IF EXISTS "wallet",
            DROP COLUMN IF EXISTS "location",
            DROP COLUMN IF EXISTS "pool_year",
            DROP COLUMN IF EXISTS "pool_month",
            DROP COLUMN IF EXISTS "is_staff"
        `);
    }
}
