import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getNetwork, readContract, prepareWriteContract, writeContract } from '@wagmi/core';
import React, { useEffect } from 'react';

import GuessBook from '../abis/GuessBook.json';
import { useAccount } from 'wagmi';




const Home: NextPage = () => {
  var direccionGuessBook = "0xEce6af52f8eDF69dd2C216b9C3f184e5b31750e9";
  const [isClient, setIsClient] = React.useState(false);
  const { address, isConnected } = useAccount();
  const [messages, setMessages] = React.useState<any>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);



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
      account: address,
      args: [values[1], values[0]],
    }).then((data) => {
      console.log(data);
      writeContract(data).then((data) => {
      }).catch((error) => {
        console.log(error);
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
          setMessages((messages: any) => [...messages, data]);
        });
      }
    });
    console.log(messages);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>GuessBook</title>
        <meta
          content="GuessBook"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        <h1 className={styles.title}>GuessBook</h1>
        <p className={styles.description}>Deja tu mensaje en la blockchain!!</p>
        <Image
          src="/doge-computer.png" 
          alt="imagen"
          width={0}
  height={0}
  sizes="100vw"
  style={{ width: '500px', height: 'auto' }} // optional
        />
        {isConnected && isClient ? (
          <>
            <div className={styles.card}>
              <input type="text" placeholder="Escribe tu mensaje" id="mensaje" />
              <input type="text" placeholder="Ingresa url de una imagen" id="urlImagen" />
              <button className={styles.button}
                onClick={ingresarMensaje}
              >Dejar mensaje</button>
            </div>
            <br />
            {messages ? (
              <div >
                {messages.map((message: any) => (
                  <div className={styles.message_container}>
                    <div className={styles.message_sender}>
                      <b>Usuario</b>
                      <p>{message.sender}</p>
                      <br />
                      <h2>{message.message}</h2>
                    </div>
                    {message.img != "" && (
                      <div className={styles.message_image}>
                        <img
                        src={message.img} 
                        alt="imagen" 
                        width="300" 
                        />
                      </div>
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
            <br />
            < div className={styles.card}>
            <p>
              El contrato GuessBook se encuentra en la red de la testnet de arbitrum con la siguiente direccion: <a href={`https://testnet.arbiscan.io/address/${direccionGuessBook}`} target="_blank" rel="noopener noreferrer"
              style={{ color: 'blue' }}
              >
                {direccionGuessBook}
              </a>
            </p>
            <p>
              Si necesitas testnet ETH puedes usar el faucet: <a href="https://faucet.triangleplatform.com/arbitrum/goerli" target="_blank" rel="noopener noreferrer"
              style={{ color: 'blue' }}
              >
                faucet.triangleplatform.com/arbitrum/goerli
              </a>
            </p>
            </div>
          </>
        ) : (
          <h1>Conecta tu wallet</h1>
        )}
      </main>

    </div>
  );
};

export default Home;
