import { MigrationInterface, QueryRunner } from "typeorm";

export class ExpandTables1703900000002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create projects table
        await queryRunner.query(`
            CREATE TABLE "projects" (
                "id" SERIAL PRIMARY KEY,
                "userId" VARCHAR NOT NULL,
                "projectId" INTEGER NOT NULL,
                "name" VARCHAR NOT NULL,
                "status" VARCHAR NOT NULL,
                "final_mark" INTEGER,
                "validated" BOOLEAN,
                "marked_at" TIMESTAMP,
                "started_at" TIMESTAMP,
                "finished_at" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "fk_projects_user" FOREIGN KEY ("userId") 
                    REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);

        // Create coalitions table
        await queryRunner.query(`
            CREATE TABLE "coalitions" (
                "id" SERIAL PRIMARY KEY,
                "userId" VARCHAR NOT NULL,
                "coalitionId" INTEGER NOT NULL,
                "name" VARCHAR NOT NULL,
                "slug" VARCHAR NOT NULL,
                "score" INTEGER DEFAULT 0,
                "color" VARCHAR,
                "imageUrl" VARCHAR,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "fk_coalitions_user" FOREIGN KEY ("userId") 
                    REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);

        // Create skills table
        await queryRunner.query(`
            CREATE TABLE "skills" (
                "id" SERIAL PRIMARY KEY,
                "userId" VARCHAR NOT NULL,
                "name" VARCHAR NOT NULL,
                "level" DECIMAL(5,2) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "fk_skills_user" FOREIGN KEY ("userId") 
                    REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);

        // Add indexes
        await queryRunner.query(`
            CREATE INDEX "idx_projects_userId" ON "projects"("userId");
            CREATE INDEX "idx_projects_status" ON "projects"("status");
            CREATE INDEX "idx_coalitions_userId" ON "coalitions"("userId");
            CREATE INDEX "idx_skills_userId" ON "skills"("userId");
            CREATE INDEX "idx_skills_level" ON "skills"("level");
        `);

        // Add additional user columns
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD COLUMN "cursus_id" INTEGER,
            ADD COLUMN "campus_id" INTEGER,
            ADD COLUMN "last_seen" TIMESTAMP,
            ADD COLUMN "active_time" INTEGER DEFAULT 0
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_skills_level"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_skills_userId"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_coalitions_userId"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_projects_status"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_projects_userId"`);

        // Drop tables
        await queryRunner.query(`DROP TABLE IF EXISTS "skills"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "coalitions"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "projects"`);

        // Remove additional user columns
        await queryRunner.query(`
            ALTER TABLE "users"
            DROP COLUMN IF EXISTS "cursus_id",
            DROP COLUMN IF EXISTS "campus_id",
            DROP COLUMN IF EXISTS "last_seen",
            DROP COLUMN IF EXISTS "active_time"
        `);
    }
}
