import MainDashboard from "@/components/MainDashboard";
import TestDashboard from "@/components/TestDashboard";
import { ModeToggle } from "@/components/ui/moodtoggle";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <TestDashboard />
      {/* <MainDashboard /> */}
    </main>
  );
}
