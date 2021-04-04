import ReducerSample from "./ReducerSample";
import { SampleProvicer } from "./SampleContext";

function App() {
  return (
    <SampleProvicer>
      <ReducerSample />
    </SampleProvicer>
  );
}

export default App;