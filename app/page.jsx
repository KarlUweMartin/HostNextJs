'use client';

import { useEffect, useRef } from 'react';
import Head from './sections/head';
import AboutPage from './about/page';
import ShowroomPage from './showroom/page';
import SkillsPage from './skills/page';
import ContactPage from './contact/page';
import Footer from "./sections/footer";
import styles from './page.module.css';

export default function Home() {
  const sections = useRef(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        entry.target.classList.add(styles.revealed);
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -24px 0px' });

    for (const section of sections.current.children) {
      if (section.getBoundingClientRect().top >= window.innerHeight) {
        observer.observe(section);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head id={"head-section"}/>
      <div ref={sections}>
        <div><AboutPage /></div>
        <div><SkillsPage id="skills-section" /></div>
        <div><ShowroomPage id="showroom-section" /></div>
        <div><ContactPage id="contact-section" /></div>
      </div>
      <Footer />
    </>
  );
}
