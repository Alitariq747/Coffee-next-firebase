import Banner from "@/components/Banner";
import CoffeeBlendGrid from "@/components/CoffeeBlendGrid";
import ProductGrid from "@/components/ProductGrid";


export default function Home() {
  return (
		<>
			<Banner />

      <ProductGrid category="coffee" />
      <ProductGrid category="breakfast"/>
      <CoffeeBlendGrid />
		</>
	);
}
