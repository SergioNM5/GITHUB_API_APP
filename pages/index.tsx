import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Fragment} from "react";
import Header from "../components/Layout/Header";

const Home: NextPage = () => {
  return (
      <Fragment>
        <Header/>
      </Fragment>

  )
}

export default Home
