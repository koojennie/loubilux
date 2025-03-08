import Divider from "./Divider";
import Text from "./Text";

export default function Reached() {
  return (
    <section className="reached pt-50 pb-50">
      <div className="container-fluid">
        <div className="d-flex flex-lg-row flex-column align-items-center justify-content-center gap-lg-0 gap-4">
          <Text title="290M+" desc="Players Top Up" />
          <Divider />
          <Text title="12.500" desc="Games Available" ms-lg-35/>
          <Divider />
          <Text title="99,9%" desc="Happy Players" ms-lg-35/>
          <Divider />
          <Text title="4.7" desc="Rating Worldwide" ms-lg-35/>
        </div>
      </div>
    </section>
  );
}
