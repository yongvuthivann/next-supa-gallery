import { createClient } from "@supabase/supabase-js";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import BlurImage from "../components/image";
import { IImage } from "../typing";

type props = {
  images: IImage[];
};

const Home = ({ images }: props) => {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px8">
      <Head>
        <title>NEXTJS x SUPABASE | LAZY LOAD IMAGES</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mb-10 space-y-2">
        <h1 className="text-center font-bold text-lg md:text-xl xl:text-2xl">
          NEXTJS x SUPABASE | LAZY LOAD IMAGES
        </h1>
        <h2 className="text-center font-extralight text-sm">
          Practicing purpose
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {images.map((image) => (
          <BlurImage image={image} key={image.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || ""
  );

  const { data } = await supabase.from("nsg-gallery").select();

  return {
    props: {
      images: data,
    },
  };
}
