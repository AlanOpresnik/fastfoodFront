import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Register() {
  const { CreateUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateUser(name,lastName,email, password);
  };

  return (
    <div className="grid grid-cols-2 ">
      <div>
        <div className="flex flex-col items-center justify-center mt-16 mb-6 ">
          <img
            className="w-[160px]"
            src="https://nikearprod.vtexassets.com/assets/vtex/assets-builder/nikearprod.store/2.0.63/icons/Assets_for_off%20platform/swoosh___33f7ffaf2fc124733c2c4a60a12a1160.svg"
          />
          <h4 className="text-3xl mt-6 font-semibold">Registrarse </h4>
        </div>
        <div className=" max-w-sm mx-auto items-center">
          <form onSubmit={handleSubmit} className="flex gap-6 flex-col">
            <TextField
              name="name"
              id="outlined-basic"
              label="Nombre "
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              name="lastName"
              id="outlined-basic"
              label="Apellido"
              variant="outlined"
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              name="email"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              name="password"
              id="outlined-basic"
              label="Contraseña"
              variant="outlined"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              className="!bg-black !text-white hover:!bg-[#292929]"
            >
              Registrarse
            </Button>
          </form>

          <div className="flex justify-center mt-4">
            <Link className="opacity-60">
              Ya tienes cuenta?{" "}
              <span className="text-indigo-600 opacity-100">Inicia sesion</span>
            </Link>
          </div>
          <div className="flex justify-center mt-12">
            <Link to={"/"} className="opacity-30">
              Volver a la pagina de Nike{" "}
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full">
          <img
            className="w-full h-[100vh]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCoqbLjjeupMeS3OwjvapeKhi8QMiutdSs0MVrSE8hIQ&s"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
