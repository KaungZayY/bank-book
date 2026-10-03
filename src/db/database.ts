import { SQLiteDatabase, openDatabaseAsync } from "expo-sqlite";
import { runMigration } from "./migrations";

const DATABASE_NAME = "bank-book.db";

let database: SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLiteDatabase> {
  if (database) {
    return database;
  }

  database = await openDatabaseAsync(DATABASE_NAME);

  await runMigration(database);

  return database;
}
