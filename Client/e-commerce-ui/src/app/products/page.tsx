import React from 'react'
import ProductList from '../components/ProductList'

async function ProductsPage ({searchParams}:{searchParams:Promise<{category:string}>}) {

  const {category} = await searchParams;
  return (
    <ProductList category={category} params='ProductPage'/>
  )
}

export default ProductsPage