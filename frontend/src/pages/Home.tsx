import { useExampleStore } from "../state/useExampleStore";

export default function Home() {
  const { exampleNumber, setExampleNumber } = useExampleStore();
  return (
    <div>
      <p>{exampleNumber}</p>
      <input type="text" onChange={(e) => setExampleNumber(Number(e.target.value))} />
    </div>
  );
}
