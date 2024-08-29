import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
    withItemData,
    statelessSessions,
} from '@keystone-next/keystone/session';
import { Product } from './schemas/Product';
import { User } from './schemas/User';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';
import { SendPasswordResetEmail } from './lib/mail';
import { CartItem } from './schemas/CartItem';
import { extendGraphqlSchema } from './mutations';

const databaseURL =
    process.env.DATABASE_URL || 'mongodb://localhost/keystone-shroom-town';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360,
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        // TODO: Add in initial roles here
    },
    passwordResetLink: {
        async sendToken(args) {
            await SendPasswordResetEmail(args.token, args.identity);
        },
    },
});

export default withAuth(
    config({
        server: {
            cors: {
                origin: [process.env.FRONTEND_URL],
                credentials: true,
            },
        },
        db: {
            adapter: 'mongoose',
            url: databaseURL,
            // SEED DATA
            async onConnect(keystone) {
                if (process.argv.includes('--seed-data')) {
                    await insertSeedData(keystone);
                }
            },
        },
        lists: createSchema({
            // Schema items go here
            User,
            Product,
            ProductImage,
            CartItem,
        }),
        extendGraphqlSchema,
        ui: {
            // Show the UI only for people who pass this test
            isAccessAllowed: ({ session }) => !!session?.data,
        },
        session: withItemData(statelessSessions(sessionConfig), {
            User: 'id',
        }),
    })
);
