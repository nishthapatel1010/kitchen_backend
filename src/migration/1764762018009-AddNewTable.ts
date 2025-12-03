import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddGenderToAdmin1764762018009 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "admin",
            new TableColumn({
                name: "gender",
                type: "varchar",
                length: "10",
                isNullable: true, // optional, can be true or false
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("admin", "gender");
    }

}
