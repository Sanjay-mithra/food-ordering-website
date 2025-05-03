const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentFunction = async (req, res) => {
  try {
    const { products } = req.body;

    // Log the received products (cart items)
    console.log("Received products: ", products);

    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: product.foodId.name,
          images: [product.foodId.image],
        },
        unit_amount: Math.round(product.foodId.price * 100),
      },
      quantity: product.quantity, 
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/failed`,
    });

    console.log("Stripe session created: ", session); // Add this log to check session details

    res.status(200).json({ success: true, sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      error: error.message || "Internal server error"
    });
  }
};



module.exports = {
  paymentFunction
};
