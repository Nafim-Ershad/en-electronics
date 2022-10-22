import sanityClient from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'lvxlhflv',
    dataset: 'production',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    apiVersion: '2022-10-07',
    useCdn: true,
    ignoreBrowserTokenWarning: true
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);