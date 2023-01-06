import Layout from "../../hocs/layout"
import { useParams } from 'react-router'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    get_product,
    get_related_products 
} from "../../redux/actions/products";
import Loader from "react-loader-spinner";

import { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { HeartIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline'
import {
  get_items,
  add_item,
  get_total,
  get_item_total
} from '../../redux/actions/cart'
import ImageGallery from '../../components/product/ImageGallery'



const product = {
    name: 'Zip Tote Basket',
    price: '$140',
    rating: 4,
    images: [
      {
        id: 1,
        name: 'Angled view',
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
        alt: 'Angled front view with bag zipped and handles upright.',
      },
      // More images...
    ],
    colors: [
      { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
      { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
      { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
    ],
    description: `
      <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
    `,
    details: [
      {
        name: 'Features',
        items: [
          'Multiple strap configurations',
          'Spacious interior with top zip',
          'Leather handle and tabs',
          'Interior dividers',
          'Stainless strap loops',
          'Double stitched construction',
          'Water-resistant',
        ],
      },
      // More sections...
    ],
} 
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// Funcion Como Tal ----------------------------------------------------//

const ProductDetail = ({
    get_product,
    get_related_products,
    prod,

    get_items,
    add_item,
    get_total,
    get_item_total
}) => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const addToCart = async () => {
      if (prod && prod !== null && prod !== undefined && prod.quantity > 0) {
        setLoading(true)
        await add_item(prod);
        await get_items();
        await get_total();
        await get_item_total();
        setLoading(false)
        navigate('/cart')
        console.log('Codigo ejecutado')
      }
    }

    const params = useParams()
    const productId = params.productId

    useEffect(() => {
      window.scrollTo(0,0)
      get_product(productId)
      get_related_products(productId)
    }, [])

    // Espera de Carga del Servidor
    let p 
    prod ? p = prod : p = product
    
    
    return(
        <Layout>
          <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <ImageGallery photo={p.photo}/>
          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{p.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">${p.price}</p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="text-base text-gray-700 space-y-6"
                dangerouslySetInnerHTML={{ __html: p.description }}
              />
            </div>
            
            {/* Colors */ }
            <div className="mt-6">
                
              <p className="mt-4">
                  {
                      prod && 
                      prod !== null &&
                      prod !== undefined && 
                      prod.quantity > 0 ? (
                        <span className='text-green-500'>
                          In Stock
                        </span>
                      ) : (
                        <span className='text-red-500'>
                          Out of Stock
                        </span>
                      )
                  }
              </p>       

              <div className="mt-10 flex sm:flex-col1">

                {loading?<button 
                  className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">
                    <Loader
                    type="Oval"
                    color="#fff"
                    width={20}
                    height={20}/>
                </button>:
                <button 
                onClick={addToCart}
                className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">
                  Agregar al Carrito
                </button>}


                <button
                  type="button"
                  className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </div>
            {/* Caracteristicas Adicionales */}
            <section aria-labelledby="details-heading" className="mt-12">
              {/*<h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="border-t divide-y divide-gray-200">
                {product.details.map((detail) => (
                  <Disclosure as="div" key={detail.name}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                            <span
                              className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}
                            >
                              {detail.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
                          <ul role="list">
                            {detail.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                            </div> */}            
            </section>

          </div>
        </div>
      </div>
    </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    prod: state.Products.product
})

export default connect(mapStateToProps, {
    get_product,
    get_related_products,

    get_items,
    add_item,
    get_total,
    get_item_total
}) (ProductDetail)