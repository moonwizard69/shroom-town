import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';

async function addToCart(
    root: any,
    { productId }: { productId: string },
    context: KeystoneContext
): Promise<CartItemCreateInput> {
    console.log('ADDING TO CART');
    // query current user to see if signed in
    const session = context.session as Session;
    if (!session.itemId) {
        throw new Error('User must be logged in to complete action');
    }
    // query current user's cart
    const allCartItems = await context.lists.CartItem.findMany({
        where: { user: { id: session.itemId }, product: { id: productId } },
        resolveFields: 'id,quantity',
    });
    // see if item if theyre adding is already added to cart
    // increment by 1 if in cart
    const [existingCartItem] = allCartItems;
    if (existingCartItem) {
        console.log(
            `There are already ${existingCartItem.quantity}in the cart, incrmeent by 1`
        );
        return await context.lists.CartItem.updateOne({
            id: existingCartItem.id,
            data: { quantity: existingCartItem.quantity + 1 },
        });
    }
    return await context.lists.CartItem.createOne({
        data: {
            product: { connect: { id: productId } },
            user: { connect: { id: session.itemId } },
        },
    });
    // if not in cart, create new item
}

export default addToCart;
