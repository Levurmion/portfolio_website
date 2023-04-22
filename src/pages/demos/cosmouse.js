import Head from "next/head";
import Navbar from "../../../layouts/Navbar";

function Cosmouse() {
   return ( 
      <>
         <Head>
            <title>Elbert - Cosmouse Demo</title>
         </Head>
         <Navbar>
            <div style={{
               display: 'flex',
               height: '80vh',
               width: '80vw',
               paddingTop: '10vh',
               paddingInline: '10vw',
               alignItems: 'center',
               justifyContent: 'center'
            }}>

            </div>
         </Navbar>
      </>
    );
}

export default Cosmouse;