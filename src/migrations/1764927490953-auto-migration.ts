import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1764927490953 implements MigrationInterface {
    name = 'AutoMigration1764927490953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "metrics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "canonical_value" double precision NOT NULL, "original_value" double precision NOT NULL, "original_unit" character varying NOT NULL, "kind" character varying NOT NULL, "recorded_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_5283cad666a83376e28a715bf0e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "metrics"`);
    }

}
