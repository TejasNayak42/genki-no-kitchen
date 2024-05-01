"use client";
import { motion, useInView } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import FoodFacts from "@/components/FoodFacts";

const page = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref) as boolean;

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <div>
      <div className="w-screen overflow-hidden h-96 z-10 top-0 left-0 relative">
        <img
          src="/cover_img.jpg"
          className="w-full h-full object-cover"
          alt="cover-image"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      </div>
      <div className="absolute z-20 flex top-0 left-0 min-h-screen justify-center items-center flex-col w-full ">
        <motion.div
          initial="hidden"
          ref={ref}
          animate={isInView ? "show" : "hidden"}
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.h1
            className="text-center font-semibold md:text-6xl text-5xl md:pt-10"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            元気の
          </motion.h1>
        </motion.div>
        <p className="pt-1 text-white/50">Genki no kitchen</p>
        <SignedOut>
          <div className="flex flex-col gap-5 justify-center items-center mt-10">
            <Link href="/sign-in" className="mt-10">
              <Button className="md:w-96 w-80">Get Started</Button>
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex flex-col gap-5 justify-center items-center mt-10">
            <Link href="/inventory">
              <Button className="md:w-96 w-80">Inventory</Button>
            </Link>
            <Link href="/scan/unpackaged">
              <Button className="md:w-96 w-80">Add Items</Button>
            </Link>
          </div>
          <FoodFacts />
        </SignedIn>
      </div>
    </div>
  );
};

export default page;
