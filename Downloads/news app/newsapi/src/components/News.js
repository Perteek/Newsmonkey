import React ,{useState,useEffect}from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Newsitem from './Newsitem'
import Spinner from "./Spinner"
// import PropTypes from 'prop-types'
const News =(props)=> {
const [articles,setarticles]=useState([0])
const [loading,setloading]=useState(true)
const [page,setpage]=useState(1)
const [totalResults,settotalResults]=useState(0)

let  capitialize=(string)=>{
            return string.charAt(0).toUpperCase() +string.slice(1)
        }

        document.title=`News-Monkey ${capitialize(props.category)} News`
    
   const updatenews= async()=>{
         props.setprogress(10)
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c5612b593c5844a1a36e3dc710b39371&page=${page}&pagesize=${props.pagesize}`
        setloading(true)
        props.setprogress(30)
        let data= await fetch(url)
        let parseddata= await data.json()
        console.log(parseddata)
        props.setprogress(70)
        setarticles(parseddata.articles)
        settotalResults(parseddata.totalResults)
        setloading(false)
        props.setprogress(100)
    }
    
    useEffect(()=>{
        document.title=`${capitialize(props.category)}-News Monkey`
        updatenews()
      },[])

      let handleonnext= async()=>{
       setpage(page+1)
       updatenews()
    }

  let  handleonprev=async ()=>{
        setpage(page-1)
        updatenews()
    }
 let  fetchmoredata=async()=>{
     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c5612b593c5844a1a36e3dc710b39371&page=${page+1}&pagesize=${props.pagesize}`
     setpage(page+1)
        setloading(true)
        let data= await fetch(url)
        let parseddata= await data.json()
        console.log(parseddata)
        setarticles(articles.concat(parseddata.articles))
        settotalResults(parseddata.totalResults)
        setloading(false)
    }
    return (
      <div className='container my-3'>
        <h2 className='text-center my-3'>News-Monkey Top-Headlines</h2>
        <div className='container justify-content-center'>{loading && <Spinner/>}</div>
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchmoredata}
            hasMore={articles.length!==totalResults.length}
            loader={<><Spinner/></>}
        >
        <div className='row'>
            {articles.map((element)=>{
                return <div className='col-md-4' key={element.url}>
                    <Newsitem title={element.title} imageurl={element.urlToImage} description={element.description} newsurl={element.url}/>
                </div>
            })}
            </div>
            <div className='container d-flex justify-content-between'>
            <button disabled={page<=1} type="button" className="btn btn-secondary" onClick={handleonprev}>&larr; Previous</button>
            <button type="button" disabled={page+1 > Math.ceil(totalResults/20)} className="btn btn-primary" onClick={handleonnext}>Next &rarr;</button>
            </div>
            </InfiniteScroll>
        </div>
    )
  }
News.defaultProps={
    country:"in",
    pagesize:8,
    category:"general"
}
News.prototype={

}
export default News
