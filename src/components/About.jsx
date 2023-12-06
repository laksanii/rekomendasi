import assets3 from "../assets/assets3.png";
import assets4 from "../assets/assets4.png";

const About = () => {
    return (
        <section
            id="section3"
            className="mt-3 px-10 relative min-h-screen pt-20 bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]"
        >
            <div className="py-8 px-4 mx-auto max-w-screen-lg text-center lg:py-16 z-10 border rounded-xl bg-slate-100 bg-opacity-25 relative shadow-lg">
                <img
                    src={assets3}
                    alt=""
                    className="w-32 absolute left-0 bottom-10 hidden lg:block"
                />
                <img
                    src={assets4}
                    alt=""
                    className="w-32 absolute bottom-0 right-0 hidden lg:block"
                />
                <h1 className="mb-5 text-xl font-extrabold tracking-tight leading-none drop-shadow-sm text-black capitalize md:text-2xl lg:text-3xl">
                    Sistem rekomendasi ini menggunakan metode Fuzzy TOPSIS
                </h1>
                <div className="max-w-screen-md mx-auto">
                    <p className="mb-8 text-justify text-lg font-normal text-black lg:text-xl dark:text-gray-200">
                        Metode Fuzzy TOPSIS merupakan salah satu metode Sistem
                        Pendukung Keputusan yang umum digunakan untuk memberikan
                        rekomendasi alternatif.
                    </p>
                    <p className="mb-8 text-justify text-lg font-normal text-black lg:text-xl dark:text-gray-200">
                        Metode Fuzzy TOPSIS memberikan beberapa alternatif
                        dengan membandingkan setiap alternatif mana yang terbaik
                        dan terburuk diantara deretan alterantif. Metode TOPSIS
                        memiliki konsep yang simpel dan mudah untuk dipahami,
                        memiliki komputasi yang efisien dan memiliki kemampuan
                        pengukuran yang relatif terhadap perfoma dari keputusan
                        setiap alternatif
                    </p>
                </div>
            </div>
            <div className="bg-blue-500 bg-opacity-30 w-full h-full absolute top-0 left-0 z-0"></div>
        </section>
    );
};

export default About;
