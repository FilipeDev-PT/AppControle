import { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout'
import Loading from '../../Components/Loading/Loading';
import './Home.css';

export default function Home(){
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(true);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, []);

    return(
        <>
            {
                isLoading ? 
                <Layout></Layout>
                :
                <Loading />
            }
        </>
    )
}