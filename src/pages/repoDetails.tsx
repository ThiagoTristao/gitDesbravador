import RepoDetails from "@/components/RepoDetails";
import { MyContextProvider } from "@/context/context";
export default function Home() {
  return (
    <MyContextProvider>
      <RepoDetails />
    </MyContextProvider>
  );
}
