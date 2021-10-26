import Link from "next/Link";
import { useRouter } from "next/router";
const NavigationBar = ({ className }) => {
  const router = useRouter();
  const links = [
    { route: "/", text: "Home" },
    { route: "/blog", text: "Blog" },
    { route: "/about", text: "About" },
  ];
  return (
    <nav className={className}>
      <ul className="tc">
        {links.map((link, index) => (
          <li className="ph3 dib" key={`nav-link-${index}`}>
            <Link href={link.route}>
              <a
                className={`${
                  router.pathname.match(/^\/[\w]*[\b]*/)[0] === link.route
                    ? "deeppink"
                    : ""
                } underline`}
              >
                {link.text}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
