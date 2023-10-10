import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16'
});

export async function POST(request: Request) {
  try {
    const req = await request.json();

    // Certifique-se de que o objeto req.body contenha os dados esperados
    const { products } = req;

    // Array para armazenar as sessões de pagamento
    // const sessions = [];
    const lineItems: { price_data: { currency: string; unit_amount: number; product_data: { name: string; }; }; quantity: number; }[] = [];

      console.log(products)
    // Iterar pelos produtos e criar itens de linha para cada um
    products.forEach((product: { name: string; totalPrice: number; price:number; images:string; quantity: number }) => {
      const { name: productName, images, totalPrice, price, quantity } = product;

      console.log(productName)

      // Criar um item de linha para o produto atual
      const lineItem = {
        price_data: {
          currency: 'brl',
          unit_amount: price * 100,
          product_data: {
            name: productName,
            images:[images]
            // price: totalPrice
          },
        },
        quantity: quantity,
      };

      console.log(lineItem.price_data.product_data)

      lineItems.push(lineItem); // Adicionar o item de linha ao array de itens de linha
    });

    console.log(lineItems)


    // Resto do código para criar a sessão de pagamento com o Stripe
    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000/minha-conta',
      metadata: {
        name: "teste"
      },
      line_items: lineItems,
      mode: 'payment'
    });

    return new NextResponse(JSON.stringify({ sessionId: session.id }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Erro ao processar a solicitação', { status: 500 });
  }
}
