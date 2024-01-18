import GitPage from "@/components/GitPage";
import { MyContextProvider } from "@/context/context";
export default function Home() {
  return (
    <MyContextProvider>
      <GitPage />
    </MyContextProvider>
  );
}
