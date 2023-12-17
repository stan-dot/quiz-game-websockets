import TestRestApi from "./shared-components/dev-components/TestRestApi";
import { TestSocketComponent } from "./shared-components/dev-components/TestSocketComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h2>Hello world</h2>
      </div>
    </main>
  );
}
