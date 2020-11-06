import NavigationBar from "../components/NavigationBar";
const BaseLayout = (props) => {
  return (
    <main className="worksans mw8 center bg-white min-vh-100 pa3">
      <NavigationBar className="center measure f3 pv4" />
      {props.children}
    </main>
  );
};

export default BaseLayout;
