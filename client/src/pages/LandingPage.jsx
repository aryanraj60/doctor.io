import React from "react";
import LandingNavbar from "../components/LandingNavbar";
import LandingHero from "../components/LandingHero";

const LandingPage = () => {
  return (
    <main className="h-full bg-black overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full">
        <div className="h-full">
          <LandingNavbar />
          <LandingHero />
          <footer>
            <div className="text-slate-200 text-muted-foreground flex justify-center items-center mt-36 pb-8">
              <p>Built With ❤️ by @aryanraj60</p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
