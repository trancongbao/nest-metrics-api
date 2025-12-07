import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1765121979835 implements MigrationInterface {
    name = 'AutoMigration1765121979835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "distance_metrics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" double precision NOT NULL, "recorded_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_c9d712213fd1c0fadb994c127e6" UNIQUE ("recorded_at"), CONSTRAINT "PK_0aac45273dcf4771c12318b03fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "temperature_metrics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" double precision NOT NULL, "recorded_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e39f814b9fee5be7d8b96be742d" UNIQUE ("recorded_at"), CONSTRAINT "PK_3556360ce01d0541f9796e22f64" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "temperature_metrics"`);
        await queryRunner.query(`DROP TABLE "distance_metrics"`);
    }

}
