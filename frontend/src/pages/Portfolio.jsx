import Layout from "../components/Layout";
import Gallery from "../components/Gallery";
import { PageHead, Cta } from "../components/Bits";
export default function Portfolio({ content }) {
  return (
    <Layout>
      <PageHead
        crumb="Portfolio"
        ta="எங்கள் படைப்புகள்"
        title="Every Picture Tells a Beautiful Story"
        text="Real Moments. Beautiful Stories. Timeless Memories. Browse our folders below to explore curated weddings, pre-wedding shoots, engagement ceremonies, and concept stories."
      />
      <Gallery events={content.events} />
      <Cta title={<>Let's Make Your Wedding <em>Memories Beautiful</em></>} />
    </Layout>
  );
}
