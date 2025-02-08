import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navbar />
                {/* Add a spacer div to prevent content from going under navbar */}
                <div className="h-20"></div>
            </header>
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;
