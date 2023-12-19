import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

export default function Home() {
    return (
        <Layout
            title={`吃灰吧`}
            description="djzzwx成长路上的一些随记">
            <main className="home-text-cneter">
                <HomepageFeatures/>
            </main>
        </Layout>
    );
}
