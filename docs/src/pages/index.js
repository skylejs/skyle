import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Easy to Use',
    imageUrl: 'img/undraw_landscape_mode.svg',
    description: <>Skyle was designed to improve React Native's styling and animation workflow.</>,
  },
  {
    title: 'Performant',
    imageUrl: 'img/undraw_maker_launch.svg',
    description: (
      <>
        Uses React Native's <code>StyleSheet</code> and <code>Animated</code> to achieve near-native performance.
      </>
    ),
  },
  {
    title: 'Customizable',
    imageUrl: 'img/undraw_product_teardown.svg',
    description: <>Includes many ways to customize your styling experience (Theming, Custom Preprocessors and more!)</>,
  },
  {
    title: 'Clean Design',
    imageUrl: 'img/undraw_web_developer.svg',
    description: (
      <>Skyle's design is very easy to write and understand. It is based off of React Native's StyleSheet and CSS.</>
    ),
  },
  {
    title: 'CSS-Inspired Features',
    imageUrl: 'img/undraw_static_website.svg',
    description: <>Adds many popular CSS features that are missing from standard React Native.</>,
  },
  {
    title: 'Universal',
    imageUrl: 'img/undraw_posting_photo.svg',
    description: <>Skyle can be used with any React Native platform: iOS, Android, Web, Windows, MacOS, and more!</>,
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className='text--center'>
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={siteConfig.title}
      description="Styling, but the sky\'s the limit! An experimental universal, customizable styling and animation <br />
    library for React Native.">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className='container'>
          <img src={require('../../assets/banner.png').default} alt='Hero Banner' />
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--outline button--secondary button--lg', styles.button)}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
            <Link
              className={clsx('button button--outline button--secondary button--lg', styles.button)}
              to={useBaseUrl('docs/')}>
              Documentation
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className='container'>
              <div className='row'>
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
