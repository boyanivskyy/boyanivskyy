import { Dock, Navbar, Welcome } from "./components";
import { Safari, Terminal, Resume } from "./windows";

const App = () => {
	return (
		<main>
			<Navbar />
			<Welcome />
			<Dock />

			<Terminal />
			<Safari />
			<Resume />
		</main>
	);
};

export default App;
