import '../app/x.css';
import '../app/y.css';
import '../app/z.css';
import '../app/pages.css';
import Motion from './Motion';
import Ribbon from './Ribbon';
import ScrollState from './ScrollState';
import Parallax from './Parallax';
import SmoothScroll from './SmoothScroll';
import SiteHeader from './SiteHeader';
import Footer from './Footer';

// Shared frame for every inner page: ribbon, header with mega menus, main, footer.
export default function SiteShell({ children, cta, ctaHref, tone }) {
  return (
    <div className={`x y z pg${tone ? ` pg-${tone}` : ''}`}>
      <Motion />
      <a href="#main" className="skip">Skip to content</a>
      <Ribbon />
      <ScrollState />
      <Parallax />
      <SmoothScroll />
      <SiteHeader cta={cta} ctaHref={ctaHref} />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer />
    </div>
  );
}
