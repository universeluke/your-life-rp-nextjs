import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Community from "./components/Community";
// import JoinNow from "./components/JoinNow";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import ScrollingImageBelt from "./components/ScrollingImageBelt";
import ScrollingTextBelt from "./components/ScrollingTextBelt";
import Beam from "./components/Beam";

function Home() {
  return (
    <div className="relative z-10">
      <Header />
      <Hero />
      <Beam />
      <Community />
      <ScrollingImageBelt />
      <ScrollingTextBelt />
      <Carousel />
      <Features />
      {/* <JoinNow /> */}
      <Footer />
    </div>
  );
}

export default Home;
