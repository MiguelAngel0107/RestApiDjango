import Layout from '../../hocs/layout'
import { Navigate } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CartItem from '../../components/cart/CartItem'
import { setAlert } from '../../redux/actions/alert'
import {
    update_item,
    remove_item
} from '../../redux/actions/cart'
import { useEffect, useState } from 'react'
import { get_shipping_options } from '../../redux/actions/shipping'
import {
    refresh
} from '../../redux/actions/auth';
import Loader from 'react-loader-spinner';
import { countries } from '../../helpers/fixedCountries'
import ShippingForm from '../../components/checkout/ShippingForm'






const Checkout = ({
    isAuthenticated,
    items,
    update_item,
    remove_item,
    setAlert


}) => {
    
    const [render, setRender] = useState(false);


    if(!isAuthenticated){
        return <Navigate to='/' />
    }


    const showItems = () => {
        return(
            <div>
                {
                items && 
                items !== null && 
                items !== undefined && 
                items.length !== 0 && 
                items.map((item, index)=>{
                    let count = item.count;
                    return (
                        <div key={index}>
                            <CartItem 
                                item={item}
                                count={count}
                                update_item={update_item}
                                remove_item={remove_item}
                                render={render}
                                setRender={setRender}
                                setAlert={setAlert}
                            />
                        </div>
                    );
                })
                }
            </div>
        )
    }

    return (
        <Layout>
            <div className="bg-white">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Checkout</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {showItems()}
            </ul>
          </section>

          {/* Order summary */}

          {/*<ShippingForm
              full_name={full_name}
              address_line_1={address_line_1}
              address_line_2={address_line_2}
              city={city}
              state_province_region={state_province_region}
              postal_zip_code={postal_zip_code}
              telephone_number={telephone_number}
              countries={countries}
              onChange={onChange}
              buy={buy}
              user={user}
              renderShipping={renderShipping}
              total_amount={total_amount}
              total_after_coupon={total_after_coupon}
              total_compare_amount={total_compare_amount}
              estimated_tax={estimated_tax}
              shipping_cost={shipping_cost}
              shipping_id={shipping_id}
              shipping={shipping}
              renderPaymentInfo={renderPaymentInfo}
              coupon={coupon}
              apply_coupon={apply_coupon}
              coupon_name={coupon_name}
            />*/}

          
        </div>
      </div>
    </div>
        </Layout>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    items: state.Cart.items,


})

export default connect(mapStateToProps, {
    update_item,
    remove_item,
    setAlert


})(Checkout)