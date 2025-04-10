const Footer = () => {
    return (
        <footer className="bg-gray-700 text-white py-6 mt-10">
            <div className="max-w-6x1 mx auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                    <p className="font-semibold">URL Shortening App</p>
                    <p>April 11, 2025</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items--center gap-2 sm:gap-4 text-center">
                    <a
                    href="https://github.com/paintedlbird7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                        <strong>Rosa Perez</strong> - GitHub
                    </a>
                    <a
                    href="https://github.com/kiran1926"
                    target="blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    <strong>Kiran Roge</strong> - GitHub
                </a>
                <a
                    href="https://github.com/AMC292-design"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    <strong>Ashley Corbett</strong> - GitHub
                </a>
                <a
                    href="https://github.com/rmcelroy1990"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    <strong>Rae McElroy</strong> - GitHub       
                </a>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
                <p>&copy; {new Date().getFullYear()} URL Shortening App</p>
            </div>
        </div>
        </footer>
    );
};

export default Footer;