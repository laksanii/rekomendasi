import { Link } from "react-scroll";

const About = () => {
    return (
        <section
            id="section3"
            className="mt-3 relative min-h-screen pt-20 bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]"
        >
            <div className="py-8 px-4 mx-auto max-w-screen-lg text-center lg:py-16 z-10 relative">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none drop-shadow-sm text-black capitalize md:text-5xl lg:text-3xl">
                    Sistem rekomendasi ini menggunakan metode Fuzzy TOPSIS
                </h1>
                <p className="mb-8 text-justify text-lg font-normal text-black lg:text-xl dark:text-gray-200">
                    Metode Fuzzy TOPSIS merupakan salah satu metode Sistem
                    Pendukung Keputusan yang umum digunakan untuk memberikan
                    rekomendasi alternatif.
                </p>
                <p className="mb-8 text-justify text-lg font-normal text-black lg:text-xl dark:text-gray-200">
                    Metode Fuzzy TOPSIS memberikan beberapa alternatif dengan
                    membandingkan setiap alternatif mana yang terbaik dan
                    terburuk diantara deretan alterantif. Metode TOPSIS memiliki
                    konsep yang simpel dan mudah untuk dipahami, memiliki
                    komputasi yang efisien dan memiliki kemampuan pengukuran
                    yang relatif terhadap perfoma dari keputusan setiap
                    alternatif
                </p>
            </div>
            <div className="bg-blue-500 bg-opacity-30 w-full h-full absolute top-0 left-0 z-0"></div>
        </section>
    );
};

export default About;
