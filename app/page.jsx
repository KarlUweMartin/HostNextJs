'use client';

import Head from './sections/head';
import AboutPage from './about/page';
import CvPage from "./cv/page";
import ShowroomPage from './showroom/page';
import SkillsPage from './skills/page';
import ContactPage from './contact/page';
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
