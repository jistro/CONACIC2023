import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getNetwork, readContract, prepareWriteContract, writeContract } from '@wagmi/core';
import React, { useEffect } from 'react';

import MyToken from '../abis/MyToken.json';
import GuessBook from '../abis/GuessBook.json';
import { useAccount } from 'wagmi';




const Home: NextPage = () => {
  var direccionContrato = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  var direccionGuessBook = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const [isClient, setIsClient] = React.useState(false);
  const { address, isConnected } = useAccount();
  const { chain, chains } = getNetwork();

  const [idNFT, setidNFT] = React.useState<any>(null);
  //un usesate para guardar cada mensaje y mostrarlo en pantalla en un listado
  const [messages, setMessages] = React.useState<any>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const mint = () => {
    prepareWriteContract({
      address: direccionContrato,
      abi: MyToken.abi,
      functionName: 'safeMint',
      args: [address],
    }).then((data) => {
      setidNFT(data.result);
      console.log(data);
      writeContract(data).then((data) => {

      });
    });
  };

  const ingresarMensaje = () => {

    const inputId = [
      "mensaje",
      "urlImagen"
    ];

    const inputs = inputId.map((id) => document.getElementById(id) as HTMLInputElement);
    const values = inputs.map((input) => input.value);
    inputs.forEach((input) => {
      input.value = "";
    });

    prepareWriteContract({
      address: direccionGuessBook,
      abi: GuessBook.abi,
      functionName: 'postMessage',
      args: [values[1], values[0]],
    }).then((data) => {
      console.log(data);
      writeContract(data).then((data) => {
      });
    });
  }

  const getMessages = () => {
    //limpiamos la lista de mensajes
    setMessages([]);
    //set to any 
    var numeroMensajes: any;
    readContract({
      address: direccionGuessBook,
      abi: GuessBook.abi,
      functionName: 'getCount',
      args: [],
    }).then((data) => {
      numeroMensajes = data;
      console.log(numeroMensajes);
      for (var i = 0; i < numeroMensajes; i++) {
        readContract({
          address: direccionGuessBook,
          abi: GuessBook.abi,
          functionName: 'getMessage',
          args: [i],
        }).then((data) => {
          //console.log(data);
          //guardamos cada mensaje en el usesate mediante listas
          setMessages((messages: any) => [...messages, data]);
        });
      }
    });
    console.log(messages);
    // en console numeroMensajes se muestra por ejemplo 3n
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <h1 className={styles.title}>
          Mintea tu NFT desde aquí
        </h1>
        <img src="/badge.png" alt="logo" width="300" />

        <div className={styles.grid}>
          {isClient && isConnected ? (
            <>
              {idNFT ? (
                <div className={styles.card}>
                  <h1>Se minteo tu NFT con el ID {idNFT.toString()}</h1>

                  <button className={styles.button} onClick={() => setidNFT(null)}>
                    Mintear otro NFT
                  </button>
                </div>
              ) : (
                <button
                  className={styles.button}
                  onClick={() => {
                    mint();
                  }}>
                  Mintear NFT
                </button>
              )}
            </>
          ) : (
            <h1>Conectate mediante tu wallet</h1>
          )}
        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>GuessBook</h2>
            <p>Deja tu mensaje en la blockchain</p>
            <input type="text" placeholder="Escribe tu mensaje" id="mensaje" />
            <input type="text" placeholder="Ingresa url de una imagen" id="urlImagen" />
            <button className={styles.button}
              onClick={ingresarMensaje}
            >Dejar mensaje</button>
          </div>
        </div>
        <br />
        {messages ? (
          <div >
            {messages.map((message: any) => (
              <div className={styles.message_container}>
                <div className={styles.message_sender}>
                  <p>{message.sender}</p>
                  <p>{message.message}</p>
                </div>
                {message.img != "" ? (
                  <div className={styles.message_image}>
                    <img src={message.img} alt="imagen" width="300" />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        ) : (
          <h1>No hay mensajes</h1>
        )}
        {messages == "" ? (
          <button className={styles.button} onClick={getMessages}>Ver mensajes</button>
        ) : (
          <button className={styles.button} onClick={getMessages}>Actualizar mensajes</button>
        )}
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
