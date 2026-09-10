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
      <ShowroomPage id={"showroom-section"}/>
      <SkillsPage id={"skills-section"} />
      <ContactPage id={"contact-section"} />
      <Footer />
    </>
  );
}
