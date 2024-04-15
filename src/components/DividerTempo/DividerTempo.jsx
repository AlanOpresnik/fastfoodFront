import { Button } from "@mui/material";
import React from "react";

const DividerTempo = () => {
  return (
    <div>
      <div className="h-[350px] cursor-pointer object-cover  md:h-[700px]">
        <img
          className="h-full rounded-xl object-cover"
          src="https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/1c8ccd0c-f11a-4720-81cd-9ea573dbadd0___ba86d6ef6e969dc9207bae025ea1f9a0.jpg"
          alt="tempo buy"
        />
      </div>
      <div className="">
        <h4 className="text-2xl mb-3 mt-8 text-center">TIEMPO 10</h4>
        <h2 className="text-5xl md:text-6xl font-extrabold text-black text-center">
          MAXIMO CONTROL
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
          Sumate a la experiencia
        </Button>
      </div>
    </div>
  );
};

export default DividerTempo;
