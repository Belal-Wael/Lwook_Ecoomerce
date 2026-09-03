import Image from "next/image"
import ProductList from "./components/ProductList"

const Homepage =async ({searchParams}:{searchParams:Promise<{category:string}>}) => {

  const {category} = await searchParams;
  return (
    <div className=''>
      <div className='relative aspect-[3/1] mb-12'>
         <Image src="/featured.png" alt="Hero Image" fill/>
      </div>
      <ProductList category={category} params="HomePage"/>
    </div>
  )
}

export default Homepage