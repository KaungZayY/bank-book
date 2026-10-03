import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { getDatabase } from "@/db/database";

export default function RootLayout() {
  const [databaseReady, setDatabaseReady] = useState(false);

  useEffect(() => {
    async function initializeDatabase() {
      await getDatabase();
      setDatabaseReady(true);
    }

    initializeDatabase();
  }, []);

  if (!databaseReady) {
    return null;
  }

  return <Stack />;
}
