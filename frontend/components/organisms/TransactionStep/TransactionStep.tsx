import StepItem from "./StepItem"

export default function TransactionStep() {
  return (
    <section id="feature" className="feature pt-50 pb-50">
        <div className="container-fluid">
          <h2 className="text-4xl fw-bold color-palette-1 text-center mb-30">
            It’s Really That
            <br /> Easy to Buy Our Products
          </h2>
          <div className="row gap-lg-0 gap-4" data-aos="fade-up">
            <StepItem icon="step-1" title="1. Choose Your Item" desc1="Select the branded bag" desc2="or shoes you want to purchase"/>
            <StepItem icon="step-2" title="2. Order & Pay" desc1="Place your order and" desc2="Complete the payment"/>
            <StepItem icon="step-3" title="3. Delivered to You" desc1="Your item will be shipped directly" desc2="from Germany to your doorstep"/>
          </div>
        </div>
      </section>
  )
}
