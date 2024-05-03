import "./SubscriptionPlan.scss";

export default function SubscriptionPlan() {
  return (
    <>
      <section className="subscription">
        <div className="subscription-pricing">
          <h2 className="subscription-pricing__heading">Basic</h2>
          <p className="subscription-pricing__price">Free</p>
          <ul>
            <li className="subscription-pricing__price-ad">
              Currently Subscribed
            </li>
            <li className="subscription-pricing__price-ad">
              50 Requests / month
            </li>
            <button className="subscription-pricing__price-button">
              Manage and View Usage
            </button>
          </ul>
        </div>
        <div className="subscription-pricing">
          <h2 className="subscription-pricing__heading">Pro</h2>
          <p className="subscription-pricing__price">$5.00 / mo</p>
          <ul>
            <li className="subscription-pricing__price-ad">
              500 Requests / month
            </li>
            <button className="subscription-pricing__price-button">
              Change Plan
            </button>
          </ul>
        </div>
        <div className="subscription-pricing">
          <h2 className="subscription-pricing__heading">Ultra</h2>
          <p className="subscription-pricing__price">$8.00 / mo</p>
          <ul>
            <li className="subscription-pricing__price-ad">
              1000 Requests / month
            </li>
            <li className="subscription-pricing__price-ad">
              AI-Powered Resume/Cover Letter Builder
            </li>
            <button className="subscription-pricing__price-button">
              Change Plan
            </button>
          </ul>
        </div>
        <div className="subscription-pricing">
          <h2 className="subscription-pricing__heading">Mega</h2>
          <p className="subscription-pricing__price">$20.00 / mo</p>
          <ul>
            <li className="subscription-pricing__price-ad">
              unlimited Requests / month
            </li>
            <li className="subscription-pricing__price-ad">
              AI-Powered Resume/Cover Letter Builder
            </li>
            <button className="subscription-pricing__price-button">
              Change Plan
            </button>
          </ul>
        </div>
      </section>
    </>
  );
}
