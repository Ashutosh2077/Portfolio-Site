import Home from './home';

// The whole page is static (everything interactive runs in the browser), so it can be exported for GitHub Pages.
export const dynamic = 'force-static';

export default function Page() {
  return <Home />;
}
