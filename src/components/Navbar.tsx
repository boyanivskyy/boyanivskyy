import { navLinks, navIcons } from "../constants";
import dayjs from "dayjs";

const Navbar = () => {
	return (
		<nav>
			<div>
				<img src="/images/logo.svg" alt="Logo" />
				<p className="font-bold">boyanivskyy's portfolio</p>

				<ul>
					{navLinks.map((item) => (
						<li key={item.id}>
							<p>{item.name}</p>
						</li>
					))}
				</ul>
			</div>

			<div>
				<ul>
					{navIcons.map((item) => (
						<li key={item.id}>
							<img
								className="icon-hover"
								src={item.img}
								alt={`icon-${item.id}`}
							/>
						</li>
					))}
				</ul>

				<time>{dayjs().format("ddd MMM D h:mm A")}</time>
			</div>
		</nav>
	);
};

export default Navbar;
