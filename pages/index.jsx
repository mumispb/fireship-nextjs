import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import Loader from "../components/Loader";

import toast from "react-hot-toast";
import { useState, useContext } from "react";
import { useTesteContext } from "./contexts/auth";

export default function Home() {
  const [state, setState] = useState(null);
  const [context, setContext] = useTesteContext();
  return (
    <main>
      <button onClick={() => toast.success("Hello, toast")}>Toast me</button>
      <button
        onClick={() => {
          setState("balblblalb");
          setContext("tesdasdasd");
        }}
      >
        Setar estado
      </button>
      {state}
      <p>{context}</p>
    </main>
  );
}
