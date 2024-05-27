import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <nav className="bg-gray-900 text-white px-4 lg:px-6 py-5 shadow-xl ">
                <div className="flex justify-between items-center mx-auto max-w-screen-xl">
                    <div className="text-lg font-semibold">
                        <span className="text-white hover:text-gray-300">Desafio LLZ</span>
                    </div>
                    <div className="flex items-center">
                        <ul className="flex space-x-8">
                            <li>
                                <Link to="/" className="text-white hover:text-gray-300">Pessoas</Link>
                            </li>
                            <li>
                                <Link to="/boleto" className="text-white hover:text-gray-300">Boletos</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
