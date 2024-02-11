import Image from "next/image";
import { DatabaseService } from "./db";
import MainPage from "./pages/MainPage";

const dbService = new DatabaseService();

async function main() {
  try {

    const newProduct = await dbService.getAllProducts();

    console.log(newProduct);
  } catch (error) {
    console.error('Eroare la adăugarea produsului:', error);

  }
}

main();

export default function Home() {
  return (
    <MainPage />
  );
}
