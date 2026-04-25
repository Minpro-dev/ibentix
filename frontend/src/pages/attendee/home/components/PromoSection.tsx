import { PROMO_DATA } from "../../../../static/promoStatic";
import PromoBanner from "./PromoBanner";

export default function PromoSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 px-1">
      {PROMO_DATA.map((promo) => (
        <PromoBanner
          key={promo.id}
          title={promo.title}
          description={promo.description}
          image={promo.image}
        />
      ))}
    </section>
  );
}
