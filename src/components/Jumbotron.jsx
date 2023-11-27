import { Link } from "react-scroll";

const Jumbotron = () => {
    return (
        <section className="min-h-screen pt-20 bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
            <div className="py-8 px-4 mx-auto max-w-screen-lg text-center lg:py-16 z-10 relative">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none drop-shadow-sm text-slate-50 capitalize md:text-5xl lg:text-6xl">
                    Selamat datang di sistem rekomendasi penyedia jasa sewa
                    kostum untuk cosplay
                </h1>
                <p className="mb-8 text-lg font-normal text-black lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
                    Kami akan memberikan anda daftar rekomendasi penyedia jasa
                    sewa yang sesuai dengan kriteria yang anda berikan
                </p>
                <Link
                    className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    to="form"
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={0}
                >
                    Mulai cari penyedia jasa sewa
                </Link>
            </div>
            <div className="bg-gradient-to-b from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
        </section>
    );
};

export default Jumbotron;
