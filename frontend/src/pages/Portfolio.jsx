import Layout from "../components/Layout";
import Gallery from "../components/Gallery";
import { PageHead, Cta } from "../components/Bits";

export default function Portfolio({ content }) {
  return (
    <Layout>
      <PageHead
        crumb="Portfolio"
        ta="எங்கள் படைப்புகள்"
        title="Our work"
        text="Have a look at our latest wedding, pre-wedding, engagement, and celebration galleries."
      />
      <Gallery events={content.events} />
      <Cta
        title={<>Like what you have <em>seen?</em></>}
        text="Dates get booked up quickly. Tell us your dates and we will confirm availability via WhatsApp within 24 to 48 hours."
      />
    </Layout>
  );
}
