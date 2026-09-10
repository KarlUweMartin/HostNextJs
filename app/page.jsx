'use client';

import ShowroomPage from './showroom/page';
import AboutPage from './about/page';
import ContactPage from './contact/page';
import SkillsPage from './skills/page';

import Waterlevel from "./components/waterlevel"
import Head from './sections/head';
import Footer from "./sections/footer";

export default function Home() {
  return (
    <>
      <Head id={"head-section"}/>
      <AboutPage/>
      <SkillsPage id={"skills-section"} />
      <ShowroomPage id={"showroom-section"}/>
      <ContactPage id={"contact-section"} />
      <Footer />
    </>
  );
}
