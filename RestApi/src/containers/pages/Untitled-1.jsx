<div className="space-y-24">
  {order.order_items.map((product) => (
    <div
      key={product.id}
      className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
    >


      <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
        <h3 className="text-lg font-medium text-gray-900">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="font-medium text-gray-900 mt-1">Transaction ID: {product.transaction_id}</p>
        <p className="text-gray-500 mt-3">{product.description}</p>
      </div>
      <div className="sm:col-span-12 md:col-span-7">
        <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
          <div>
            <dt className="font-medium text-gray-900">Delivery address</dt>
            <dd className="mt-3 text-gray-500">
              <span className="block">{product.address_line_1}</span>
              <span className="block">{product.address_line_2}</span>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900">Shipping</dt>
            <dd className="mt-3 text-gray-500 space-y-3">
              <p>$ {product.shipping_price}</p>
              <p>$ {product.amount} Total Cost</p>

            </dd>
          </div>
        </dl>
        <p className="font-medium text-gray-900 mt-6 md:mt-10">
          Status: {product.status}
        </p>
        <div className="mt-6">
          <div className="bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-indigo-600 rounded-full"
              style={{ width: `calc((${product.step} * 2 + 1) / 8 * 100%)` }}
            />
          </div>
          <div className="hidden sm:grid grid-cols-4 font-medium text-gray-600 mt-6">
            <div className="text-indigo-600">Order placed</div>
            <div className={classNames(product.step > 0 ? 'text-indigo-600' : '', 'text-center')}>
              Processing
            </div>
            <div className={classNames(product.step > 1 ? 'text-indigo-600' : '', 'text-center')}>
              Shipped
            </div>
            <div className={classNames(product.step > 2 ? 'text-indigo-600' : '', 'text-right')}>
              Delivered
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>