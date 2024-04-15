import { Button } from "@mui/material";
import React from "react";

const DividerLorenzo = () => {
  return (
    <div>
      <div className="h-[350px] cursor-pointer object-cover  md:h-[700px]">
        <img
          className="h-full rounded-xl object-cover"
          src="https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/a022fa31-4b6a-4aa5-985a-a899bd89c016___e94736d90d10254124c8b8044e7e14cd.jpg"
          alt="tempo buy"
        />
      </div>
      <div className="">
        <h4 className="text-2xl mb-3 mt-8 text-center">NUEVA COLECCION 2024</h4>
        <h2 className="text-5xl md:text-6xl font-extrabold text-black text-center">
          SAN LORENZO VA
        </h2>
      </div>
      <div className="flex flex-col items-center w-full justify-center gap-0 md:flex-row md:gap-3">
        <Button
          className="!rounded-full w-[100px] !text-sm md:!text-md !mt-4 !bg-black !py-2 !px-6"
          variant="contained"
        >
          Comprar
        </Button>
        <Button
          className="!rounded-full !text-sm md:!text-md !mt-2 md:!mt-4 !bg-black !py-2 !px-6"
          variant="contained"
        >
          Conocer mas
        </Button>
      </div>
    </div>
  );
};

export default DividerLorenzo;
