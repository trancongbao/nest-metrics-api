import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1764931049298 implements MigrationInterface {
    name = 'AutoMigration1764931049298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "distance_metrics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "canonical_meters" double precision NOT NULL, "original_value" double precision NOT NULL, "original_unit" character varying NOT NULL, "recorded_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0aac45273dcf4771c12318b03fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "temperature_metrics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "canonical_kelvin" double precision NOT NULL, "original_value" double precision NOT NULL, "original_unit" character varying NOT NULL, "recorded_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3556360ce01d0541f9796e22f64" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "temperature_metrics"`);
        await queryRunner.query(`DROP TABLE "distance_metrics"`);
    }

}
