import Divider from "./Divider";
import Text from "./Text";

export default function Reached() {
  return (
    <section className="reached pt-50 pb-50">
      <div className="container-fluid">
        <div className="d-flex flex-lg-row flex-column align-items-center justify-content-center gap-lg-0 gap-4">
          <Text title="100+" desc="Successful Orders" />
          <Divider />
          <Text title="24/7" desc="Service" ms-lg-35/>
          <Divider />
          <Text title="99,9%" desc="Happy Customers" ms-lg-35/>
          <Divider />
          <Text title="5.0" desc="Rating on Marketplace" ms-lg-35/>
        </div>
      </div>
    </section>
  );
}
